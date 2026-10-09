// The site no longer uses a service worker. Browsers that installed an
// earlier version fetch this file on their next visit: it deletes the old
// caches, unregisters itself and reloads open tabs so they get the live site.
// Keep this file published for a while so returning visitors pick it up.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.map(name => caches.delete(name))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(client => client.navigate(client.url)))
  );
});
