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
      //type: 'final'
    }
  }
})

// A service maintains state through transitions
// doesn't do anything until we `start` the service
const service = interpret(lightBulbMachine).start()

// once service is started we can send events...

// use a listener...
service.onTransition(state => {
  // you can check if the state actually changed
  if (state.changed) {

    // you can also match on particular state
    if (state.matches('broken')) console.log("I'm broken! Fix me!")
    console.log(state.value)
  }
})
// or store state in local variable...
// const nextState = service.send('TOGGLE')
// console.log(nextState.value)

// or don't store it and check the value...
// service.send('TOGGLE')
// service.state.value //?

module.exports = { lightBulbMachine }
