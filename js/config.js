const noteFrequencies = {
  "C3": { frequency: 130.81, key: { code: 65, name: "A" } },
  "C#3/Db3": { frequency: 138.59, key: { code: 87, name: "W" } },
  "D3": { frequency: 146.83, key: { code: 83, name: "S" } },
  "D#3/Eb3": { frequency: 155.56, key: { code: 69, name: "E" } },
  "E3": { frequency: 164.81, key: { code: 68, name: "D" } },
  "F3": { frequency: 174.61, key: { code: 70, name: "F" } },
  "F#3/Gb3": { frequency: 185.00, key: { code: 84, name: "T" } },
  "G3": { frequency: 196.00, key: { code: 71, name: "G" } },
  "G#3/Ab3": { frequency: 207.65, key: { code: 89, name: "Y" } },
  "A3": { frequency: 220.00, key: { code: 72, name: "H" } },
  "A#3/Bb3": { frequency: 233.08, key: { code: 85, name: "U" } },
  "B3": { frequency: 246.94, key: { code: 74, name: "J" } },
  "C4": { frequency: 261.63, key: { code: 75, name: "K" } },
  "C#4/Db4": { frequency: 277.18, key: { code: 79, name: "O" } },
  "D4": { frequency: 293.66, key: { code: 76, name: "L" } },
  "D#4/Eb4": { frequency: 311.13, key: { code: 59, name: ";" } },
  "E4": { frequency: 329.63, key: { code: 39, name: "'" } },
  "F4": { frequency: 349.23, key: { code: 221, name: "[" } },
  "F#4/Gb4": { frequency: 369.99, key: { code: 220, name: "\\" } },
  "G4": { frequency: 392.00, key: { code: 90, name: "Z" } },
  "G#4/Ab4": { frequency: 415.30, key: { code: 88, name: "X" } },
  "A4": { frequency: 440.00, key: { code: 67, name: "C" } },
  "A#4/Bb4": { frequency: 466.16, key: { code: 86, name: "V" } },
  "B4": { frequency: 493.88, key: { code: 66, name: "B" } },
  "C5": { frequency: 523.25, key: { code: 78, name: "N" } }
};

const waveForms = [
  { value: 'sine', display: 'Sine' },
  { value: 'square', display: 'Square' },
  { value: 'sawtooth', display: 'Sawtooth' },
  { value: 'triangle', display: 'Triangle' }
]