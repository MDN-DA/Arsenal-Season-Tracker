const APP_VERSION = '26.88.10';
const CACHE_NAME = `arsenal-tracker-v${APP_VERSION}`;
const urlsToCache = [
  '/Arsenal-Season-Tracker/',
  '/Arsenal-Season-Tracker/index.html',
  '/Arsenal-Season-Tracker/manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
