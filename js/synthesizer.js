class Synthesizer {
  /**
   * 
   * @param {Note[]} notes 
   */
  constructor() {
    this.actx = new (AudioContext || webkitAudioContext)();
    this.waveForm = "sine";
    this.denote = 10
    this.envelope = {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.6,
      release: 0.1
    }
    this.lowpass = {
      freq: 0,
      Q: 0
    }
    this.gainNode = this.actx.createGain();
    this.gainNode.connect(this.actx.destination)
  }

  setNotes(notes) {
    this.notes = notes;
  }

  setLowpass(freq, Q){
    this.lowpass = {
      freq,
      Q
    }
  }

  getActx() {
    return this.actx;
  }

  changeVolume(value) {
    this.gainNode.gain.value = value;
  }

  setWaveForm(waveForm) {
    this.waveForm = waveForm;
  }

  setDenote(denote){
    this.denote = parseFloat(denote);
  }

  /**
   * 
   * @param {number} frequency 
   */
  #getNoteByFrequency(frequency) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].frequency == frequency) {
        return this.notes[i];
      }
    }
    return null;
  }

  /**
   * 
   * @param {number} frequency 
   */
  #getNoteByKeyCode(code) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].key.code == code) {
        return this.notes[i];
      }
    }
    return null;
  }

  play(note) {
    note.play(
      this.actx,
      this.waveForm,
      this.envelope,
      this.denote,
      this.lowpass
    );
  }

  /**
   * 
   * @param {number} frequency 
   */
  playNote({
    frequency,
    code
  }) {
    let note = null

    if (frequency) {
      note = this.#getNoteByFrequency(frequency);
    } else if (code) {
      note = this.#getNoteByKeyCode(code)
    }

    if (note != null) {
      console.log(note);
      this.play(note)
    }
  }

  /**
   * 
   * @param {number} frequency 
   */
  stopNote({
    frequency,
    code
  }) {
    let note = null
    if (frequency) {
      note = this.#getNoteByFrequency(frequency);
    } else if (code) {
      note = this.#getNoteByKeyCode(code)
    }

    if (note != null) {
      note.stop(this.envelope);
    }
  }

  setADSRValues(attack, decay, sustain, release) {
    this.envelope = {
      attack,
      decay,
      sustain,
      release
    }
  }
}