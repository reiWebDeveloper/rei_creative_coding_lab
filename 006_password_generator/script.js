// elements
const btn = document.getElementById("generatePassBtn");
const copyBtn = document.getElementById("copyBtn");
const passwordDisplay = document.getElementById("passwordDisplay");
const copyIcon = document.querySelector(".fa-copy");

// generate password function logic
function generatePassword() {
    let charPool = "";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = lowerCaseChars.toUpperCase();
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*";

    charPool += lowerCaseChars;
    charPool += upperCaseChars;
    charPool += numberChars;
    charPool += symbolChars

    let password = "";

    const passDefaultLength = 12;

    for (let i = 0; i < passDefaultLength; i++) {
        const randomIndex = Math.floor(Math.random()*charPool.length);
        password += charPool[randomIndex];
    }

    return password;
}

btn.addEventListener('click', ()=> {
    const password = generatePassword();
    passwordDisplay.textContent = password;
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(passwordDisplay.textContent);

        copyIcon.classList.remove("fa-copy");
        copyIcon.classList.add("fa-check");
        copyIcon.classList.add("copy-success");

        setTimeout(() => {
            copyIcon.classList.remove("fa-check");
            copyIcon.classList.remove("copy-success");
            copyIcon.classList.add("fa-copy");
        }, 1200);

    } catch (error) {
        alert("Failed to copy!");
        console.log(error);
    }
});