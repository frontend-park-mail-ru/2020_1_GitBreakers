/* eslint-disable no-restricted-globals */
const { assets } = global.serviceWorkerOption;
const CACHE_NAME = 'myCache';
// const TIMEOUT = 400;

const cacheUrls = [
  ...assets,
  '/404',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(cacheUrls)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse && !navigator.onLine) {
          if (event.request.method === 'GET') {
            return cachedResponse;
          }
        }

        return fetch(event.request)
          .then((response) => caches.open(CACHE_NAME).then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, response.clone());
            }
            return response;
          }));
      }),
  );
});
