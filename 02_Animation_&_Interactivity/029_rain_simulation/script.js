const canvas = document.getElementById('rainCanvas');
const maxNumberOfDrops = 250;
const drops = [];
const ctx = canvas.getContext('2d');

// Make canvas fill the whole screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class RainDrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;  // Random X coordinate
    this.y = Math.random() * -canvas.height; // Start above the screen
    this.length = Math.floor(Math.random() * 20) + 10;   // Drop length (10px to 30px)
    this.speed = Math.random() * 10 + 10;   // Speed (10px to 20px per frame)
    this.opacity = Math.random() * 0.3 + 0.2; // Varied opacities for depth
    this.weight = Math.random() * 0.5 + 0.2; // Slight gravity effect
  }

  update() {
    this.speed += this.weight; // Accelerate downward
    this.y += this.speed;

    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle =  `rgba(174, 194, 224, ${this.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length); // Draw vertical line
    ctx.stroke();
  }
}

// Initialize rain drops
function init() {
  for (let i = 0; i <= maxNumberOfDrops; i++) {
    drops.push(new RainDrop());
  }
}

function animate() {
  ctx.fillStyle = 'rgba(11, 16, 22, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (drops.length === 0) {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('errorMsg');
    errorMsg.textContent = "Rain simulation unable to start! Reload your page.";
    drops.push(new RainDrop());
  }

  for(let i = 0; i < drops.length; i++) {
    drops[i].update();
    drops[i].draw();
  }

  requestAnimationFrame(animate);
}

init();
animate();