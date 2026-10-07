// Clean, lightweight Web Audio API Sound Synthesizer for Gamified Learning
let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMuteSound = (muted?: boolean) => {
  if (muted !== undefined) {
    isMuted = muted;
  } else {
    isMuted = !isMuted;
  }
  try {
    localStorage.setItem('smartlearn_sound_muted', isMuted ? 'true' : 'false');
  } catch (e) {}
  return isMuted;
};

export const isSoundMuted = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('smartlearn_sound_muted') === 'true';
  }
  return isMuted;
};

// Play short XP gain chime
export const playXpChime = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(523.25, now); // C5
  osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
};

// Play Success / Correct Answer ding
export const playSuccessSound = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [
    { freq: 440.00, delay: 0 },
    { freq: 554.37, delay: 0.08 },
    { freq: 659.25, delay: 0.16 },
    { freq: 880.00, delay: 0.24 }
  ].forEach(note => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, now + note.delay);

    gain.gain.setValueAtTime(0.15, now + note.delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.delay);
    osc.stop(now + note.delay + 0.3);
  });
};

// Play Level Up / Certificate Fanfare
export const playLevelUpFanfare = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const melody = [
    { freq: 523.25, time: 0.0, dur: 0.12 }, // C5
    { freq: 659.25, time: 0.12, dur: 0.12 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.12 }, // G5
    { freq: 1046.50, time: 0.36, dur: 0.45 } // C6
  ];

  melody.forEach(note => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0.1, now + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + note.dur);
  });
};

// Play Combo Streak chime
export const playComboSound = (comboCount: number) => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const baseFreq = 440 + Math.min(comboCount * 60, 600);
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
};

// Play Exam Passed Fanfare
export const playExamPassedSound = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const fanfare = [
    { freq: 440.00, time: 0.0, dur: 0.15 },
    { freq: 554.37, time: 0.15, dur: 0.15 },
    { freq: 659.25, time: 0.3, dur: 0.2 },
    { freq: 880.00, time: 0.5, dur: 0.4 }
  ];

  fanfare.forEach(note => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0.18, now + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + note.dur);
  });
};

// Play Exam Failed low chime
export const playExamFailedSound = () => {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const lowTones = [
    { freq: 280, time: 0.0, dur: 0.2 },
    { freq: 220, time: 0.2, dur: 0.35 }
  ];

  lowTones.forEach(note => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0.08, now + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + note.dur);
  });
};
