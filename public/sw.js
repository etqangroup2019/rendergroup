const CACHE_NAME = 'render-hub-v7';
const BASE_URL = '/rendergroup/';
const ASSETS = [
    BASE_URL,
    BASE_URL + 'index.html',
    BASE_URL + 'manifest.json',
    BASE_URL + 'app_icon.png',
    BASE_URL + 'khaled.jpg',
    BASE_URL + 'alaa_avatar.jpg',
    BASE_URL + 'render_work_1_1767876099095.png',
    BASE_URL + 'render_work_2_1767876400226.png'
];

self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Delete old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
