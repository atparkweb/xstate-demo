const { expect } = require('chai')
const { interpret } = require('xstate')
const { lightBulbMachine } = require('../index')

describe("Light bulb state machine", () => {
  let service

  beforeEach(() => {
    service = interpret(lightBulbMachine).start()
  })

  it("should be initialized as unlit and unbroken", () => {
    expect(service.state.value).to.eq('unlit')
  })

  it("should be able to be turned on", () => {
    service.send('TOGGLE')
    expect(service.state.value).to.eq('lit')
  })

  it("should not be lit when broken", () => {
    service.send('BREAK')
    expect(service.state.value).to.eq('broken')
  })

  it("should throw an error if undefined event is passed", () => {
    const invalidTransition = () => {
      service.send('FOO')
    }

    expect(invalidTransition).to.throw("does not accept event 'FOO'")
  })
})