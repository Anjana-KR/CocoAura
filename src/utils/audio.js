// Web Audio API based ambient sound generator (nature/ocean breeze)
let audioCtx = null;
let oceanGain = null;
let isPlaying = false;
let pinkNoiseNode = null;

export function toggleOceanAmbience() {
  if (isPlaying) {
    stopOceanAmbience();
    return false;
  } else {
    startOceanAmbience();
    return true;
  }
}

export function startOceanAmbience() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Create pink noise buffer for realistic ocean/wind surf
    const bufferSize = audioCtx.sampleRate * 3;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Gentle low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    // Wave swell LFO
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // ~8 sec wave period
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(250, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    oceanGain = audioCtx.createGain();
    oceanGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    oceanGain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 2);

    whiteNoise.connect(filter);
    filter.connect(oceanGain);
    oceanGain.connect(audioCtx.destination);
    
    whiteNoise.start();
    pinkNoiseNode = whiteNoise;
    isPlaying = true;
    return true;
  } catch (err) {
    console.warn("Could not start ambient sound:", err);
    return false;
  }
}

export function stopOceanAmbience() {
  if (oceanGain && audioCtx) {
    try {
      oceanGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (pinkNoiseNode) {
          try { pinkNoiseNode.stop(); } catch(e) {}
        }
        isPlaying = false;
      }, 1000);
    } catch (e) {
      isPlaying = false;
    }
  } else {
    isPlaying = false;
  }
}
