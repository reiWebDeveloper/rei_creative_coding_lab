const btn = document.getElementById("magnet");

//center
let x = 0, y = 0;

// target position
let moveX = 0;
let moveY = 0;

// current position
let posX = 0;
let posY = 0;

// velocity
let velX = 0;
let velY = 0;

// loop check
let isAnimating = false;

function springMotion() {

    // distance
    let displacementY = 0;
    let displacementX = 0;

    // horizontal frame
    displacementX = posX - moveX;
    let forceX = -0.1*displacementX - 0.2*velX;
    
    velX += forceX;
    posX += velX;

    // vertical frame
    displacementY = posY - moveY;
    let forceY = -0.1*displacementY -0.2*velY

    velY += forceY;
    posY += velY;

    btn.style.transform = `translate(${posX}px, ${posY}px)`;

    // glow scales with current speed
    const speed = Math.sqrt(velX * velX + velY * velY);
    const glowSize = 20 + speed * 15;
    const glowOpacity = Math.min(0.25 + speed * 0.05, 0.7);
    btn.style.boxShadow = `0 0 ${glowSize}px ${glowSize / 4}px rgba(255, 51, 102, ${glowOpacity})`;


    //check the pos and vel for 0 to set the center again
    if (Math.abs(posX) < 0.5 && Math.abs(velX) < 0.5
        && Math.abs(posY) < 0.5 && Math.abs(velY) < 0.5) {
        // stop the animation, which means set all to 0
        moveX = 0;
        moveY = 0;
        posX = 0;
        posY = 0;
        velX = 0;
        velY = 0;
        isAnimating = false;
    } else {
        requestAnimationFrame(springMotion);
    }

}

function updateCenter() {
    const btnSize = btn.getBoundingClientRect();
    x = btnSize.left + btnSize.width/2;
    y = btnSize.top + btnSize.height/2;
}

window.addEventListener('resize', updateCenter);

updateCenter();


btn.addEventListener('mousemove', (e) => {

    moveX = (e.clientX - x) * 0.7;
    moveY = (e.clientY - y) * 0.7;

    if (!isAnimating) {
        isAnimating = true;
        springMotion();
    }
});

btn.addEventListener('mouseleave', ()=> {
   moveX = 0;
   moveY = 0;
});

springMotion();