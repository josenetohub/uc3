// Audio Engine com Web Audio API - Efeitos Sonoros Retrô e Música Ambiente Chiptune
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.bgmPlaying = false;
        this.bgmInterval = null;
        this.init();
    }

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        } catch (e) {
            console.warn("Web Audio API não suportada neste navegador.");
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
        if (this.muted || !this.ctx) return;
        this.resume();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }

    playSelect() {
        this.playTone(440, 'square', 0.08, 0.08);
        setTimeout(() => this.playTone(660, 'square', 0.12, 0.08), 70);
    }

    playStep() {
        if (this.muted || !this.ctx) return;
        this.playTone(120 + Math.random() * 40, 'triangle', 0.05, 0.03);
    }

    playSuccess() {
        if (this.muted || !this.ctx) return;
        const notes = [330, 392, 523, 659];
        notes.forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'sine', 0.2, 0.1), i * 110);
        });
    }

    playError() {
        if (this.muted || !this.ctx) return;
        this.playTone(180, 'sawtooth', 0.15, 0.1);
        setTimeout(() => this.playTone(130, 'sawtooth', 0.25, 0.1), 120);
    }

    playCrash() {
        if (this.muted || !this.ctx) return;
        this.resume();
        try {
            const bufferSize = this.ctx.sampleRate * 0.4;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
            }
            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.ctx.currentTime);
            filter.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.4);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            whiteNoise.start();
        } catch (e) {}
    }

    playLaser() {
        if (this.muted || !this.ctx) return;
        this.resume();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
    }

    playDial() {
        this.playTone(550, 'sine', 0.06, 0.05);
    }

    toggleBgm() {
        this.resume();
        if (this.bgmPlaying) {
            clearInterval(this.bgmInterval);
            this.bgmPlaying = false;
            return false;
        } else {
            this.bgmPlaying = true;
            this.startBgmLoop();
            return true;
        }
    }

    startBgmLoop() {
        // Melodia suave e aconchegante estilo vilarejo Stardew Valley em notas pentatônicas
        const melody = [
            261.63, 329.63, 392.00, 523.25, 392.00, 329.63,
            293.66, 369.99, 440.00, 587.33, 440.00, 369.99,
            246.94, 329.63, 392.00, 493.88, 392.00, 329.63,
            220.00, 261.63, 329.63, 440.00, 329.63, 261.63
        ];
        let noteIdx = 0;
        this.bgmInterval = setInterval(() => {
            if (this.muted || !this.bgmPlaying || !this.ctx) return;
            const freq = melody[noteIdx];
            noteIdx = (noteIdx + 1) % melody.length;
            this.playTone(freq, 'triangle', 0.25, 0.025);
        }, 340);
    }
}

window.soundEngine = new SoundEngine();
