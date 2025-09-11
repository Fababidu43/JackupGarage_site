import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Précharger Google Maps de manière asynchrone
const loadGoogleMaps = () => {
  if (!window.google) {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdX0Eh2utXFDBq0CWq3SEO_14ol6v4L-4&libraries=places,geometry';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};

// Charger Google Maps après le premier rendu
setTimeout(loadGoogleMaps, 1000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
