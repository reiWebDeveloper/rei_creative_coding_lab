const btn = document.querySelector(".explosion");
const bodyContainer = document.querySelector("body");

// initialize empty array of particles
const particles = [];

// animation increment variable
let amount = 0;

// precise formula of linear interpolation
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

// function to generate a random color in rgb
function generateRandomRGBCode(){
    
    let randomRed = Math.floor(Math.random()*256);
    let randomGreen = Math.floor(Math.random()*256);
    let randomBlue = Math.floor(Math.random()*256);

    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

/**
    * Handles the creation of particle object,
    * Randomize size, color and how many will be created
    * in one click
*/
function createParticle() {

    // randomization of how many particles will be in one explosion (no less than 15)
    let randomNumberOfParticles = Math.floor(Math.random()*20)+15;

    const btnRect = btn.getBoundingClientRect();

    // find the center (which is used for the start point of all particles)
    const centerX = btnRect.left + (btnRect.width/2);
    const centerY = btnRect.top + (btnRect.height/2);

    for (let i = 0; i <= randomNumberOfParticles; i++) {
        
        // randomization of angle degrees in radian
        const randomDegree = Math.floor(Math.random() * 360);
        // Convert the integer degree into radians
        const randomAngleRadians = randomDegree * (Math.PI / 180);
        // randomization of the distance that a particle takes (start from 50)
        const randomDistance = Math.floor(Math.random()*200)+50;

        // initialize empty object
        let newParticle = {
            id: 0,
            width: 0,
            height: 0,
            color: "",
            startY: 0,
            startX: 0,
            endX: 0,
            endY: 0,
            element: null
        }

        /**
         * particle size;
         * randomization of the size of one particle (no less than 5);
         */
        let randomSize = Math.floor(Math.random()*10)+5;
        const particleWidth = randomSize + 'px';
        const particleHeight = particleWidth;
        const finalWidth = particleWidth;
        const finalHeight = particleHeight;

        let particleEndX = centerX + randomDistance*Math.cos(randomAngleRadians);
        let particleEndY = centerY + randomDistance*Math.sin(randomAngleRadians);

        const randomColor = generateRandomRGBCode();

        // assing the values to the object
        newParticle.id = i+1;
        newParticle.width = finalWidth;
        newParticle.height = finalHeight;
        newParticle.color = randomColor;
        newParticle.startX = centerX;
        newParticle.startY = centerY;
        newParticle.endX = particleEndX;
        newParticle.endY = particleEndY;
       
        // create the particle element
        const particle = document.createElement("div");
        particle.classList.add('particle');

        newParticle.element = particle;

        // fill the array
        particles.push(newParticle);
        
    }  
}

/**
 * Handles the creation of particle element
 * Applies style to a particle
 */
function renderParticle() {

    reset();
    createParticle();

    particles.forEach((p)=> {

        const particle = p.element;

        // get the data from the object
        const pWidth = p.width;
        const pHeight = p.height;
        const pColor = p.color;

        // apply style to the element
        particle.style.width = pWidth;
        particle.style.height = pHeight;
        particle.style.backgroundColor = pColor;
        particle.style.top = p.startY+"px";
        particle.style.left = p.startX+"px";

        bodyContainer.appendChild(particle);

    });
}

function animateMovement() {
    
    let inc = amount += 1/80;
    particles.forEach((p)=> {
        const x = lerp(p.startX, p.endX, inc);
        const y = lerp(p.startY, p.endY, inc);

        p.element.style.left = x+"px";
        p.element.style.top = y+"px";

        let opacityProgress = 0;

        if (inc < 0.8) {
            opacityProgress = 1;
            p.element.style.opacity = opacityProgress;
        } else {
            opacityProgress = (inc-0.8)/0.2; // in the last 20% of the path the opacity will start
            p.element.style.opacity = 1 - opacityProgress; // fade out (opacity goes from 1 to 0)
        }
    });

    // animate
    if (amount <= 1) {
        requestAnimationFrame(animateMovement);
    } else {
        // repeat
        amount = 0;
    }
    
}

// every new click creates a new explosion
function reset() {
    
    // reset the array
    particles.length = 0;

    const particlesNode = document.querySelectorAll(".particle");
    
    particlesNode.forEach((p)=> {
        bodyContainer.removeChild(p);
    });
}

// fires the particles functions
btn.addEventListener('click', ()=> {
    renderParticle();
    animateMovement();
    console.log(particles);
});