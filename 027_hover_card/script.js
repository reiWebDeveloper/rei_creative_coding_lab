const cards = document.querySelectorAll(".card");

let targetAngle = 20;

// precise formula of linear interpolation
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

cards.forEach((card) => {

    // initial value
    card.dataset.rotateX = 0;
    card.dataset.rotateY = 0;

    card.addEventListener('mousemove', (event)=> {
        //find the center of each card
        const rect = card.getBoundingClientRect();

        //calculate the center
        const centerCardX = rect.left + (rect.width/2);
        const centerCardY = rect.top + (rect.height/2);

        // mouse position
        const x = event.clientX;
        const y = event.clientY;

        // offset form middle (creating the angle)
        const offsetX = ((centerCardX-x)/(rect.width/2))*targetAngle;
        const offsetY = ((centerCardY-y)/(rect.height/2))*targetAngle;

       card.dataset.rotateX = offsetX;
       card.dataset.rotateY = -1*offsetY;
    });

    
    card.addEventListener('mouseleave', ()=> {
        // remove rotation
        card.dataset.rotateX = 0;
        card.dataset.rotateY = 0;
    });

});

function animate() {

    cards.forEach((card)=> {
        let currentX = parseFloat(card.style.getPropertyValue('--rotateY').slice(0, -1));
        let currentY = parseFloat(card.style.getPropertyValue('--rotateX').slice(0, -1));
        if (isNaN(currentX)) currentX = 0;
        if (isNaN(currentY)) currentY = 0;
        const x = lerp(currentX, card.dataset.rotateX, 0.05);
        const y = lerp(currentY, card.dataset.rotateY, 0.05);
        card.style.setProperty("--rotateY", x + "deg");
        card.style.setProperty("--rotateX", y + "deg");
    });

    requestAnimationFrame(animate);

}

animate();