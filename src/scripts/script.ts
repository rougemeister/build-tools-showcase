import '../styles.scss';


function toggleTheme () {
    const body = document.body;
    body.classList.add('dark-mode');
}

const themeToggleButton = document.querySelector('.theme-toggler');
console.log(themeToggleButton);

themeToggleButton?.addEventListener('click', toggleTheme);