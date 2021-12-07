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
      isLit = false
      isBroken = true
    }
  }
}

module.exports = { lightBulb }