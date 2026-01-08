const CACHE_NAME = 'render-hub-v8';
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

// Install - cache assets
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate - clean old caches and take control immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch - Network First strategy for HTML/JS, Cache First for images
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // For HTML and JS files - Network First
    if (event.request.mode === 'navigate' || 
        url.pathname.endsWith('.html') || 
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css')) {
        
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone and cache the fresh response
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if offline
                    return caches.match(event.request);
                })
        );
    } else {
        // For images and other assets - Cache First
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    const responseClone = fetchResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return fetchResponse;
                });
            })
        );
    }
});

// Listen for skip waiting message from client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
