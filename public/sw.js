// Service Worker pour optimiser les performances
const CACHE_NAME = 'jackup-auto-v1';
const STATIC_ASSETS = [
  '/',
  '/logo.png',
  '/assets/index.css',
  '/assets/index.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  // Cache-first pour les assets statiques
  if (event.request.url.includes('/assets/') || 
      event.request.url.includes('/logo.png') ||
      event.request.url.includes('.jpg') ||
      event.request.url.includes('.png')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
  // Network-first pour les pages
  else {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});