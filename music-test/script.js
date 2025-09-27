
const startButton = document.getElementById('startButton');
const statusParagraph = document.getElementById('status');
const scaleParagraph = document.getElementById('scale');
const scaleSelector = document.getElementById('scaleSelector');

// Note buttons
const note4 = document.getElementById('note4');
const note5 = document.getElementById('note5');
const note6 = document.getElementById('note6');

const metalNote4 = document.getElementById('metalNote4');
const metalNote5 = document.getElementById('metalNote5');
const metalNote6 = document.getElementById('metalNote6');

let synth;
let metalSynth;

let scaleLetter = 'C';
let scaleNumber = '4';

async function startAudio() {
    await Tone.start();
    synth = new Tone.Synth().toDestination();
    metalSynth = new Tone.MetalSynth().toDestination();

    // Hide start button
    startButton.classList.add('hidden');

    // Show all controls
    scaleSelector.classList.remove('hidden');
    document.querySelector('label[for="scaleSelector"]').classList.remove('hidden');

    // Show note buttons
    note4.classList.remove('hidden');
    note5.classList.remove('hidden');
    note6.classList.remove('hidden');

    metalNote4.classList.remove('hidden');
    metalNote5.classList.remove('hidden');
    metalNote6.classList.remove('hidden');


    dynamicSoundButton.classList.remove('hidden');

    statusParagraph.textContent = 'Ready to play! Select a scale and play notes.';
    updateScaleDisplay();
}

function updateScaleDisplay() {
    scaleParagraph.textContent = `${scaleLetter} Scale Selected`;
    note4.textContent = `${scaleLetter}4`;
    note5.textContent = `${scaleLetter}5`;
    note6.textContent = `${scaleLetter}6`;
    metalNote4.textContent = `Metal ${scaleLetter}4`;
    metalNote5.textContent = `Metal ${scaleLetter}5`;
    metalNote6.textContent = `Metal ${scaleLetter}6`;
}

// Handle dropdown selection
function handleScaleChange() {
    scaleLetter = scaleSelector.value;
    updateScaleDisplay();
    statusParagraph.textContent = `Switched to ${scaleLetter} scale`;
}

function playNote(number) {
    const note = scaleLetter + number;
    synth.triggerAttackRelease(note, "4n");
    statusParagraph.textContent = `Playing ${note}`;
}

function playMetalNote(number) {
    const note = scaleLetter + number;
    metalSynth.triggerAttackRelease(note, "4n");
    statusParagraph.textContent = `Playing ${note}`;
}

// Event listeners
startButton.addEventListener('click', startAudio);

// Dropdown listener
scaleSelector.addEventListener('change', handleScaleChange);

// Note button listeners
note4.addEventListener('click', () => playNote('4'));
note5.addEventListener('click', () => playNote('5'));
note6.addEventListener('click', () => playNote('6'));

metalNote4.addEventListener('click', () => playMetalNote('4'));
metalNote5.addEventListener('click', () => playMetalNote('5'));
metalNote6.addEventListener('click', () => playMetalNote('6'));