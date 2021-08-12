const { expect } = require('chai')
const { lightBulb, STATES } = require('../index')

describe("Light bulb state machine", () => {
  let bulb

  beforeEach(() => {
    bulb = lightBulb()
  })

  it("should be initialized as unlit and unbroken", () => {
    expect(bulb.state()).to.eq(STATES.unlit)
  })

  it("should be able to be turned on", () => {
    bulb.toggle()
    expect(bulb.state()).to.eq(STATES.lit)
  })

  it("should not be lit when broken", () => {
    bulb.toggle()
    bulb.break()
    bulb.state()
    expect(bulb.state()).to.eq(STATES.broken)
  })
})