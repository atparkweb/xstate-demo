const STATES = {
  lit: 'lit',
  unlit: 'unlit',
  broken: 'broken'
}

function lightBulb() {
  let state = STATES.unlit

  return {
    state() {
      return state
    },
    toggle() {
      switch (state) {
	case STATES.lit:
	  state = STATES.unlit
	  return true
	case STATES.unlit:
	  state = STATES.lit
	  return true
	default:
	  return false
      }
    },
    break() {
      state = STATES.broken
    }
  }
}

module.exports = { lightBulb, STATES }