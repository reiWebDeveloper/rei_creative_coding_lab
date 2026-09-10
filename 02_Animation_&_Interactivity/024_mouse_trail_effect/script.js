const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let circles = [];

function canvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', canvasSize);
canvasSize();

canvas.addEventListener('mousemove', (e)=> {
    circles.push({
        x: e.clientX,
        y: e.clientY,
        color: `hsl(${Math.random()*360}, 80%, 60%)`,
        radius: Math.random()*8+2,
        fade: 1
    });
});

function animate() {

    context.clearRect(0,0, canvas.width, canvas.height);

    circles.forEach((c,i)=> {
        context.beginPath();
        context.arc(c.x, c.y, c.radius, 0, Math.PI*2);
        context.fillStyle = c.color;
        context.globalAlpha = c.fade;
        context.fill();
        context.closePath();

        c.fade -= 0.02; // fade out over time
    });


    circles = circles.filter(c => c.fade > 0);

    requestAnimationFrame(animate);
}

animate();