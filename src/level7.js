const { createMachine, interpret } = require('xstate')
const { assign } = require('xstate/lib/actionTypes')

// States are triggered by events. 'on' defines events
const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  strict: true,
  context: { // a.k.a. extended state, virtually infinite
    color: '#fff'
  },
  states: {
    lit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'unlit',
        CHANGE_COLOR: {
          actions: assign({
            color: (_context, event) => event.color
          })
        }
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
    logLocation: (_context, event) => {
      console.log(`yo I'm broke in the ${event.location}`)
    },
    buyANewBulb: (_context, _event) => {
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
    },
    changeColor: assign((context, event) => {
      return {
        color: event.color
      }
    })
  }
})

let service = interpret(idleMachine).start()
service.send('DO_NOTHING')
//service.send('DO_NOTHING')

module.exports = { lightBulbMachine }
