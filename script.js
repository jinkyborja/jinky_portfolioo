// Theme toggle (light/dark), persisted for the session
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconEl = themeToggle.querySelector('.theme-toggle__icon');
const textEl = themeToggle.querySelector('.theme-toggle__text');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  iconEl.textContent = isDark ? '☀' : '☾';
  textEl.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

const messageFab = document.getElementById('messageFab');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
const lightboxClose = lightbox.querySelector('.lightbox__close');
const galleryButtons = document.querySelectorAll('.gallery__item--button');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox.classList.remove('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openLightbox(button.dataset.src, button.dataset.alt);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox__backdrop')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
    closeLightbox();
  }
});

// Floating action button opens WhatsApp in a new tab
messageFab.addEventListener('click', (e) => {
  e.preventDefault();
  window.open('https://wa.me/639855162530', '_blank', 'noopener,noreferrer');
});
