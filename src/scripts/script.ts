import '../styles.scss';
import { ThemeToggler } from './utilFunctions'; 

const themeTogglerBtn = document.querySelector('.theme-toggler') as HTMLButtonElement;
console.log(themeTogglerBtn)

  window.addEventListener('DOMContentLoaded', () => ThemeToggler.initTheme());
  console.log

  document.querySelector('.theme-toggler')?.addEventListener('click', () => {
    ThemeToggler.toggleTheme();
  });
  


