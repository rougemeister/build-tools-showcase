export class ThemeToggler {
    private static themeKey = 'preferred-theme';
  
    static initTheme(): void {
      const savedTheme = localStorage.getItem(this.themeKey);
      console.log(savedTheme)
  
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  
    static toggleTheme(): void {
      const isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
    }
  
    static setTheme(theme: string): void {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }
  
