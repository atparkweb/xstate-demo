function lightbulb() {
  let isLit = false;
  let isBroken = false;

  return {
    state() {
      return { isList, isBroken }
    },
    toggle() {
      isList = !isLit
    },
    break() {
      isBroken = true
    }
  }
}