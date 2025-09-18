// src/assets/js/main.js
const theme = {
  init() {
    this.themeToggle = document.querySelector('[data-toggle="theme"]');
    this.htmlElement = document.documentElement;

    if (!this.themeToggle || !this.htmlElement) {
      console.error("Theme toggle or HTML element not found.");
      return;
    }

    this.applyTheme(localStorage.getItem('theme') || 'dark');
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  },

  applyTheme(newTheme) {
    this.htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
  },

  toggleTheme() {
    const currentTheme = this.htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }
};

const nav = {
  init() {
    this.navbarToggles = document.querySelectorAll('[data-toggle="navbar-menu"]');
    this.mobileMenu = document.getElementById('mobile-menu');

    if (!this.navbarToggles.length || !this.mobileMenu) {
      return;
    }

    this.navbarToggles.forEach(toggle => {
      toggle.addEventListener('click', () => this.toggleNav());
    });
  },

  toggleNav() {
    const isExpanded = this.mobileMenu.getAttribute('aria-hidden') === 'false';
    this.mobileMenu.setAttribute('aria-hidden', String(!isExpanded));
    
    const hamburgerIcon = document.querySelector('.p-banner [data-toggle="navbar-menu"]');
    if (hamburgerIcon) {
      hamburgerIcon.setAttribute('aria-expanded', String(!isExpanded));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  theme.init();
  nav.init();
});
