const { expect } = require('chai')
const { lightBulbMachine } = require('../index')

describe("Light bulb state machine", () => {
  // alias
  let machine

  beforeEach(() => {
    machine = lightBulbMachine
  })

  it("should be initialized as unlit and unbroken", () => {
    expect(machine.initial).to.eq('unlit')
  })

  it("should be able to be turned on", () => {
    expect(machine.transition('unlit', 'TOGGLE').value).to.eq('lit')
  })

  it("should not be lit when broken", () => {
    expect(machine.transition('lit', 'BREAK').value).to.eq('broken')
  })

  it("should throw an error if undefined state is passed", () => {
    const invalidTransition = () => {
      machine.transition('foo', 'TOGGLE')
    }

    expect(invalidTransition).to.throw("Child state 'foo' does not exist on 'lightBulb'")
  })
})