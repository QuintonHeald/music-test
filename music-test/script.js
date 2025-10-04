
const startButton = document.getElementById('startButton');
const scaleSelector = document.getElementById('scaleSelector');

const highOctave = document.getElementById('highOctave');
const middleOctave = document.getElementById('middleOctave');
const lowOctave = document.getElementById('lowOctave');

const instrumentSelector = document.getElementById('instrumentSelector');
const noteButtons = document.getElementById('noteButtons');

let synth;
let currentInstrument = 'Synth';
let scaleLetter = 'C';
let octave = '4';

const scales = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
};

/**
 * Initializes all control functionality & Starts up Tone
 */
async function startAudio() {
    await Tone.start();
    synth = new Tone.Synth().toDestination();

    startButton.classList.add('hidden');

    scaleSelector.classList.remove('hidden');
    instrumentSelector.classList.remove('hidden');
    document.querySelector('label[for="scaleSelector"]').classList.remove('hidden');
    document.querySelector('label[for="instrumentSelector"]').classList.remove('hidden');

    createNoteButtons();
}


/**
 * Creates all not buttons. Note buttons created are based off of user selected scale.
 */
function createNoteButtons() {
    noteButtons.innerHTML = '';

    const scale = scales[scaleLetter];

    scale.forEach((note) => {
        const button = document.createElement('button');
        button.className = 'note-btn';
        button.textContent = `${note}${octave}`;
        button.addEventListener('click', () => {
            playNote(`${note}${octave}`);
        });

        noteButtons.appendChild(button);
    });
}

/**
 * Handles scale change
 */
function handleScaleChange() {
    scaleLetter = scaleSelector.value;
    createNoteButtons();
}

/**
 * Handles instrument change
 */
function handleInstrumentChange() {
    const newInstrument = instrumentSelector.value;

    if (synth) {
        synth.dispose();
    }

    switch (newInstrument) {
        case 'Synth':
            synth = new Tone.Synth().toDestination();
            break;
        case 'AMSynth':
            synth = new Tone.AMSynth().toDestination();
            break;
        case 'DuoSynth':
            synth = new Tone.DuoSynth().toDestination();
            break;
        case 'MembraneSynth':
            synth = new Tone.MembraneSynth().toDestination();
            break;
        case 'MetalSynth':
            synth = new Tone.MetalSynth().toDestination();
            break;
        case 'MonoSynth':
            synth = new Tone.MonoSynth().toDestination();
            break;
        case 'PluckSynth':
            synth = new Tone.PluckSynth().toDestination();
            break;
        default:
            synth = new Tone.Synth().toDestination();
    }

    currentInstrument = newInstrument;
}

function playNote(note) {
    if (synth) {
        synth.triggerAttackRelease(note, "4n");
    }
}

startButton.addEventListener('click', startAudio);
scaleSelector.addEventListener('change', handleScaleChange);
instrumentSelector.addEventListener('change', handleInstrumentChange);