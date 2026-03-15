const btn = document.getElementById("generateBtn");
const slots = document.querySelectorAll(".slot"); // select all slot divs

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
}

btn.addEventListener("click", () => {
    btn.disabled = true;

    // create an array to store intervals for each slot
    const intervals = [];

    slots.forEach((slot, index) => {
        // start interval for each slot
        const intervalId = setInterval(() => {
            slot.textContent = generateRandomNumber();
        }, 50); // all spin at same speed (50ms)
        
        intervals.push(intervalId);

        // set a different stop time for each slot
        setTimeout(() => {
            clearInterval(intervalId);
            // if it's the last slot, re-enable the button
            if(index === slots.length - 1) {
                btn.disabled = false;
            }
        }, 1000 + index * 600); // each stops 600ms after previous
    });
});