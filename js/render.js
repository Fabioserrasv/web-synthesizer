const display = new Display();
const synthesizer = new Synthesizer();

InputEvents.assignEvents(display, synthesizer);

function createSynthesizer() {
  const notesToCreate = Object.entries(noteFrequencies);
  const notes = createNotesObjects(notesToCreate);

  synthesizer.setNotes(notes);
  display.createNotes(synthesizer, notes);
}

createSynthesizer();
