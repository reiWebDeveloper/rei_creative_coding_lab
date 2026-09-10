const themes = ['neon-purple', 'sunset-orange', 'ocean-blue'];
const default_theme = 'neon-purple';
const storage_key = 'selectedTheme';

const lavaLamp = document.querySelector(".bubble_layer");
const audioBtn = document.getElementById('sound_toggle');
const audio = document.getElementById("ambient_audio");

function applyTheme(theme) {
    themes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(theme);
    localStorage.setItem(storage_key, theme);
}

// On page load: use saved theme, or default to neon purple
function initTheme() {
    const saved = localStorage.getItem(storage_key);
    const theme = themes.includes(saved) ? saved : default_theme;
    applyTheme(theme);
}

// Create bubbles
function createBubbles() {
    // Create element
    const bubble = document.createElement("div");
    bubble.classList.add("floating-bubble");

    // Randomize the size of the bubbles min 25px to 60px
    const size = Math.floor(Math.random()*25+35);
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Randomize horizontal position
    bubble.style.left = `${Math.random() * 80 + 10}%`;
  
    // Randomize animation speed (e.g., between 12s and 22s)
    bubble.style.animationDuration = `${Math.random() * 12 + 10}s`;

    // add element
    lavaLamp.appendChild(bubble);
}

// create 15 bubbles
for (let i = 0; i<15; i++) {
    createBubbles();
}

initTheme();

// Connect switcher buttons
document.querySelectorAll('.switcher_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('neonPurple')) applyTheme('neon-purple');
        else if (btn.classList.contains('sunsetOrange')) applyTheme('sunset-orange');
        else if (btn.classList.contains('oceanBlue')) applyTheme('ocean-blue');
    });
});

// audio play
//<i class="fa-solid fa-pause"></i>
audioBtn.addEventListener("click", ()=> {
    if (audio.paused) {
        audio.play();
        audioBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audio.pause();
        audioBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
})