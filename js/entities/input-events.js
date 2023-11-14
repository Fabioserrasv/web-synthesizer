class InputEvents {
  static assignEvents(display, synthesizer) {
    const {
      waveSelector,
      denoteSelector,
      lowpassFreqSelector,
      lowpassQSelector,
    } = display;

    const modifyDenote = () => changeDenote(display, synthesizer);
    const modifyLowpass = () => changeLowpass(display, synthesizer);

    const startPlaying = (event) => playByKeyCode(synthesizer, event);
    const stopPlaying = (event) => stopByKeyCode(synthesizer, event);

    waveSelector.addEventListener('change', (e) => {
      synthesizer.setWaveForm(e.target.value);
    });
    denoteSelector.addEventListener('change', modifyDenote);
    window.addEventListener('keydown', startPlaying);
    window.addEventListener('keyup', stopPlaying);
    lowpassFreqSelector.addEventListener('change', modifyLowpass);
    lowpassQSelector.addEventListener('change', modifyLowpass);

    InputEvents.setOnChangeEventsADSR(display, synthesizer);
  }

  static setNoteEvents(synthesizer, newNote, frequency) {
    newNote.addEventListener(
      'mousedown',
      () => {
        synthesizer.playNote({ frequency: frequency, code: null });
      },
      false
    );
    newNote.addEventListener(
      'mouseup',
      () => {
        synthesizer.stopNote({ frequency: frequency, code: null });
      },
      false
    );
    newNote.addEventListener(
      'mouseover',
      (e) => {
        if (e.buttons & 1) {
          synthesizer.playNote({ frequency: frequency, code: null });
        }
      },
      false
    );
    newNote.addEventListener(
      'mouseleave',
      (e) => {
        if (e.buttons & 1) {
          synthesizer.stopNote({ frequency: frequency, code: null });
        }
      },
      false
    );
  }

  static setOnChangeEventsADSR(display, synthesizer) {
    const { attackSelector, decaySelector, sustainSelector, releaseSelector } =
      display;

    const modifyADSR = () => changeADSR(display, synthesizer);

    attackSelector.addEventListener('change', modifyADSR);
    decaySelector.addEventListener('change', modifyADSR);
    sustainSelector.addEventListener('change', modifyADSR);
    releaseSelector.addEventListener('change', modifyADSR);
  }
}
