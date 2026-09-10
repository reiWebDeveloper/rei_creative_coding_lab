const startStopStopwatchBtn = document.getElementById("startStopBtn");
const displayStopwatch = document.getElementById("stopwatchDisplay");
const resetStopwatchbtn = document.getElementById("resetBtn");

let stopwatchInterval = null;
let startTime = null;
let savedElapsed = 0;

const secondMs = 1000;
const minuteMs = 60 * 1000;
const hourMs = 60 * 60 * 1000;

function pad(n) {
    return String(n).padStart(2, '0');
}

function renderTime(ms) {
    const hours = Math.floor(ms / hourMs);
    const minutes = Math.floor((ms % hourMs) / minuteMs);
    const seconds = Math.floor((ms % minuteMs) / secondMs);
    displayStopwatch.innerHTML =
        `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

function tick() {
    const now = new Date().getTime();
    const elapsedTime = (now - startTime) + savedElapsed;

    renderTime(elapsedTime);
}

function handleStartStop() {
    if (startStopStopwatchBtn.innerHTML === "START") {
        startStopStopwatchBtn.innerHTML = "STOP";
        startStopStopwatchBtn.style.backgroundColor = "rgb(237, 75, 75)";
        startStopStopwatchBtn.style.color = "#5c211a"
        startTime = new Date().getTime();

        stopwatchInterval = setInterval(tick, 10);

    } else {
        startStopStopwatchBtn.innerHTML = "START";
        startStopStopwatchBtn.style.backgroundColor = "rgb(80, 228, 80)";
        startStopStopwatchBtn.style.color = "#1a5c1a";
        savedElapsed += new Date().getTime() - startTime;
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
}

function handleReset() {
    startStopStopwatchBtn.innerHTML = "START";
    startStopStopwatchBtn.style.backgroundColor = "rgb(80, 228, 80)";
    startStopStopwatchBtn.style.color = "#1a5c1a";
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    isRunning = false;
    savedElapsed = 0;
    startTime = null;
    renderTime(0);
}

startStopStopwatchBtn.addEventListener('click',  handleStartStop);
resetStopwatchbtn.addEventListener('click', handleReset);