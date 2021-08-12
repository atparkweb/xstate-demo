const { createMachine, interpret } = require('xstate')


// States are triggered by events. 'on' defines events
const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  states: {
    lit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'unlit'
      }
    },
    unlit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'lit'
      }
    },
    broken: {
      // Once this state is reached, it cannot reach other states. Hence the 'final' type
      type: 'final'
    }
  }
})

// A service maintains state through transitions
// doesn't do anything until we `start` the service
const service = interpret(lightBulbMachine).start()

// once service is started we can send events...
const nextState = service.send('TOGGLE')
nextState.value //?

module.exports = { lightBulbMachine }
