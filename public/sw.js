const CACHE_NAME = 'render-hub-v3';
const BASE_URL = '/rendergroup/';
const ASSETS = [
    BASE_URL,
    BASE_URL + 'index.html',
    BASE_URL + 'manifest.json',
    BASE_URL + 'vite.svg',
    BASE_URL + 'khaled.jpg',
    BASE_URL + 'render_work_1_1767876099095.png',
    BASE_URL + 'render_work_2_1767876400226.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
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
