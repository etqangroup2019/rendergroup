const CACHE_NAME = 'render-hub-v2';
const ASSETS = [
    './',
    'index.html',
    'manifest.json',
    'vite.svg',
    'khaled.jpg',
    'render_work_1_1767876099095.png',
    'render_work_2_1767876400226.png'
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
