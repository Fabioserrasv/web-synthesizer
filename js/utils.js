function getKeyCode(event) {
  let keyCode;

  const isKeyboard = event.type === "keydown" || event.type ==="keyup"
  if (isKeyboard) {
    keyCode = event.keyCode
  }

  return keyCode
}