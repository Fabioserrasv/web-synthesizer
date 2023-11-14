class Display {
  constructor() {
    this.notesContainer = document.querySelector('.notes');
    this.optionsContainer = document.querySelector('.options');

    this.denoteDisplay = document.querySelector('#denoteDisplay');
    this.lowpassFreqDisplay = document.querySelector('#lowpassFreqDisplay');
    this.lowpassQDisplay = document.querySelector('#lowpassQDisplay');

    this.denoteSelector = document.querySelector('#denote');
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
      this.notesContainer.appendChild(newNote);
    }
  }

  #createNote(synthesizer, data) {
    const newNote = document.createElement('div');

    let classes = 'note';

    if (data.name.includes('/')) {
      classes += ' b';
    }

    newNote.className = classes;
    newNote.innerHTML = data.key.name;

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
