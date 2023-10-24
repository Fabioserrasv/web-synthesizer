class Note{
  /**
   * 
   * @param {{code: number, name: string}} key 
   * @param {string} name 
   * @param {number} frequency 
   */
  constructor(name, frequency, key) {
    this.name = name;
    this.frequency = frequency;
    this.playing = false;
    this.osc = null
    this.key = key
  }

  #createOscillator(actx, gainNode, waveForm){
    const osc = actx.createOscillator();
    osc.connect(actx.destination); // Connect osc with main audiocontext destination
    osc.connect(gainNode); // Set volume control
    osc.type = waveForm // Get wave type on Select
    this.osc = osc;
  }

  play(actx, gainNode, waveForm){
    if (this.playing) return;
    
    this.#createOscillator(actx, gainNode, waveForm);

    this.playing = true;

    this.osc.frequency.setValueAtTime(this.frequency, actx.currentTime); // Set note frequency
    this.osc.start();
  }

  stop(){
    this.osc.stop();
    this.playing = false;
  }
}