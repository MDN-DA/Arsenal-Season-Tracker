// service-worker.js

const CACHE_NAME = 'arsenal-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Mise en cache des fichiers…');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Suppression ancien cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
