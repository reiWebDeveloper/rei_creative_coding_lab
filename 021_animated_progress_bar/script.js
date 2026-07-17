const dateFormatParagraph = document.getElementById('date_format');
const progressTrack = document.getElementById("progress_track");
const progessBar = document.getElementById('pgBar');
const mainSection = document.querySelector('main');
const headerSection = document.querySelector('header');
const footerSection = document.querySelector('footer');
let width = 0;

// read state for loading
const sessionState = sessionStorage.getItem('loading');

if (sessionState !== null) {
    onLoad();
} else {
    // write the state for loading
    sessionStorage.setItem('loading', 'true');

    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            onLoad();
        } else {
            width++;
            progessBar.style.width = width + "%";
        }
    }, 50);
}

// set the date
const today = new Date();
const dateString = today.toLocaleDateString();
dateFormatParagraph.textContent = dateString;

function onLoad() {
    // hide the progress track
    setTimeout(()=> {
        progressTrack.style.visibility = "hidden";
    }, 300)
    
    progressTrack.style.opacity = 0;

    // display the page
    headerSection.style.visibility = "visible";
    headerSection.style.opacity = 1;

    mainSection.style.visibility = "visible";
    mainSection.style.opacity = 1;

    footerSection.style.visibility = "visible";
    footerSection.style.opacity = 1;
}