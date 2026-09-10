const outerWrapper = document.getElementById('outer_wrapper');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const background = document.getElementById('background');
const text = document.getElementById('informationText');
const sunCorona = document.getElementById('coronaRing');

const size = outerWrapper.getBoundingClientRect();

const eclipseStagesTxt = {
    0: "First Contact — the Moon begins to slide across the Sun's disk, taking a small 'bite' out of its edge.",
    1: "Partial Eclipse — more of the Sun disappears behind the Moon. The sky starts to dim, and shadows sharpen.",
    2: "Second Contact — moments before totality. Watch for the 'diamond ring' effect as the last sliver of sunlight vanishes.",
    3: "Totality — the Moon fully covers the Sun. Only the corona is visible, and the sky goes dark like twilight.",
    4: "Third Contact — the Moon starts moving on, sunlight returns as a diamond ring flashes back into view.",
    5: "Fourth Contact — the eclipse fades back to an ordinary day as the Moon fully clears the Sun."
}

// initial text
text.textContent = "Scroll to learn more about the solar eclipe!";

// ease function
function ease(localValue) {
    if (localValue < 0.5) {
        return 2 * (localValue**2);
    } else {
        return 1 - 2 * (1 - localValue) ** 2;
    }
}

document.addEventListener('scroll', ()=> {
    let { scrollY } = window;
    let progress = scrollY/(size.height - window.innerHeight);

    // background opacity
    let opacityBefore = (progress - 0.3)/(0.5-0.3);
    let opacityAfter = (0.7 - progress)/(0.7-0.5);

    // corona opacity
    let coronaOpacBefore = (progress-0.45)/0.1;
    let coronaOpacAfter = (0.55-progress)/0.1;

    // text stage number
    let stageNumber;

    // opacity structure
    if (progress >= 0.3 && progress <= 0.7) {
        //update opacity here
        if (progress < 0.5) {
            // entering totality phase
            background.style.opacity = ease(opacityBefore);
        } else {
            // leaving totality phase
            background.style.opacity = ease(opacityAfter);
        }
    } else {
        // opacity is unchanged
        background.style.opacity = 0;
    }

    // corona structure
    if (progress >= 0.45 && progress <= 0.55) {
        //update opacity here
        if (progress < 0.5) {
            // entering totality phase
            sunCorona.style.opacity = ease(coronaOpacBefore);
        } else {
            // leaving totality phase
            sunCorona.style.opacity = ease(coronaOpacAfter);
        }
    } else {
        // opacity is unchanged
        sunCorona.style.opacity = 0;
    }

    // text structure
    if (progress < 0.2) {
        stageNumber = 0;
    } else if (progress < 0.3) {
        stageNumber = 1;
    } else if (progress < 0.498) {
        stageNumber = 2;
    } else if (progress < 0.505) {
        stageNumber = 3;
    } else if (progress < 0.68) {
        stageNumber = 4;
    } else {
        stageNumber = 5;
    }
    
    text.textContent = eclipseStagesTxt[stageNumber];

    //moon movement
    const moonProgress = ease(progress);
    let moonOffset = 200 - (moonProgress * 400);
    moon.style.left = `calc(50% + ${moonOffset}px)`;
    
    console.log(progress);
});