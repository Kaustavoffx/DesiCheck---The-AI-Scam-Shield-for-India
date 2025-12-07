// Simple synthesizer for a phone ringtone to avoid asset dependencies
let audioContext: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};

export const playRingtone = () => {
  if (!audioContext) initAudio();
  if (!audioContext) return;

  const ctx = audioContext;
  const t = ctx.currentTime;

  oscillator = ctx.createOscillator();
  gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // iPhone-ish "Opening" ringtone approximation (marimba-ish arpeggio)
  // Notes: E5, G#5, B5, C#6, E6... looped
  // A simple urgent digital trill is safer for synthesis code
  oscillator.type = 'sine';
  
  // Create a rhythmic pattern
  const now = ctx.currentTime;
  oscillator.frequency.setValueAtTime(880, now); // A5

  // Modulate volume for a "Ring Ring" effect
  // Ring for 2 seconds, pause for 1
  gainNode.gain.setValueAtTime(0, now);
  
  // Loop effect manually for 30 seconds
  for(let i = 0; i < 15; i++) {
    const start = now + (i * 3);
    // Ring pulse 1
    gainNode.gain.linearRampToValueAtTime(0.5, start);
    gainNode.gain.linearRampToValueAtTime(0.5, start + 0.4);
    gainNode.gain.linearRampToValueAtTime(0, start + 0.45);
    
    // Ring pulse 2
    gainNode.gain.linearRampToValueAtTime(0.5, start + 0.6);
    gainNode.gain.linearRampToValueAtTime(0.5, start + 1.8);
    gainNode.gain.linearRampToValueAtTime(0, start + 1.9);
  }

  oscillator.start(now);
};

export const stopRingtone = () => {
  if (oscillator) {
    try {
      oscillator.stop();
      oscillator.disconnect();
    } catch (e) {}
    oscillator = null;
  }
};
