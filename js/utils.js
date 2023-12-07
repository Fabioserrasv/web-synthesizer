function getKeyCode(event) {
  let keyCode;

  const isKeyboard = event.type === 'keydown' || event.type === 'keyup';
  if (isKeyboard) {
    keyCode = event.keyCode;
  }

  return keyCode;
}

function createNotesObjects(notesToCreate) {
  let notes = [];
  for (let i = 0; i < notesToCreate.length; i++) {
    notes.push(
      new Note(
        notesToCreate[i][0],
        notesToCreate[i][1].frequency,
        notesToCreate[i][1].key,
        synthesizer.getActx()
      )
    );
  }
  return notes;
}

function changeADSR(display, synthesizer) {
  const { attackSelector, decaySelector, sustainSelector, releaseSelector } =
    display;

  const attack = parseFloat(attackSelector.value);
  const decay = parseFloat(decaySelector.value);
  const sustain = parseFloat(sustainSelector.value);
  const release = parseFloat(releaseSelector.value);

  synthesizer.ADSR.setValues(attack, decay, sustain, release);
}

function changeDetune(display, synthesizer) {
  const { detuneSelector } = display;

  synthesizer.setDetune(detuneSelector.value);
  detuneDisplay.innerHTML = detuneSelector.value;
}

function changeLowpass(display, synthesizer) {
  const { lowpassFreqSelector, lowpassQSelector } = display;

  synthesizer.lowpass.setValues(
    parseFloat(lowpassFreqSelector.value),
    parseFloat(lowpassQSelector.value)
  );

  lowpassFreqDisplay.innerHTML = lowpassFreqSelector.value;
  lowpassQDisplay.innerHTML = lowpassQSelector.value;
}

function playByKeyCode(synthesizer, event) {
  const key = getKeyCode(event);
  synthesizer.playNote({ code: key });
}

function stopByKeyCode(synthesizer, event) {
  const key = getKeyCode(event);
  synthesizer.stopNote({ code: key, frequency: null });
}
