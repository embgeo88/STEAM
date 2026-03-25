// SpeechSynthesis wrapper

let currentUtterance = null;

export function speak(text, options = {}) {
  if (!window.speechSynthesis) return;

  // Cancel any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 0.85;
  utterance.pitch = options.pitch || 1.1;
  utterance.volume = options.volume || 1.0;

  // Try to find a good voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Google US English') ||
        v.name.includes('Alex'))
  );
  if (preferred) utterance.voice = preferred;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function cancelSpeech() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}
