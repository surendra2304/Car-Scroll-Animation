/**
 * Web Audio API Engine & Airflow Synthesizer
 * Generates dynamic automotive turbine / engine acoustics tied to scroll velocity.
 * Zero external audio dependencies for 100% reliability.
 */

class CarAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isMuted = true;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low engine hum oscillator
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

      const osc1Gain = this.ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.osc1.connect(osc1Gain);
      osc1Gain.connect(this.masterGain);

      // Sub-bass rumble
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(30, this.ctx.currentTime);

      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.osc2.connect(osc2Gain);
      osc2Gain.connect(this.masterGain);

      // Noise generator for wind / aero flow
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(350, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
      this.noiseNode.start();

      this.isInitialized = true;
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!this.isInitialized && !muted) {
      this.init();
    }
    if (this.ctx && this.masterGain) {
      if (this.ctx.state === 'suspended' && !muted) {
        this.ctx.resume();
      }
      const targetVolume = muted ? 0 : 0.25;
      this.masterGain.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.15);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  /**
   * Modulate engine pitch and airflow based on scroll speed (0 to 1)
   */
  public updateSpeed(normalizedSpeed: number) {
    if (!this.ctx || this.isMuted || !this.osc1 || !this.filterNode) return;
    const now = this.ctx.currentTime;
    
    // Pitch rises with velocity: 45Hz -> 180Hz
    const targetFreq = 45 + normalizedSpeed * 140;
    this.osc1.frequency.cancelScheduledValues(now);
    this.osc1.frequency.linearRampToValueAtTime(targetFreq, now + 0.08);

    if (this.osc2) {
      this.osc2.frequency.cancelScheduledValues(now);
      this.osc2.frequency.linearRampToValueAtTime(30 + normalizedSpeed * 60, now + 0.08);
    }

    // Aero filter frequency opens up with speed
    const aeroFreq = 300 + normalizedSpeed * 900;
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.frequency.linearRampToValueAtTime(aeroFreq, now + 0.08);
  }
}

export const soundEngine = new CarAudioSynthesizer();
