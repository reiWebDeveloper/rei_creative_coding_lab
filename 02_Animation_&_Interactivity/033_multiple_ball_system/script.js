const bodyContainer = document.querySelector('body');
const maxBalls = 10;
let ballArray = [];

function updateBall(ball) {

    if (ball.state === "falling") {
        ball.v += ball.gravity;
        ball.yPos += ball.v;

        if ((ball.yPos+ball.height) >= window.innerHeight) {
            ball.yPos = window.innerHeight-ball.height;
            ball.v = ball.bounce * ball.v;

            if (Math.abs(ball.v)<= 1) {
                ball.state = 'resting';
                ball.v = 0;
                setTimeout(()=> {
                    ball.el.remove();
                    ballArray.splice(ballArray.indexOf(ball), 1);
                },3000);
            }
        }
    }

    ball.el.style.transform = `translate(${ball.xPos}px, ${ball.yPos}px)`;
}

function loop() {
    for (const ball of ballArray) {
        updateBall(ball);
    }

    requestAnimationFrame(loop);
}

function createBallObj(ballObj) {
    const randomRgbColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    const width = Math.floor(Math.random()*50)+50;
    const bounce = -(0.5+Math.random()*(0.85-0.5))
    const gravity = 0.2 + Math.random() * (0.9-0.2);
    const color = randomRgbColor();
    let state = 'falling';

    ballObj.width = width;
    ballObj.height = width;
    ballObj.color = color;
    ballObj.bounce = bounce;
    ballObj.gravity = gravity;
    ballObj.state = state;
}

window.addEventListener('click', (e)=> {

    if (ballArray.length >= maxBalls) {
        return;
    }

    const ballObj = {
        width: 0,
        height: 0,
        xPos: 0,
        yPos: 0,
        gravity: 0,
        v: 0,
        bounce: 0,
        color: '',
        state: 'falling'
    };
    
    createBallObj(ballObj);

    ballObj.xPos = e.clientX -ballObj.width/2;
    ballObj.yPos = e.clientY - ballObj.height/2;

    const newBall = document.createElement('div');
    newBall.classList.add('ball');
    newBall.style.width = ballObj.width+"px";
    newBall.style.height = ballObj.height+"px";
    newBall.style.backgroundColor = ballObj.color;
    bodyContainer.appendChild(newBall);
    ballObj.el = newBall;

    ballArray.push(ballObj);

});

loop();