class Note {
  constructor(name, frequency, key, actx) {
    this.name = name;
    this.key = key;
    this.frequency = frequency;
    this.playing = false;

    this.actx = actx;
    this.oscs = [];
    this.waveForm = null;

    this.html = null;
  }

  #applyASDRKeyDown(oscT, attack, decay, sustain, time) {
    const gainNode = oscT[1];
    const currentTime = this.actx.currentTime;
    gainNode.gain.cancelScheduledValues(currentTime);

    const atkDuration = attack * time;
    const atkEnd = currentTime + atkDuration;
    const decayDuration = decay * time;

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(1, atkEnd);
    gainNode.gain.setTargetAtTime(sustain, atkEnd, decayDuration);
  }

  #applyASDRKeyUp(gainNode, release, time) {
    const currentTime = this.actx.currentTime;

    gainNode.gain.cancelScheduledValues(currentTime);

    const relDuration = release * time;
    const relEnd = currentTime + relDuration;

    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, relEnd);
  }

  #applyLowPassFilter(osc, { freq, Q }) {
    const MAX = this.actx.sampleRate / 2;
    const filter = this.actx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = freq * MAX;
    filter.Q.value = Q * 30;

    return filter;
  }

  #createOscillator(detune = 0) {
    const osc = this.actx.createOscillator();
    const gainNode = this.actx.createGain();

    osc.frequency.value = this.frequency;
    osc.detune.value = detune;
    osc.type = this.waveForm;

    gainNode.gain.value = 0;
    gainNode.connect(this.actx.destination);

    osc.connect(gainNode);

    osc.start();
    return [osc, gainNode];
  }

  #createMultipleOscillator(denote) {
    const oscs = [];
    oscs.push(this.#createOscillator(0));
    oscs.push(this.#createOscillator(-denote));
    oscs.push(this.#createOscillator(denote));
    return oscs;
  }

  play(actx, waveForm, ADSR, denote, lowpass) {
    if (this.playing) return;
    this.playing = true;

    this.actx = actx;
    this.waveForm = waveForm;

    this.oscs = this.#createMultipleOscillator(denote);

    this.addPlaying(this.html);

    this.oscs.forEach((osc) => {
      let filter = this.#applyLowPassFilter(osc[1], lowpass);
      osc[1].connect(filter);
      filter.connect(this.actx.destination);
      this.#applyASDRKeyDown(osc, ADSR.attack, ADSR.decay, ADSR.sustain, 1);
    });
  }

  stop(ADSR) {
    this.playing = false;

    this.removePlaying(this.html);

    this.oscs.forEach((osc) => {
      this.#applyASDRKeyUp(osc[1], ADSR.release, 1);
    });
  }

  setHTMLElement(element) {
    this.html = element;
  }

  addPlaying(note) {
    const classes = note.className.split(' ');
    classes.push('playing');
    note.className = classes.join(' ');
  }

  removePlaying(note) {
    let classes = note.className.split(' ');
    const index = classes.indexOf('playing');
    classes.splice(index, 1);
    note.className = classes.join(' ');
  }
}
