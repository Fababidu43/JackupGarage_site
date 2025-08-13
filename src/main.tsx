import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Système d'animation au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

// Observer les éléments après le rendu
setTimeout(() => {
  const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  scrollElements.forEach(el => observer.observe(el));
}, 100);

// Parallax subtil pour les éléments flottants
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-slow');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
  });
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
