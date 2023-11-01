const actx = new (AudioContext || webkitAudioContext)();

const volumeInput = document.querySelector("input[name='volume']");
const volumeDisplay = document.querySelector("#volumeDisplay");
const notesContainer = document.querySelector(".notes")
const optionsContainer = document.querySelector(".options")
const waveSelector = document.querySelector("#waveSelector")
const attackSelector = document.querySelector("#attack")
const decaySelector = document.querySelector("#decay")
const sustainSelector = document.querySelector("#sustain")
const releaseSelector = document.querySelector("#release")
const denoteSelector = document.querySelector("#denote")
const denoteDisplay = document.querySelector("#denoteDisplay");

const lowpassFreqSelector = document.querySelector("#lowpassFreq")
const lowpassFreqDisplay = document.querySelector("#lowpassFreqDisplay");

const lowpassQSelector = document.querySelector("#lowpassQ")
const lowpassQDisplay = document.querySelector("#lowpassQDisplay");

// const gainNode = actx.createGain();
// gainNode.connect(actx.destination)
let synthesizer

function createKeyboard() {
  const notesToCreate = Object.entries(noteFrequencies)
  volumeInput.addEventListener("change", changeVolume, false);
  createSelectWaveOptions()

  synthesizer = new Synthesizer();
  notes = createNotesObjects(notesToCreate)
  synthesizer.setNotes(notes);
  createNotes(notes, synthesizer)
}

function createNotesObjects(notesToCreate) {
  let notes = []
  for (let i = 0; i < notesToCreate.length; i++) {
    notes.push(new Note(notesToCreate[i][0], notesToCreate[i][1].frequency, notesToCreate[i][1].key, synthesizer.getActx()));
  }
  return notes;
}

function createNotes(notes, synthesizer) {
  for (let i = 0; i < notes.length; i++) {
    const newNote = createNote(notes[i])
    notes[i].setHTMLElement(newNote)
    notesContainer.appendChild(newNote)
  }
}

function createNote(data) {
  const newNote = document.createElement("div");

  let classes = "note";

  if (data.name.includes("/")) {
    classes += " b";
  }

  newNote.className = classes
  newNote.innerHTML = data.key.name

  newNote.dataset["note"] = data.name
  newNote.dataset["frequency"] = data.frequency

  setNoteEvents(newNote, data.frequency)
  return newNote
}

function setNoteEvents(newNote, frequency) {
  newNote.addEventListener("mousedown", () => {
    synthesizer.playNote({ frequency: frequency, code: null });
  }, false);
  newNote.addEventListener("mouseup", () => {
    synthesizer.stopNote({ frequency: frequency, code: null })
  }, false);
  newNote.addEventListener("mouseover", (e) => {
    if (e.buttons & 1) {
      synthesizer.playNote({ frequency: frequency, code: null })
    }
  }, false);
  newNote.addEventListener("mouseleave", (e) => {
    if (e.buttons & 1) {
      synthesizer.stopNote({ frequency: frequency, code: null })
    }
  }, false);
}

function createSelectWaveOptions() {
  waveForms.forEach((wave) => {
    const newOption = document.createElement("option")

    newOption.value = wave.value
    newOption.innerHTML = wave.display

    waveSelector.appendChild(newOption)
  })
}

function setOnChangeEventsADSR() {
  attackSelector.addEventListener("change", changeADSR)
  decaySelector.addEventListener("change", changeADSR)
  sustainSelector.addEventListener("change", changeADSR)
  releaseSelector.addEventListener("change", changeADSR)
}

function playByKeyCode(event) {
  const key = getKeyCode(event)
  synthesizer.playNote({ code: key })
}

function stopByKeyCode(event) {
  const key = getKeyCode(event)
  synthesizer.stopNote({ code: key, frequency: null })
}

function changeVolume(event) {
  volumeDisplay.innerHTML = event.target.value
  synthesizer.changeVolume(volumeInput.value);
}

function changeADSR() {
  const attack = parseFloat(attackSelector.value);
  const decay = parseFloat(decaySelector.value);
  const sustain = parseFloat(sustainSelector.value);
  const release = parseFloat(releaseSelector.value);
  synthesizer.setADSRValues(attack, decay, sustain, release)
}

function changeDenote() {
  synthesizer.setDenote(denoteSelector.value)
  denoteDisplay.innerHTML = denoteSelector.value
}

function changeLowpass(){
  synthesizer.setLowpass(
    parseFloat(lowpassFreqSelector.value),
    parseFloat(lowpassQSelector.value)
  )
  lowpassFreqDisplay.innerHTML = lowpassFreqSelector.value
  lowpassQDisplay.innerHTML = lowpassQSelector.value
}

function applyEvents(){
  waveSelector.addEventListener("change", (e) => { synthesizer.setWaveForm(e.target.value); console.log(e.target.value); })
  denoteSelector.addEventListener("change", changeDenote);
  window.addEventListener("keydown", playByKeyCode)
  window.addEventListener("keyup", stopByKeyCode)
  lowpassFreqSelector.addEventListener("change", changeLowpass)
  lowpassQSelector.addEventListener("change", changeLowpass)
}

createKeyboard();
setOnChangeEventsADSR();
applyEvents()