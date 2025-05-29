/**
 * @jest-environment jsdom
 */
import { DarkModeManager } from '../src/scripts/utilFunctions';

describe('DarkModeManager', () => {
  let sun: HTMLElement;
  let moon: HTMLElement;

  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = `
      <div class="sun" style="display: block;"></div>
      <div class="moon" style="display: none;"></div>
    `;
    sun = document.querySelector('.sun')!;
    moon = document.querySelector('.moon')!;

    // Clear localStorage
    localStorage.clear();
  });

  test('initializes with darkMode=false if nothing is in localStorage', () => {
    const manager = new DarkModeManager();
    expect(manager.getCurrentMode()).toBe(false);
    expect(document.body.classList.contains('darkmode')).toBe(false);
    expect(sun.style.display).toBe('none');
    expect(moon.style.display).toBe('block');
  });

  test('initializes with darkMode=true from localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    const manager = new DarkModeManager();
    expect(manager.getCurrentMode()).toBe(true);
    expect(document.body.classList.contains('darkmode')).toBe(true);
    expect(sun.style.display).toBe('block');
    expect(moon.style.display).toBe('none');
  });

  test('toggle() switches mode and updates localStorage', () => {
    const manager = new DarkModeManager();

    const modeAfterToggle = manager.toggle();
    expect(modeAfterToggle).toBe(true);
    expect(manager.getCurrentMode()).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.body.classList.contains('darkmode')).toBe(true);
    expect(sun.style.display).toBe('block');
    expect(moon.style.display).toBe('none');
  });

  test('setDarkMode(true) applies dark mode', () => {
    const manager = new DarkModeManager();
    manager.setDarkMode(true);

    expect(manager.getCurrentMode()).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.body.classList.contains('darkmode')).toBe(true);
  });

  test('setDarkMode(false) removes dark mode', () => {
    const manager = new DarkModeManager();
    manager.setDarkMode(false);

    expect(manager.getCurrentMode()).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
    expect(document.body.classList.contains('darkmode')).toBe(false);
  });
});
