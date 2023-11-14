class ADSR {
  constructor(attack, decay, sustain, release) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }

  setValues(attack, decay, sustain, release) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }
}

class Lowpass {
  constructor(freq, Q) {
    this.freq = freq;
    this.Q = Q;
  }

  setValues(freq, Q) {
    this.freq = freq;
    this.Q = Q;
  }
}

class Synthesizer {
  constructor() {
    this.actx = new (AudioContext || webkitAudioContext)();
    this.waveForm = 'sine';
    this.denote = 10;
    this.ADSR = new ADSR(0.005, 0.1, 0.6, 0.1);
    this.lowpass = new Lowpass(0, 0);
    this.gainNode = this.actx.createGain();
    this.gainNode.connect(this.actx.destination);
  }

  setNotes(notes) {
    this.notes = notes;
  }

  getActx() {
    return this.actx;
  }

  setWaveForm(waveForm) {
    this.waveForm = waveForm;
  }

  setDenote(denote) {
    this.denote = parseFloat(denote);
  }

  #getNoteByFrequency(frequency) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].frequency == frequency) {
        return this.notes[i];
      }
    }
    return null;
  }

  #getNoteByKeyCode(code) {
    for (var i = 0; i < this.notes.length; i++) {
      if (this.notes[i].key.code == code) {
        return this.notes[i];
      }
    }
    return null;
  }

  #play(note) {
    note.play(this.actx, this.waveForm, this.ADSR, this.denote, this.lowpass);
  }

  playNote({ frequency, code }) {
    let note = null;

    if (frequency) {
      note = this.#getNoteByFrequency(frequency);
    } else if (code) {
      note = this.#getNoteByKeyCode(code);
    }

    if (note != null) {
      this.#play(note);
    }
  }

  stopNote({ frequency, code }) {
    let note = null;
    if (frequency) {
      note = this.#getNoteByFrequency(frequency);
    } else if (code) {
      note = this.#getNoteByKeyCode(code);
    }

    if (note != null) {
      note.stop(this.ADSR);
    }
  }
}
