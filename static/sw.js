// ==========================================================================
// SERVICE WORKER FOR PERFORMANCE OPTIMIZATION
// Advanced caching strategies and offline functionality
// ==========================================================================

const CACHE_NAME = 'portfolio-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';
const IMAGE_CACHE = 'images-v1.2';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/static/critical.css',
    '/static/styles.css',
    '/static/script.js',
    '/static/image-optimizer.js',
    '/static/assets/favicon.svg',
    '/static/assets/apple-touch-icon.png'
];

// Assets to cache on first request
const DYNAMIC_ASSETS = [
    '/static/assets/',
    '/api/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('Service Worker: Error caching static assets', err);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGE_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests with appropriate strategies
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    } else if (isImage(url)) {
        event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    } else if (isDynamicContent(url)) {
        event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    } else {
        event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
    }
});

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request, cacheName) {
    try {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Return cached version immediately
            return cachedResponse;
        }
        
        // Fetch from network and cache
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            await cache.put(request, responseClone);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache-first strategy failed:', error);
        return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network-first strategy (for dynamic content)
async function networkFirstStrategy(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            const responseClone = networkResponse.clone();
            await cache.put(request, responseClone);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Content not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Stale-while-revalidate strategy (for balanced performance)
async function staleWhileRevalidateStrategy(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Fetch from network in background
    const networkResponsePromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                const responseClone = networkResponse.clone();
                cache.put(request, responseClone);
            }
            return networkResponse;
        })
        .catch(error => {
            console.log('Network request failed:', error);
            return null;
        });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Otherwise wait for network
    return networkResponsePromise || new Response('Content not available', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

// Helper functions to categorize requests
function isStaticAsset(url) {
    return url.pathname.includes('/static/') && 
           (url.pathname.endsWith('.css') || 
            url.pathname.endsWith('.js') || 
            url.pathname.endsWith('.svg') || 
            url.pathname.endsWith('.ico'));
}

function isImage(url) {
    return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

function isDynamicContent(url) {
    return url.pathname.includes('/api/') || 
           url.pathname.includes('/admin/') ||
           url.search.length > 0;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('Service Worker: Background sync triggered');
    // Handle offline form submissions, etc.
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/static/assets/favicon.svg',
            badge: '/static/assets/apple-touch-icon.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'View Portfolio',
                    icon: '/static/assets/favicon.svg'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/static/assets/favicon.svg'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Performance monitoring
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
});

async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

console.log('Service Worker: Loaded and ready! 🚀');