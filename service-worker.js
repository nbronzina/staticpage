const CACHE_NAME = 'nicolasbronzina-v7';
const PRECACHE = [
  '/',
  '/styles.css',
  '/script.js',
  '/img/hi-sm.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

// Drop caches from previous versions and take control of open tabs
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

function cacheCopy(request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
  }
  return response;
}

// Pages, CSS and JS: network first, so a deploy shows up on the next visit;
// the cache is only the offline fallback.
// Images, fonts and PDFs: cache first, filled as they are requested.
// Cross-origin requests (Google Fonts, Internet Archive audio, CDN) go straight to the network.
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  const isPage = request.mode === 'navigate';
  if (isPage || request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      fetch(request)
        .then(response => cacheCopy(request, response))
        .catch(() => caches.match(request)
          .then(cached => cached || (isPage && caches.match('/')) || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => cacheCopy(request, response)))
  );
});
