// get the elements for the click counter
const counterText = document.getElementById("counterText");
const clickBtn = document.getElementById("clickBtn");
const resetBtn = document.getElementById("resetBtn");
const endMessage = document.getElementById("endMsg");
const titleTxt = document.getElementById("titleTxt");

// creating an array of intro messages
const introMsg = [
    "Hmmm… did you just click that?",
    "Oh… I think I'm receiving signals. Click again.",
    "Interesting… keep going.",
    "One more click should do it…",
    "Yaaaay! The counter works!"
];

// creating an object for interaction while clicking
const milestones = {
    10: "Nice. You're getting into this.",
    15: "Still clicking huh?",
    20: "🤨 I respect the dedication.",
    25: "You know this button doesn't do anything special… right?",
    30: "Something interesting might happen later…",
    40: "You're getting closer to something.",
    42: "The answer to life, the universe, and everything.",
    49: "Alright...one more click.",
    50: "😮 Okay… I'm impressed. 50 clicks!",
    60: "At this point you're committed.",
    69: "NICE!!!",
    75: "You must really like this button.",
    90: "Almost at 100… might be worth it.",
    100: "🏆 Achievement unlocked: 100 clicks!",
    125: "Wait… you're still going?",
    150: "Now this is just stubbornness.",
    175: "I'm starting to admire the persistence.",
    200: "👑 Okay you win. Official Button Champion.",
    222: "A strangely satisfying number.",
    333: "Triple threes. Nice.",
    404: "Error: Button addiction detected.",
    500: "Halfway to 1000… don't tell me you're trying that.",
    666: "This is the work of the DEVIL!!!",
    777: "🍀 Lucky number!",
    999: "BRO"
};

let count = 0;
let introStep = 0;

function endGame() {
    clickBtn.style.display = "none";
    resetBtn.style.display = "inline-block";

    titleTxt.style.display = "none";
    endMessage.textContent = "MASTER CLICKER";
    endMessage.style.display = "block";
    counterText.style.display = "none";
}

// initial text for the counter
counterText.textContent = "Click the button!";

// adding event listener for the click button
clickBtn.addEventListener('click', () => {

    // check until reach 1000 to end game
    if (count < 1000) {
        
        // intro phase
        if (introStep < introMsg.length) {
            counterText.textContent = introMsg[introStep];
            introStep++;

            if (introStep === introMsg.length) {
                count = 0;
            }

            return;
        }

        count++;

        // showing milestone messages
        if (milestones[count]) {

            counterText.textContent = `${count} - ${milestones[count]}`;

            counterText.classList.add("milestone");

            setTimeout(() => {
                counterText.classList.remove("milestone");
            }, 600);

            clickBtn.disabled = true;

            setTimeout(() => {
                clickBtn.disabled = false;
            }, 2500);
        } else {
            counterText.textContent = count;
        }
    }

    // end game
    if (count >= 1000) {
        endGame();
    }
});

// event listener for the reset button
resetBtn.addEventListener('click', () => {
    // reseting game values
    count = 0;
    introStep = 0;
    counterText.textContent = "Click the button!";
    resetBtn.style.display = "none";
    clickBtn.style.display = "inline-block";

    endMessage.style.display = "none";
    titleTxt.style.display = "block";
    counterText.style.display="block";
});