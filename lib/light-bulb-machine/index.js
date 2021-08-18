const { createMachine, interpret } = require('xstate')

// States are triggered by events. 'on' defines events
const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  strict: true,
  states: {
    lit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'unlit'
      },
      exit: () => {
        console.log("I'm scared of the dark!")
      },
      entry: () => {
        console.log("Let there be light!")
      }
    },
    unlit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'lit'
      }
    },
    broken: {
      // final means that the service stops when this state is reached
      type: 'final',
      entry: ['logLocation', 'buyANewBulb']
    }
  }
}, {
  actions: {
    logLocation: (context, event) => {
      console.log(`yo I'm broke in the ${event.location}`)
    },
    buyANewBulb: (context, event) => {
      console.log(`buy a new lightbulb`)
    }
  }
})

const idleMachine = createMachine({
  id: 'idle',
  initial: 'idle',
  states: {
    idle: {
      entry: 'logEntry',
      exit: 'logExit'
    }
  },
  on: {
    DO_NOTHING: '.idle'
  }
}, {
  actions: {
    logEntry: () => {
      console.log('entered')
    },
    logExit: () => {
      console.log('exited')
    }
  }
})

let service = interpret(idleMachine).start()
service.send('DO_NOTHING')
//service.send('DO_NOTHING')

module.exports = { lightBulbMachine }
