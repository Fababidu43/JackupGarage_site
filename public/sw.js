// Service Worker pour mise en cache des ressources
const CACHE_NAME = 'jackup-auto-v1';
const STATIC_CACHE = [
  '/',
  '/logo.png',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  // Cache first pour les ressources statiques
  if (event.request.destination === 'image' || 
      event.request.destination === 'font' ||
      event.request.destination === 'style') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
  
  // Network first pour les pages
  else if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/'))
    );
  }
});