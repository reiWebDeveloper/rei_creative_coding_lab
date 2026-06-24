const themeBtns = document.querySelectorAll('.switcher-btn');

themeBtns.forEach( btn => {
    btn.addEventListener('click', ()=> changeTheme(btn));
});

const currentTheme = localStorage.getItem('theme') || 'light-theme';
document.body.classList.add(currentTheme);

function changeTheme(el) {

    //remove the current theme
    document.body.classList.remove(localStorage.getItem('theme') || 'light-theme');

    let newTheme;

    //assign the theme
    newTheme = el.classList[1];
    
    //add the theme
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

}