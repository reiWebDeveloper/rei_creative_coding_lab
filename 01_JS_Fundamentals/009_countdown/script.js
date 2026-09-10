// countdown element
const displayCountdown = document.getElementById("countdownDisplay");
const countdownDetails = document.querySelectorAll(".countdownDetails");

// button elements
const startCountdownBtn = document.getElementById("startCountdownBtn");
const pauseCountdownBtn = document.getElementById("pauseCountdownBtn");
const cancelCountdownBtn = document.getElementById("cancelCountdownBtn");

// state variables
let countdownInterval = null;
let remainingTime = 0;
let targetTime = 0;
let isPaused = false;

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
    displayCountdown.innerHTML =
        `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

function tick() {
    remainingTime = targetTime - new Date().getTime();

    if (remainingTime < 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        displayCountdown.innerHTML = "EXPIRED";
        setTimeout(() => {
            displayCountdown.style.display = "none";
            startCountdownBtn.style.display = "block";
            pauseCountdownBtn.style.display = "none";
            cancelCountdownBtn.style.display = "none";
            pauseCountdownBtn.textContent = "Pause";
            isPaused = false;
            countdownDetails.forEach((c) => { c.style.display = "flex"; });
        }, 5000);
        return;
    }

    renderTime(remainingTime);
}

startCountdownBtn.addEventListener('click', () => {
    if (countdownInterval) clearInterval(countdownInterval);

    const hoursValue = Number(document.getElementById("selectHours").value);
    const minutesValue = Number(document.getElementById("selectMinutes").value);
    const secValue = Number(document.getElementById("selectSeconds").value);

    const selectedTime = (hoursValue * hourMs) + (minutesValue * minuteMs) + (secValue * secondMs);
    targetTime = new Date().getTime() + selectedTime;
    isPaused = false;
    pauseCountdownBtn.textContent = "Pause";

    displayCountdown.style.display = "block";
    countdownDetails.forEach((c) => { c.style.display = "none"; });
    startCountdownBtn.style.display = "none";
    pauseCountdownBtn.style.display = "block";
    cancelCountdownBtn.style.display = "block";

    tick();
    countdownInterval = setInterval(tick, 1000);
});

pauseCountdownBtn.addEventListener('click', () => {
    if (!isPaused) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        remainingTime = targetTime - new Date().getTime();
        isPaused = true;
        pauseCountdownBtn.textContent = "Resume";
    } else {
        targetTime = new Date().getTime() + remainingTime;
        tick();
        countdownInterval = setInterval(tick, 1000);
        isPaused = false;
        pauseCountdownBtn.textContent = "Pause";
    }
});

cancelCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    displayCountdown.style.display = "none";
    startCountdownBtn.style.display = "block";
    pauseCountdownBtn.style.display = "none";
    cancelCountdownBtn.style.display = "none";
    pauseCountdownBtn.textContent = "Pause";
    isPaused = false;
    countdownDetails.forEach((c) => { c.style.display = "flex"; });
});