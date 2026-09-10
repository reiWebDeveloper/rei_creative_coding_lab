const dateFormatParagraph = document.getElementById('date_format');
const spinner = document.getElementById('loading_spinner_holder');
const mainSection = document.querySelector('main');
const headerSection = document.querySelector('header');
const footerSection = document.querySelector('footer');

const sessionState = sessionStorage.getItem("loading");

if (sessionState !== null) {
    onLoad();
} else {
    sessionStorage.setItem("loading", "true");

    // delay the loading by 3s
    setTimeout(()=> {
        onLoad();
    },3000);
}

function onLoad() {
    
    // make visibility for the spinner hidden
    spinner.style.visibility = "hidden";
    spinner.style.opacity = 0;

    // display the page
    headerSection.style.visibility = "visible";
    headerSection.style.opacity = 1;

    mainSection.style.visibility = "visible";
    mainSection.style.opacity = 1;

    footerSection.style.visibility = "visible";
    footerSection.style.opacity = 1;
}

// set the date
const today = new Date();
const dateString = today.toLocaleDateString();
dateFormatParagraph.textContent = dateString;