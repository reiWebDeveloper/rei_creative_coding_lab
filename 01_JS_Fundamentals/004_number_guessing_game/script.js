const boxes = document.querySelectorAll(".boxElement");
const userLifeLeftTxt = document.getElementById("userLifeLeftText");
const generateBtn = document.getElementById("generateBtn");
const resultMessage = document.getElementById("resultMessage");
const firstText = document.getElementById("firstText");

// state
let gameActive = true;
let userLives = 5;
let correctIndex;

// reset game
function resetGame() {
    correctIndex = Math.floor(Math.random() * boxes.length);
    gameActive = true;
    userLives = 5;
    userLifeLeftTxt.textContent = userLives;
    resultMessage.classList.remove("win", "lose", "show");
    resultMessage.textContent = "";
    firstText.style.display = "";

    // clear correct highlight from previous round
    boxes.forEach(box => box.classList.remove("correct"));
}

// generate numbers
function generateNumbers() {
    const usedNumbers = [];

    boxes.forEach((boxEl) => {
        let randomNumber;

        do {
            randomNumber = Math.floor(Math.random() * 100) + 1;
        } while (usedNumbers.includes(randomNumber));

        usedNumbers.push(randomNumber);

        let numberEl = boxEl.querySelector(".randomNumber");
        numberEl.textContent = randomNumber;
        numberEl.style.display = "none";
    });
}

// reveal all (used on game end)
function revealAllNumbers() {
    boxes.forEach((box, i) => {
        let num = box.querySelector(".randomNumber");
        num.style.display = "block";
        // highlight the correct box so the player can see which one it was
        if (i === correctIndex) {
            box.classList.add("correct");
        }
    });
}

// click logic
boxes.forEach((boxElement, index) => {
    boxElement.addEventListener('click', () => {

        if (!gameActive) return;

        let numberElement = boxElement.querySelector(".randomNumber");

        // prevent double click
        if (numberElement.style.display === "block") return;

        // hide the hint text on first click
        firstText.style.display = "none";

        numberElement.style.display = "block";

        // win
        if (index === correctIndex) {
            gameActive = false;
            resultMessage.textContent = "You WON 🎉";
            resultMessage.classList.remove("lose");
            resultMessage.classList.add("win", "show");
            revealAllNumbers();
        } else {
            userLives--;
            userLifeLeftTxt.textContent = userLives;

            // lose
            if (userLives === 0) {
                gameActive = false;
                resultMessage.textContent = "You LOST 💀";
                resultMessage.classList.remove("win");
                resultMessage.classList.add("lose", "show");
                revealAllNumbers();
            }
        }
    });
});

// generate button
generateBtn.addEventListener("click", () => {
    resetGame();
    generateNumbers();
});

// initial start
resetGame();
generateNumbers();