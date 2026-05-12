const CACHE_NAME = 'croquis-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './音声.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにあればそれを返す、なければネットワークから取得
        return response || fetch(event.request);
      })
  );
});