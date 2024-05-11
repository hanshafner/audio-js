const audioContext = new AudioContext();

let intervalId; // Store the interval ID for later access


// OSC 1 parameters

    var osc1Frequency = 440;
    
    // OSC 1 Envelope parameters
    var OSC1_attackTime = 0.2; // seconds
    var OSC1_decayTime = 0.3; // seconds
    var OSC1_sustainLevel = 0.3; // volume level (0 to 1)
    var OSC1_releaseTime = 0.4; // seconds



function playSound() {

    // Check if the AudioContext is in suspended state (this is the case in most modern browsers at the start)
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(osc1Frequency, audioContext.currentTime); // Set frequency to 440 Hz

    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);


    // Initial gain
    gainNode.gain.setValueAtTime(0, now);

    // Attack
    gainNode.gain.linearRampToValueAtTime(1, now + OSC1_attackTime);

    // Decay to Sustain
    gainNode.gain.linearRampToValueAtTime(OSC1_sustainLevel, now + OSC1_attackTime + OSC1_decayTime);

    // Start Oscillator
    oscillator.start(now);

    // Set duration and stop oscillator and gain after sound is done
    const noteDuration = 2; // seconds
    oscillator.stop(now + noteDuration + OSC1_releaseTime);

    // Release
    gainNode.gain.setValueAtTime(OSC1_sustainLevel, now + noteDuration);
    gainNode.gain.linearRampToValueAtTime(0, now + noteDuration + OSC1_releaseTime);
}

function startSequencer() {
    intervalId = setInterval(playSound, 2000); // Set the interval to 500 milliseconds
}

function stopSequencer() {
    clearInterval(intervalId); // Stop the interval
}

function changeFrequency() {
    

}