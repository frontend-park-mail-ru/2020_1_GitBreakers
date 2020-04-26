/* eslint-disable no-restricted-globals */
const { assets } = global.serviceWorkerOption;
const CACHE_NAME = 'myCache';
// const TIMEOUT = 400;

const cacheUrls = [
  ...assets,
  '/404',
];

// const getFromNetwork = (request, timeout) => new Promise((resolve, reject) => {
//   const timeoutId = setTimeout(reject, timeout);
//   return fetch(request).then(async (res) => {
//     clearTimeout(timeoutId);
//     const cache = await caches.open(CACHE_NAME);
//     cache.put(request, res.clone());
//     resolve(res);
//   }, reject);
// });

// const getFromCache = (request) => caches.open(CACHE_NAME)
//   .then((cache) => cache.match(request)
//     .then((matching) => {
//       if (matching) {
//         return matching;
//       }
//       throw new Error('no-match');
//     }));


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(cacheUrls)),
  );
});

self.addEventListener('fetch', (event) => {

  // if (event.request.method === 'GET') {
  //   event.respondWith(getFromNetwork(event.request, TIMEOUT)
  //     .catch((err) => {
  //       console.log('SW error:', err.message);
  //       getFromCache(event.request).catch(() => {
  //         caches.match('/404');
  //       });
  //     }));
  // }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse && !navigator.onLine) {
          if (event.request.method === 'GET') {
            return cachedResponse;
          }
          // return document.querySelector('.popup').classList.push('')
        }

        return fetch(event.request)
          .then((response) => caches.open(CACHE_NAME).then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, response.clone());
            }
            return response;
          }));
      }),
    // .catch(() => caches.match('./static/notFound.html')),
  );
});
