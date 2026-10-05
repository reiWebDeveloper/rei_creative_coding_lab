const selectedColor = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const lineWidth = document.getElementById('lineWidth');
const brushModeBtn = document.getElementById('brushModeBtn');
const eraserModeBtn = document.getElementById('eraserModeBtn');

// canvas
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

// state tracking variables
let isEraserMode = false;
let lastX = 0;
let lastY = 0;

brushModeBtn.addEventListener('click', () => {
  isEraserMode = false;
  
  brushModeBtn.classList.add('active');
  eraserModeBtn.classList.remove('active');
});

eraserModeBtn.addEventListener('click', () => {
  isEraserMode = true;
  
  eraserModeBtn.classList.add('active');
  brushModeBtn.classList.remove('active');
});

function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - document.querySelector('.toolbar').offsetHeight;

    // makeing the brush trail feels fluid not blocky
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

window.addEventListener('load', resize);
window.addEventListener('resize', resize);

function draw(e) {
    if (e.buttons & 1) { // stop the function if the mouse isn't clicked

      if (isEraserMode) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = lineWidth.value * 4; // makes eraser four times thicker
      } else {
          ctx.strokeStyle = selectedColor.value; // uses the selected color
          ctx.lineWidth = lineWidth.value;
      }

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }

    // update position coordinates for the next iteration
    [lastX, lastY] = [e.offsetX, e.offsetY];

    //document.getElementById('debug').textContent = 'buttons: ' + e.buttons;
    //console.log(e.buttons);
}

canvas.addEventListener('pointermove', draw);

// pressing outside canvas and dragging in
canvas.addEventListener('pointerenter', (e)=> {
  [lastX, lastY] = [e.offsetX, e.offsetY];
  //canvas.setPointerCapture(e.pointerId);
});

clearBtn.addEventListener('click', () => {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});