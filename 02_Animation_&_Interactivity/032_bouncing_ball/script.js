const ball = document.getElementById('ball');
const rect = ball.getBoundingClientRect();
const ballHeight = rect.height;
const ballWidth = rect.width;
// variables
let state = "aiming";
const gravity = 0.5;
const bounce = -0.8;
let x = 0;
let y = 0;
let v = 0;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;

window.addEventListener('pointermove', (e)=> {
  pointerX = e.clientX;
  pointerY = e.clientY;
});

window.addEventListener('click', ()=> {
 if (state !== 'aiming') return;
  state = 'falling';
});

function loop() {

  // falling mode
  if (state === 'falling') {
    // gravity changes the speed
    v += gravity;
    // speed changes the position
    y += v;

    if ((y+ballHeight) >= window.innerHeight) {
      // put y exactly on the floor 
      y = window.innerHeight - ballHeight;
      // flip and shrink vy 
      v = bounce * v;

      if (Math.abs(v)<= 1) {
        state = 'resting';
        v = 0;
        setTimeout(()=> {
          state = "aiming";
        },1500);
      }
    }
  }

  // aiming mode
  if (state === "aiming") {
    targetX = pointerX - ballWidth/2;
    targetY = pointerY - ballHeight/2;
    x += (targetX - x)*0.2;
    y += (targetY - y)*0.2;
  }

  ball.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(loop);
}

loop();