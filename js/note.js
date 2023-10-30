class Note {
  /**
   * 
   * @param {{code: number, name: string}} key 
   * @param {string} name 
   * @param {number} frequency 
   */
  constructor(name, frequency, key, actx) {
    this.name = name;
    this.key = key
    this.frequency = frequency;
    this.playing = false;
    
    this.actx = actx
    this.oscs = []
    this.waveForm = null
  }

  #applyASDRKeyDown(oscT, attack, decay, sustain, time) {
    const gainNode = oscT[1]
    const currentTime = this.actx.currentTime;
    gainNode.gain.cancelScheduledValues(currentTime);

    const atkDuration = attack * time
    const atkEnd = currentTime + atkDuration
    const decayDuration = decay * time

    gainNode.gain.setValueAtTime(0, currentTime)
    gainNode.gain.linearRampToValueAtTime(1, atkEnd)
    gainNode.gain.setTargetAtTime(sustain, atkEnd, decayDuration)
  }

  #applyASDRKeyUp(gainNode, release, time) {
    const currentTime = this.actx.currentTime

    gainNode.gain.cancelScheduledValues(currentTime);

    const relDuration = release * time
    const relEnd = currentTime + relDuration

    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime)
    gainNode.gain.linearRampToValueAtTime(0, relEnd)
  }

  #createOscillator(detune = 0) {
    const osc = this.actx.createOscillator();
    const gainNode = this.actx.createGain();

    osc.frequency.value = this.frequency
    osc.detune.value = detune
    osc.type = this.waveForm // Get wave type on Select
    
    gainNode.gain.value = 0;
    gainNode.connect(this.actx.destination)

    osc.connect(gainNode);

    osc.start()
    return [osc, gainNode]
  }

  #createMultipleOscillator() {
    const oscs = []
    oscs.push(this.#createOscillator(0))
    oscs.push(this.#createOscillator(-10))
    oscs.push(this.#createOscillator(10))
    return oscs
  }

  play(actx, waveForm, envelope) {
    if (this.playing) return;
    this.playing = true;

    this.actx = actx;
    this.waveForm = waveForm;

    this.oscs = this.#createMultipleOscillator();

    this.oscs.forEach((osc) => {
      this.#applyASDRKeyDown(
        osc, 
        envelope.attack,
        envelope.decay,
        envelope.sustain,
        1
      )
    })
  }

  stop(envelope) {
    this.playing = false;

    this.oscs.forEach((osc) => {
      this.#applyASDRKeyUp(
        osc[1],
        envelope.release,
        1
      )
    })
  }
}