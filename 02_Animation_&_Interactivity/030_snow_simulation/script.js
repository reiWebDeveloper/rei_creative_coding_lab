const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const maxSnowFlakes = 300;
const snowFlakes = [];

// Make canvas fill the whole screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function reset(newSnowFlake) {

    const randomXPos = Math.random() * canvas.width;
    const randomYPos = Math.random() * -canvas.height;
    const randomSpeed = Math.random()*2+2;
    const randomSize = Math.random()*3+2;
    const randomDrift = Math.random();

    newSnowFlake.x = randomXPos;
    newSnowFlake.y = randomYPos;
    newSnowFlake.speed = randomSpeed;
    newSnowFlake.width = randomSize;
    newSnowFlake.height = newSnowFlake.width;
    newSnowFlake.drift = randomDrift;
}

function draw(snowFlake) {
    ctx.beginPath();
    ctx.arc(snowFlake.x, snowFlake.y, snowFlake.width, 0, 2*Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
}

function update(snowFlake) {
    snowFlake.y += snowFlake.speed;
    snowFlake.x += snowFlake.drift;

    if (snowFlake.y > canvas.height) {
        reset(snowFlake);
    }

}

function init() {

    for (let i = 0; i <= maxSnowFlakes; i++) {
        let newSnowFlake = {
            x: 0,
            y: 0,
            speed: 0,
            width: 0,
            height: 0
        }

        snowFlakes.push(newSnowFlake);
        reset(newSnowFlake);
    }
}

function animate() {

    ctx.fillStyle = 'rgba(11, 16, 22)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (snowFlakes.length === 0) {
        const errorMsg = document.createElement('p');
        errorMsg.classList.add('errorMsg');
        errorMsg.textContent = "Snow simulation unable to start! Reload your page.";
    }

    snowFlakes.forEach((flake)=> {
        draw(flake);
        update(flake);
    });

    requestAnimationFrame(animate);
}

init();
animate();