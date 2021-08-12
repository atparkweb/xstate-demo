const { expect } = require('chai')
const { lightBulb } = require('../index')

describe("Light bulb state machine", () => {
  let bulb

  beforeEach(() => {
    bulb = lightBulb()
  })

  it("should be initialized as lit and unbroken", () => {
    expect(bulb.state()).to.deep.eq({ isLit: false, isBroken: false })
  })

  it("should be able to be turned on", () => {
    bulb.toggle()
    expect(bulb.state()).to.deep.eq({ isLit: true, isBroken: false })
  })

  it("should not be lit when broken", () => {
    bulb.toggle()
    bulb.break()
    bulb.state()
    expect(bulb.state()).to.deep.eq({ isLit: false, isBroken: true })
  })
})