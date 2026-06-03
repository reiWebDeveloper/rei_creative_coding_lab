const draggables = document.querySelectorAll('[draggable="true"]');
const dropZones = document.querySelectorAll('.right-side-shape-container');
const matchedCount = document.getElementById('matched');
const reorderBtn = document.getElementById('btn');
const allMatchedMsg = document.getElementById('allMatchedMsg');

let matched = 0;
let draggedShape = null;

function createGhost(shapeType) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '80');
    svg.setAttribute('height', '80');
    svg.setAttribute('viewBox', '0 0 80 80');
    svg.style.position = 'absolute';
    svg.style.top = '-9999px';
    svg.style.opacity = '0.85';

    let el;
    if (shapeType === 'circle') {
        el = document.createElementNS(svgNS, 'circle');
        el.setAttribute('cx', '40');
        el.setAttribute('cy', '40');
        el.setAttribute('r', '35');
        el.setAttribute('fill', 'blue');
    } else if (shapeType === 'square') {
        el = document.createElementNS(svgNS, 'rect');
        el.setAttribute('x', '5');
        el.setAttribute('y', '5');
        el.setAttribute('width', '70');
        el.setAttribute('height', '70');
        el.setAttribute('fill', 'blue');
    } else if (shapeType === 'triangle') {
        el = document.createElementNS(svgNS, 'polygon');
        el.setAttribute('points', '40,5 75,75 5,75');
        el.setAttribute('fill', 'blue');
    } else if (shapeType === 'rhombus') {
        el = document.createElementNS(svgNS, 'polygon');
        el.setAttribute('points', '40,5 75,40 40,75 5,40');
        el.setAttribute('fill', 'blue');
    }

    svg.appendChild(el);
    return svg;
}

draggables.forEach(shape => {
    shape.addEventListener('dragstart', (e) => {
        draggedShape = shape;
        const shapeType = shape.id.replace('filled-', '').replace('-shape', '');
        const ghost = createGhost(shapeType);
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 40, 40);
        setTimeout(() => document.body.removeChild(ghost), 0);
        shape.style.opacity = '0.3';
    });

    shape.addEventListener('dragend', () => {
        if (draggedShape) shape.style.opacity = '1';
        draggedShape = null;
    });
});

dropZones.forEach(zone => {
    zone.style.position = 'relative'; // need for checkmark centering

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (zone.dataset.matched) return; // skip already matched zones

        // compare types to know correct vs wrong
        const draggedType = draggedShape.id.replace('filled-', '').replace('-shape', '');
        const zoneType = zone.querySelector('.outline, svg').id.replace('outlined-', '').replace('-shape', '');
        zone.style.backgroundColor = draggedType === zoneType ? '#c8e6c9' : '#ef9a9a';
    });

    zone.addEventListener('dragleave', () => {
        if (zone.dataset.matched) return; // don't wipe matched background
        zone.style.backgroundColor = '';
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (zone.dataset.matched) return; // can't drop on already matched zone
        zone.style.backgroundColor = '';

        const draggedType = draggedShape.id.replace('filled-', '').replace('-shape', '');
        const zoneType = zone.querySelector('.outline, svg').id.replace('outlined-', '').replace('-shape', '');

        if (draggedType === zoneType) {
            draggedShape.closest('.left-side-shape-container').style.visibility = 'hidden';
            draggedShape.setAttribute('draggable', 'false');
            draggedShape = null;

            zone.dataset.matched = 'true'; // flag this zone as done
            zone.style.backgroundColor = '#a5d6a7';

            // add checkmark in the center
            const check = document.createElement('span');
            check.textContent = '✓';
            check.className = 'checkmark';
            check.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 36px;
                font-weight: bold;
                color: #2e7d32;
                pointer-events: none;
            `;
            zone.appendChild(check);

            matched++;
            matchedCount.textContent = matched;

            if (matched === 4) {
                setTimeout(() => allMatchedMsg.textContent = '🎉 All shapes matched!', 200);
            }
        } else {
            zone.style.backgroundColor = '#ef9a9a';
            setTimeout(() => zone.style.backgroundColor = '', 600);
        }
    });
});

reorderBtn.addEventListener('click', () => {
    allMatchedMsg.textContent = "";
    matched = 0;
    matchedCount.textContent = '0';

    draggables.forEach(shape => {
        shape.setAttribute('draggable', 'true');
        shape.style.opacity = '1';
        shape.style.cursor = 'grab';
        shape.closest('.left-side-shape-container').style.visibility = 'visible';
    });

    dropZones.forEach(zone => {
        zone.style.backgroundColor = '';
        delete zone.dataset.matched; // clear the matched flag on reset
        const check = zone.querySelector('.checkmark');
        if (check) check.remove(); // remove checkmark on reset
    });

    const rightContainer = document.querySelector('.right-side-container');
    const zones = [...rightContainer.children];
    for (let i = zones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        rightContainer.appendChild(zones[j]);
        zones.splice(j, 1);
    }
});