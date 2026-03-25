// Web Audio API helpers for sound effects

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency, startTime, duration, gainValue = 0.3, type = 'sine') {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gainValue, startTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

export function playCorrect() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  // Ascending C-E-G chime
  playTone(523.25, now, 0.2, 0.35);       // C5
  playTone(659.25, now + 0.15, 0.2, 0.35); // E5
  playTone(783.99, now + 0.30, 0.35, 0.35); // G5
}

export function playWrong() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  // Low bwong tone
  playTone(180, now, 0.4, 0.4, 'sawtooth');
  playTone(150, now + 0.1, 0.4, 0.3, 'sawtooth');
}

export function playCelebration() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  // Quick upbeat fanfare
  const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
  const times = [0, 0.12, 0.24, 0.36, 0.52, 0.64];
  notes.forEach((freq, i) => {
    playTone(freq, now + times[i], 0.18, 0.3);
  });
}
