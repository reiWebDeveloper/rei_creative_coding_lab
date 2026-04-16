const clickCard = document.querySelector(".clickCard");
const testDisplay = document.querySelectorAll(".reactionDataDisplay");
const avgDisplay = document.getElementById("averageReactionDataDisplay");

const blueColor = "#023859"; // default color
const redColor = "#aa1f1f"; // user should click when this color appears
const grayColor = "#8b8b8b"; // a time off color

const firstText = "Click HERE to play!";
const instructionText = "When this box turns red, click as fast as you can!";
const tooEarlyText = "Too early! Game over. Click to restart.";

let startTime = 0;
let currentTest = 0;
let results = [];

let gameState = "idle";

let reactionTimeout = null; // timer that makes the box go red
let maxReactionTimeout = null; // timer that ends the game if user is too slow

clickCard.textContent = firstText;
clickCard.style.backgroundColor = blueColor;


// This sets up one round - waits a random time, then goes red
function startRound() {
    clickCard.style.backgroundColor = blueColor;
    clickCard.textContent = "Get ready...";
    gameState = "waiting"; // user must not click now

    // Wait a random time between 1 and 6 seconds, then go red
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;

    reactionTimeout = setTimeout(function() {
        clickCard.style.backgroundColor = redColor;
        clickCard.textContent = "CLICK NOW!";
        startTime = Date.now(); // record when red appeared
        gameState = "ready"; // user should click now

        // if user does nothing for 5 seconds after red, end the game
        maxReactionTimeout = setTimeout(function() {
            endGame("Too slow! Click to restart.");
        }, 5000);

    }, randomDelay);
}


// Called when the game first starts (first click from idle)
function startGame() {
    clickCard.textContent = instructionText;
    clickCard.style.backgroundColor = blueColor;

    // Short pause so user can read the instruction, then start round 1
    setTimeout(function() {
        startRound();
    }, 2000);
}


// Called when user clicks at the right time (box is red)
function measureReaction() {
    clearTimeout(maxReactionTimeout); // cancel the "too slow" timer

    const reactionTime = Date.now() - startTime; // how long the user tooks in ms
    results.push(reactionTime);

    // Show this result in the correct display box
    testDisplay[currentTest].textContent = reactionTime + "ms";
    currentTest++;

    // CHANGED: after clicking red, go gray and show "Click Again"
    // We wait for the user to click again before starting the next round
    clickCard.style.backgroundColor = grayColor;
    clickCard.textContent = "Click Again!";
    gameState = "confirming"; // waiting for the "Click Again" click
}


// Called when user clicks while box is gray and says "Click Again"
function confirmAndContinue() {
    if (currentTest === 5) {
        // All 5 rounds done - calculate average and finish
        let total = 0;
        for (let i = 0; i < results.length; i++) {
            total += results[i];
        }
        const avg = (total / results.length).toFixed(2);
        avgDisplay.textContent = avg + "ms";

        endGame("Finished! Click to restart.");
    } else {
        // More rounds left - go back to blue and start next round
        startRound();
    }
}


// to handle ending the game (win or lose)
function endGame(message) {
    clearTimeout(reactionTimeout);     // cancel any pending red flash
    clearTimeout(maxReactionTimeout);  // cancel any pending too-slow timer
    clickCard.textContent = message;
    clickCard.style.backgroundColor = blueColor;
    gameState = "finish";
}


// Restart everything back to zero
function restart() {
    clearTimeout(reactionTimeout);
    clearTimeout(maxReactionTimeout);

    startTime = 0;
    currentTest = 0;
    results = [];

    testDisplay.forEach(function(t) { t.textContent = ""; });
    avgDisplay.textContent = "";

    gameState = "idle";
    clickCard.textContent = firstText;
    clickCard.style.backgroundColor = blueColor;
}

function handleClick() {
    if (gameState === "idle")        return startGame();
    if (gameState === "waiting")     return endGame(tooEarlyText);
    if (gameState === "ready")       return measureReaction();
    if (gameState === "confirming")  return confirmAndContinue(); 
    if (gameState === "finish")      return restart();
}

clickCard.addEventListener("click", handleClick);