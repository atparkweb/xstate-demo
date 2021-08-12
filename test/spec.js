const { expect } = require('chai')
const { lightBulbMachine } = require('../index')

// alias
const machine = lightBulbMachine

describe("Light bulb state machine", () => {
  it("should be initialized as unlit and unbroken", () => {
    expect(machine.initial).to.eq('unlit')
  })

  it("should be able to be turned on", () => {
    expect(machine.transition('unlit', 'TOGGLE').value).to.eq('lit')
  })

  it("should not be lit when broken", () => {
    expect(machine.transition('lit', 'BREAK').value).to.eq('broken')
  })
})