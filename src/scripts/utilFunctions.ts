export class DarkModeManager {
  private isDarkMode: boolean = false;
  private sunIcon: HTMLElement | null = null;
  private moonIcon: HTMLElement | null = null;
  
  constructor() {
    this.sunIcon = document.querySelector('.sun');
    this.moonIcon = document.querySelector('.moon');
    this.initializeFromStorage();
  }
  
  private initializeFromStorage(): void {
    const saved = localStorage.getItem('darkMode');
    this.isDarkMode = saved === 'true';
    this.applyMode();
  }
  
  private applyMode(): void {
    if (this.isDarkMode) {
      document.body.classList.add('darkmode');
      this.showMoonIcon();
    } else {
      document.body.classList.remove('darkmode');
      this.showSunIcon();
    }
  }
  
  private showSunIcon(): void {
    if (this.sunIcon) this.sunIcon.style.display = 'none';
    if (this.moonIcon) this.moonIcon.style.display = 'block';
  }
  
  private showMoonIcon(): void {
    if (this.sunIcon) this.sunIcon.style.display = 'block';
    if (this.moonIcon) this.moonIcon.style.display = 'none';
  }
  
  toggle(): boolean {
    this.isDarkMode = !this.isDarkMode;
    this.applyMode();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    return this.isDarkMode;
  }
  
  setDarkMode(enabled: boolean): void {
    this.isDarkMode = enabled;
    this.applyMode();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
  
  getCurrentMode(): boolean {
    return this.isDarkMode;
  }
}