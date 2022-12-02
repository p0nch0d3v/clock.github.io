var cacheName = 'clock';
var filesToCache = [
  '/',
  './index.html',
  './css/digital-7.ttf',
  './css/index.css',
  './js/lib/jquery-3.6.0.min.js',
  './js/lib/moment.min.js',
  './js/index.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});