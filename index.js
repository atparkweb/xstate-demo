const { createMachine } = require('xstate')

// States are triggered by events. 'on' defines events
const lit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'unlit'
  }
}
const unlit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'lit'
  }
}
const broken = {
  // Once this state is reached, it cannot reach other states. Hence the 'final' type
  type: 'final'
}

const states = { lit, unlit, broken }

// initial state
const initial = 'unlit'

// XState configuration
const config = {
  id: 'lightBulb',
  initial,
  states
}

const lightBulbMachine = createMachine(config)
console.log(lightBulbMachine)

module.exports = { lightBulbMachine }