const rollDiceBtn = document.getElementById("rollDiceBtn");
const dieElement = document.getElementById("dieFaceId");
const rollHistory = document.getElementById("rollHistory");
const clearBtn = document.getElementById("clearBtn");

function generateRandomDieFace(number) {
    switch (number) {
      case 1:
        return "&#9856;";
      case 2:
        return "&#9857;";
      case 3:
        return "&#9858;";
      case 4:
        return "&#9859;";
      case 5:
        return "&#9860;";
      case 6:
        return "&#9861;";
      default:
        return "";
    }
}

function getRandomDieFace() {
    const randomNumber = Math.floor(Math.random()*6)+1;
    dieElement.innerHTML = generateRandomDieFace(randomNumber);
}

rollDiceBtn.addEventListener('click', ()=> {

    rollDiceBtn.disabled = true;

    // show clear button
    clearBtn.style.visibility = "visible";

    // trigger animation
    dieElement.classList.remove("rolling");
    void dieElement.offsetWidth;
    dieElement.classList.add("rolling");

    // wait for animation to finish, then update the UI
    setTimeout(() => {
        getRandomDieFace();

        const newRollNumber = document.getElementById("rollHistory").children.length + 1;
        const newItem = document.createElement("li");
        newItem.classList.add("historyItem");
        newItem.innerHTML = `Roll Die ${newRollNumber}: <span class="dieFaceUniCode">${dieElement.innerHTML}</span>`;
        document.getElementById("rollHistory").appendChild(newItem);

        rollDiceBtn.disabled = false;
    }, 500);
});

clearBtn.addEventListener('click', ()=> {
    clearBtn.style.visibility = "hidden";
    rollHistory.innerHTML = "";
});