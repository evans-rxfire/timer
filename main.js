const timerContainer = document.getElementById("timer-container");
const displayContainer = document.getElementById("display-container");
const timerDisplay = document.getElementById("timer-display");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

const DEFAULT_BG = "#D3D3D3";

const timerStates = [
    {
        name: "work",
        inputId: "set-work-length",
        backgroundColor: "#1E90FF",
        color: "#228B22",
        sound: "sounds/alarm2.ogg"
    },
    {
        name: "break",
        inputId: "set-break-length",
        backgroundColor: "#3CB371",
        color: "#DC143C",
        sound: "sounds/alarm1.wav"
    }
];

let currentTimerState = "work";

let timerLength;
let pausedTime = null;
let timerInterval = null;

let alarmInterval = null;
const maxPulses = 5;


// Functions
// Helper functions
function formatTime(seconds){
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    if (secs < 10) secs = "0" + secs;
    return { mins, secs };
}

function getStateIndex(state) {
    return timerStates.findIndex(obj => obj.name === state);
}

function updateDisplay(state) {
    let currentIndex = getStateIndex(state);
    let time = Number(document.getElementById(timerStates[currentIndex].inputId).value) * 60;

    const { mins, secs } = formatTime(time);

    minutesSpan.textContent = mins;
    secondsSpan.textContent = secs;
}

updateDisplay(currentTimerState);

async function runTimer(state) {
    let currentIndex = getStateIndex(state);
    let nextIndex = (currentIndex + 1) % timerStates.length;
    let nextState = timerStates[nextIndex].name;

    if (pausedTime !== null) {
        timerLength = pausedTime;
    } else {
        timerLength = Number(document.getElementById(timerStates[currentIndex].inputId).value) * 60;
    }

    timerInterval = setInterval(async () => {
        timerLength = Math.max(0, timerLength - 1);

        const { mins, secs } = formatTime(timerLength);
        minutesSpan.textContent = mins;
        secondsSpan.textContent = secs;

        displayContainer.style.backgroundColor = timerStates[currentIndex].backgroundColor;

        if (timerLength === 0) {
            clearInterval(timerInterval);
            pausedTime = null;

            if (alarmInterval !== null) return;
            await runAlarmSequence(state);

            currentTimerState = nextState;

            runTimer(nextState);
        }    
    }, 1000);
}

function runAlarmSequence(state) {
    return new Promise(resolve => {
        let currentIndex = getStateIndex(state);
        let pulseCount = 0;
        let isOn = false;
        
        alarmInterval = setInterval(function() {
            if (pulseCount >= maxPulses) {
                clearInterval(alarmInterval);
                displayContainer.style.backgroundColor = DEFAULT_BG;
                pulseCount = 0;
                alarmInterval = null;
                resolve();
                return;
            }
            else if (isOn === false) {
                displayContainer.style.backgroundColor = timerStates[currentIndex].color;
                let sound = new Audio(timerStates[currentIndex].sound);
                sound.play();
                isOn = true;
            }
            else {
                displayContainer.style.backgroundColor = DEFAULT_BG;
                isOn = false;
                pulseCount++;
            }
        }, 500);
    });
}

// Event listeners
startBtn.addEventListener("click", () => {
    if(timerInterval !== null) return;
    runTimer(currentTimerState);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    timerInterval = null;
    pausedTime = timerLength;

    if (alarmInterval !== null) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    timerInterval = null;
    currentTimerState = "work";
    pausedTime = null;

    displayContainer.style.backgroundColor = DEFAULT_BG;
    updateDisplay(currentTimerState);

    if (alarmInterval !== null) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
});
