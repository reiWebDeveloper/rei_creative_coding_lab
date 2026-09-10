let timeLeft = 60;
let timerStarted = false;
let gameOver = false;
let typeSpeedInterval = null;
let currentIndex = 0;
const timer = document.getElementById("timer");
const border = document.getElementById("timerBorder");

// user score
const userMetric = document.getElementById("userMetric");

// words
const wordsPool = [
  "cat","dog","sun","tree","book","pen","car","run","jump","fast",
  "slow","blue","red","green","happy","sad","light","dark","water","fire",
  "earth","wind","stone","cloud","rain","snow","storm","river","ocean","lake",
  "mountain","hill","valley","road","path","bridge","house","home","room","door",
  "window","chair","table","floor","ceiling","wall","clock","watch","time","day",
  "night","morning","evening","week","month","year","people","person","child","adult",
  "friend","family","group","team","work","job","task","goal","plan","idea",
  "mind","brain","thought","logic","skill","learn","study","read","write","type",
  "speak","listen","hear","sound","music","voice","noise","quiet","loud","soft",
  "quick","brown","fox","lazy","dog","keyboard","screen","monitor","mouse","click",
  "scroll","input","output","data","array","object","string","number","boolean","function",
  "variable","constant","loop","condition","return","value","error","debug","compile","execute",
  "random","select","shuffle","index","length","speed","accuracy","practice","test","score",
  "result","progress","level","challenge","simple","complex","easy","medium","hard","focus",
  "energy","power","control","system","network","server","client","request","response","protocol",
  "internet","website","browser","search","engine","query","result","page","content","design",
  "color","style","layout","format","font","size","align","center","left","right",
  "margin","padding","border","display","flex","grid","position","absolute","relative","fixed",
  "overflow","hidden","visible","scrollbar","event","click","hover","keydown","keyup","input",
  "submit","form","field","label","button","link","anchor","image","video","audio",
  "file","upload","download","save","load","open","close","start","stop","pause"
];
const textToWrite = document.getElementById("textToWrite");
let fullText = "";
let span = null;
let spans = [];
let selectedWords = [];

const btn = document.getElementById("tryAgainBtn");

function selectRandomWords() {

    selectedWords = [];
    const poolCopy = [...wordsPool];

    for (let i = 0; i < 90; i++) {
        const randomIndex = Math.floor(Math.random() * poolCopy.length);
        selectedWords.push(poolCopy.splice(randomIndex, 1)[0]);
    }

    fullText = selectedWords.join(" ");

    textToWrite.innerHTML = ""; // clear before re-render

    fullText.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        textToWrite.appendChild(span);
    });

    spans = textToWrite.querySelectorAll("span");
}

function countdown() {
    timerStarted = true;
    typeSpeedInterval = setInterval(()=> {
        timeLeft--;

        timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            typeSpeedTestFinsihed();
        }
    },1000);
}

function calculateScore() {
    const minutes = 60 / 60; // total test time in minutes
    const userScore = Math.round((currentIndex / 5) / minutes);
    userMetric.textContent = "Your Score: " + userScore + " WPM";
}

function typeSpeedTestFinsihed() {
    gameOver = true;
    clearInterval(typeSpeedInterval);

    calculateScore();

    timeLeft = 60;
    currentIndex = 0;
    timerStarted = false;

    textToWrite.innerHTML = "";
    selectRandomWords();
    textToWrite.style.transform = "translateX(0)";
    timer.textContent = timeLeft;

    gameOver = false;
}

selectRandomWords();

document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    if (currentIndex >= fullText.length) return;

    if (!timerStarted) countdown();

    const expectedChar = fullText[currentIndex];
    const avgCharWidth = textToWrite.offsetWidth / fullText.length;

    if (e.key === expectedChar) {
        // correct -> move text left, color char orange
        spans[currentIndex].classList.remove("wrong");
        spans[currentIndex].classList.add("correct");
        currentIndex++;
        textToWrite.style.transform = `translateX(-${currentIndex * avgCharWidth}px)`;
    } else {
        // wrong -> color char red, don't move the text
        spans[currentIndex].classList.add("wrong");
    }
});

// try other button
btn.addEventListener('click', typeSpeedTestFinsihed);