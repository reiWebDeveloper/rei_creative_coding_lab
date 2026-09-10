const displayKey = document.getElementById("text-box-key");
const displayKeyCode = document.getElementById("text-box-key-code");

// keyboard listeners
window.addEventListener('keydown', (event)=> {

    // If the key is already being held down
    if (event.repeat) return;

    if (event.code === 'Tab') event.preventDefault();
    if (event.code === 'AltLeft' || 'AltRight') event.preventDefault();

    console.log(`Key pressed: ${event.key}`);
    displayKey.textContent = event.key === ' ' ? 'Space' : event.key;

    console.log(`Key code: ${event.code}`);
    displayKeyCode.textContent = event.code;

    const pressedCode = event.code;
    const visualKey = document.querySelector(`[data-key="${pressedCode}"]`);

    if (visualKey) {
    visualKey.classList.add('active');
  }
});

// after the user lift the finger (the key is not tapped anymore)
window.addEventListener('keyup', (event)=> {

    const pressedCode = event.code;
    const visualKey = document.querySelector(`[data-key="${pressedCode}"]`);

    if(visualKey) {
        visualKey.classList.remove('active');
    }
});

// clear all active keys when the window loses focus
window.addEventListener('blur', () => {
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    displayKey.textContent = '-';
    displayKeyCode.textContent = '-';
});