const container = document.getElementById("cardContainer");
const levelOptionsEl = document.getElementById("levelOptions");

let randomNums = [];
let copyOfRandomNums = [];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let matchedPairs = 0;

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // swap arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function randomNumbers(number) {

    const uniqueNums = new Set();

    while (uniqueNums.size < number / 2) {
        uniqueNums.add(Math.floor(Math.random() * 100) + 1);
    }

    randomNums = Array.from(uniqueNums);

    copyOfRandomNums = [...randomNums, ...randomNums];

    shuffleArray(copyOfRandomNums);
}

function renderCard() {
    container.innerHTML = ""; //clear previos cards

    copyOfRandomNums.forEach((num, index) => {
        const card = `
            <div class="cardHolder">
                <div class="card-inner" data-index="${index}" data-value="${num}">
                    <div class="front">
                        <span>?</span>
                    </div>
                    <div class="back">
                        <span class="randomNumber">${num}</span>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", card);
    });
}

function startNewGame(count = copyOfRandomNums.length) {
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    randomNumbers(count);
    renderCard();
}

// initial call
startNewGame(12); 

// select options change event
levelOptionsEl.addEventListener("change", (e)=> {
    if (e.target.value === "easy") {
        startNewGame(12);
    } else if (e.target.value === "med") {
        startNewGame(16);
    } else {
        startNewGame(20);
    }
});

function rotateCard(clickedCard) {
    if (!clickedCard.classList.contains("is-flipped")) {
        clickedCard.classList.add("is-flipped");
    }
}

container.addEventListener('click', (e) => {
    const clickedCard = e.target.closest(".card-inner");
    if (!clickedCard) return;
    if (clickedCard.classList.contains("matched")) return;

    if (lockBoard) return; // prevent spam clicking

    rotateCard(clickedCard);

    if (firstCard === clickedCard) return;

    // first click
    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    // second click
    secondCard = clickedCard;

    const isMatch =
    firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        if (matchedPairs === copyOfRandomNums.length / 2) {
            console.log("ALL MATCHED");

            setTimeout(() => {
                startNewGame();
            }, 1500);
        }

        firstCard = null;
        secondCard = null;

        return;

    } else {
        lockBoard = true;

        setTimeout(()=> {
            firstCard.classList.remove("is-flipped");
            secondCard.classList.remove("is-flipped");

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
});