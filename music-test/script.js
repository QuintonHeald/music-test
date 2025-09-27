
const startButton = document.getElementById('startButton');
const statusParagraph = document.getElementById('status');
const scaleParagraph = document.getElementById('scale');
const scaleSelector = document.getElementById('scaleSelector');

// Note buttons
const note4 = document.getElementById('note4');
const note5 = document.getElementById('note5');
const note6 = document.getElementById('note6');

let synth;
let scaleLetter = 'C';
let scaleNumber = '4';

async function startAudio() {
    await Tone.start();
    synth = new Tone.Synth().toDestination();

    // Hide start button
    startButton.classList.add('hidden');

    // Show all controls
    scaleSelector.classList.remove('hidden');
    document.querySelector('label[for="scaleSelector"]').classList.remove('hidden');

    // Show note buttons
    note4.classList.remove('hidden');
    note5.classList.remove('hidden');
    note6.classList.remove('hidden');

    dynamicSoundButton.classList.remove('hidden');

    statusParagraph.textContent = 'Ready to play! Select a scale and play notes.';
    updateScaleDisplay();
}

function updateScaleDisplay() {
    scaleParagraph.textContent = `${scaleLetter} Scale Selected`;
    note4.textContent = `${scaleLetter}4`;
    note5.textContent = `${scaleLetter}5`;
    note6.textContent = `${scaleLetter}6`;
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

// Event listeners
startButton.addEventListener('click', startAudio);

// Dropdown listener
scaleSelector.addEventListener('change', handleScaleChange);

// Note button listeners
note4.addEventListener('click', () => playNote('4'));
note5.addEventListener('click', () => playNote('5'));
note6.addEventListener('click', () => playNote('6'));