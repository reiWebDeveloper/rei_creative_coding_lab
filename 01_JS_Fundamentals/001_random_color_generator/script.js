// get the button and container element from the DOM
const changeColorBtn = document.getElementById("changeColorBtn");
const colorContainer = document.querySelector(".color-display");
const copyBtn = document.getElementById("copyBtn");
const copyColorText = "Copy Color";

// generating a new element to display the color code
const colorCodeText = document.createElement("p");
colorCodeText.classList.add("colorCode");
colorContainer.appendChild(colorCodeText);

copyBtn.textContent = copyColorText;

// function to generate a random color in rgb
function generateRandomRGBCode(){
    
    let randomRed = Math.floor(Math.random()*256);
    let randomGreen = Math.floor(Math.random()*256);
    let randomBlue = Math.floor(Math.random()*256);

    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

// initial text
colorCodeText.textContent = "RGB(Did you click the button!?)";

// adding event listener in the button to display the colors
changeColorBtn.addEventListener('click', ()=> {
    const randomColorGenerated = generateRandomRGBCode();
    colorCodeText.textContent = randomColorGenerated.toUpperCase();
    colorContainer.style.backgroundColor = randomColorGenerated;

    // show the button to copy color
    copyBtn.style.display = "inline-block";
});

// adding event listener for the copy button
copyBtn.addEventListener('click', async()=> {
    try {
        await navigator.clipboard.writeText(colorCodeText.textContent);
        copyBtn.textContent = "Copied!";
        setTimeout(()=> {
            copyBtn.textContent = copyColorText;
        }, 1500);
    } catch (error) {
        alert("Failed to copy color!");
    }
});