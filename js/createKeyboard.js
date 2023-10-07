const actx = new (AudioContext || webkitAudioContext)();

const noteFrequencies = {
  "C": 261.63,
  "C#/Db": 277.18,
  "D": 293.66,
  "D#/Eb": 311.13,
  "E": 329.63,
  "F": 349.23,
  "F#/Gb": 369.99,
  "G": 392.0,
  "G#/Ab": 415.3,
  "A": 440.0,
  "A#/Bb": 466.16,
  "B": 493.88,
};

const waveForms = [
  { value: 'sine', display: 'Sine' },
  { value: 'square', display: 'Square' },
  { value: 'sawtooth', display: 'Sawtooth' },
  { value: 'triangle', display: 'Triangle' }
]

const volumeInput = document.querySelector("input[name='volume']");
const volumeDisplay = document.querySelector("#volumeDisplay");
const notesContainer = document.querySelector(".notes")
const optionsContainer = document.querySelector(".options")
const waveSelector = document.querySelector("#waveSelector")

const gainNode = actx.createGain();
gainNode.connect(actx.destination)

function createKeyboard() {
  const notesToCreate = Object.entries(noteFrequencies)
  volumeInput.addEventListener("change", changeVolume, false);

  createNotes(notesToCreate)
  createSelectWaveOptions()
}

function createNotes(notesToCreate){
  notesToCreate.forEach((n) => {
    const newNote = document.createElement("div");
    newNote.className = "note"
    newNote.innerHTML = n[0]

    newNote.dataset["note"] = n[0]
    newNote.dataset["frequency"] = n[1]

    newNote.addEventListener("mousedown", playNote, false);
    newNote.addEventListener("mouseup", stopNote, false);
    newNote.addEventListener("mouseover", playNote, false);
    newNote.addEventListener("mouseleave", stopNote, false);

    notesContainer.appendChild(newNote)
  })
}

function createSelectWaveOptions(){
  waveForms.forEach((wave) => {
    const newOption = document.createElement("option")
    
    newOption.value = wave.value
    newOption.innerHTML = wave.display

    waveSelector.appendChild(newOption)
  })
}

createKeyboard();