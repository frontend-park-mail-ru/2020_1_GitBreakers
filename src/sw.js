const CACHE_NAME = 'myCache';

const cacheUrls = [
  // '/profile/',
  'index.html',
  'main.css',
  'main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)// CACHE_NAME)
      .then((cache) =>
        cache.addAll(cacheUrls)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((resp) => {
        return resp || fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
      .catch(() => return caches.match)
  );
});
