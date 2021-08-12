function lightBulb() {
  let isLit = false;
  let isBroken = false;

  return {
    state() {
      return { isLit, isBroken }
    },
    toggle() {
      isLit = !isLit
    },
    break() {
      isBroken = true
    }
  }
}

const bulb = lightBulb()
const log = () => console.log(bulb.state())

// Demonstrates an impossible state (i.e. On and Broken)
bulb.toggle()
bulb.break()
log()