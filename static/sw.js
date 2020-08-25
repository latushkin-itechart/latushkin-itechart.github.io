self.addEventListener('push', (event) => {

    const ntfData = event.data.json().notification;
    console.log('SW: push!', event.data.json());
    const ntfPromise = self.registration.showNotification(ntfData.title, {body: ntfData.body});
    event.waitUntil(ntfPromise);
})

const CACHE = 'cache-v1';
const resourcesToCache = [
    './index.html',
    './src/index.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/icons/64.png'
]
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => {
                return cache.addAll(resourcesToCache)
            }).catch((e) => console.error(e)));
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response ? response : fetch(event.request);
            }).catch((e) => console.error(e)))
})