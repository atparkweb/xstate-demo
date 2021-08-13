const { createMachine, interpret } = require('xstate')


// States are triggered by events. 'on' defines events
const lightBulbMachine = createMachine({
  id: 'lightBulb',
  initial: 'unlit',
  strict: true,
  states: {
    lit: {
      on: {
        BREAK: {
          target: 'broken',
          actions: ['logBroken']
        },
        TOGGLE: 'unlit'
      }
    },
    unlit: {
      on: {
        BREAK: {
          target: 'broken',
          actions: ['logBroken']
        },
        TOGGLE: 'lit'
      }
    },
    broken: {
      // final means that the service stops when this state is reached
      type: 'final'
    }
  }
}, {
  actions: {
    logBroken: (context, event) => {
      console.log(`yo I'm broke in the ${event.location}`)
    }
  }
})

let service = interpret(lightBulbMachine).start()
service.send('TOGGLE')
service.send('TOGGLE')
service.send('BREAK', { location: 'office' })

module.exports = { lightBulbMachine }
