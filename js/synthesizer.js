class Synthesizer {
  /**
   * 
   * @param {Note[]} notes 
   */
  constructor(notes) {
    this.actx = new (AudioContext || webkitAudioContext)();
    this.notes = notes;
    this.waveForm = "sine";

    // setting gainnode to adjust volume
    this.gainNode = this.actx.createGain();
    this.gainNode.connect(this.actx.destination)
  }

  changeVolume(value) {
    this.gainNode.gain.value = value;
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

  play(note){
    note.play(
      this.actx,
      this.gainNode,
      this.waveForm
    );
  }

  /**
   * 
   * @param {number} frequency 
   */
  playNote(frequency) {
    let note = this.#getNoteByFrequency(frequency);

    if (note != null) {
      this.play(note)
    }
  }

  playNoteByKeyCode(code) {
    let note = this.#getNoteByKeyCode(code)

    if (note != null) {
      this.play(note)
    }
  }

  /**
   * 
   * @param {number} frequency 
   */
  stopNote(code = null) {
    let note = null
    note = this.#getNoteByKeyCode(code)
    

    if (note != null) {
      note.stop();
    }
  }
}