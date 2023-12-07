class Display {
  constructor() {
    this.notesContainer = document.querySelector('.notes');
    this.notesBContainer = document.querySelector('.notesb');
    this.optionsContainer = document.querySelector('.options');

    this.detuneDisplay = document.querySelector('#detuneDisplay');
    this.lowpassFreqDisplay = document.querySelector('#lowpassFreqDisplay');
    this.lowpassQDisplay = document.querySelector('#lowpassQDisplay');

    this.detuneSelector = document.querySelector('#detune');
    this.waveSelector = document.querySelector('#waveSelector');
    this.attackSelector = document.querySelector('#attack');
    this.decaySelector = document.querySelector('#decay');
    this.sustainSelector = document.querySelector('#sustain');
    this.releaseSelector = document.querySelector('#release');
    this.lowpassFreqSelector = document.querySelector('#lowpassFreq');
    this.lowpassQSelector = document.querySelector('#lowpassQ');

    this.#createSelectWaveOptions();

    return this;
  }

  createNotes(synthesizer, notes) {
    for (let i = 0; i < notes.length; i++) {
      const newNote = this.#createNote(synthesizer, notes[i]);
      notes[i].setHTMLElement(newNote);
      if (notes[i].name.includes('/')) {
        this.notesBContainer.appendChild(newNote);
      }else{
        this.notesContainer.appendChild(newNote);
      }
    }
  }

  #createNote(synthesizer, data) {
    const newNote = document.createElement('div');
    const span = document.createElement('span');
    let classes = 'note';

    if (data.name.includes('/')) {
      classes += ' b';
    }

    newNote.className = classes;
    span.innerHTML = data.key.name
    newNote.appendChild(span);

    newNote.dataset['note'] = data.name;
    newNote.dataset['frequency'] = data.frequency;

    InputEvents.setNoteEvents(synthesizer, newNote, data.frequency);
    return newNote;
  }

  #createSelectWaveOptions() {
    waveForms.forEach((wave) => {
      const newOption = document.createElement('option');

      newOption.value = wave.value;
      newOption.innerHTML = wave.display;

      waveSelector.appendChild(newOption);
    });
  }
}
