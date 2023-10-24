let oscArray = {}

function playNote(event) {
  if (event.buttons & 1) {
    const note = event.target

    if (!note.dataset["playing"]) {
      const frequency = note.dataset["frequency"]
      note.dataset["playing"] = true

      const osc = actx.createOscillator();

      osc.connect(actx.destination); // Connect osc with main audiocontext destination
      osc.connect(gainNode); // Set volume control
      osc.type = getCurrentWaveForm(); // Get wave type on Select

      osc.frequency.setValueAtTime(frequency, actx.currentTime); // Set note frequency

      osc.start();
      oscArray[note.dataset["note"]] = osc
    }
  }
}

function stopNote(event) {
  const note = event.target

  if (note.dataset["playing"]) {
    oscArray[note.dataset["note"]].stop();
    delete oscArray[note.dataset["note"]];
    delete note.dataset["playing"]
  }
}

function getCurrentWaveForm() {
  return document.getElementById("waveSelector").value
}

// VOLUME SECTION

function changeVolume(event) {
  volumeDisplay.innerHTML = event.target.value
  synthesizer.changeVolume(volumeInput.value);
}
