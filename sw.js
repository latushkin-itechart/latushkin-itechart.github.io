const CACHE_NAME = 'app-cache-v1';

async function getFromCache(request) {
    return await caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request)
            .then((match) => match || Promise.reject('No cached source for ' + request.url));
    })
}

async function getFromNetwork(request) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(reject, 3000);
        fetch(request).then((response) => {
            resolve(response);
            clearTimeout(timeout)
        })
    })
}

self.addEventListener('install', (event) => {
    console.log('SW: SW Installed!', event);

    const cachesTask = caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(['./', './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg'])
    }).then(() => self.skipWaiting());
    event.waitUntil(cachesTask);
});

self.addEventListener('activate', (event) => {
    console.log('SW: SW Activated!', event);
})

self.addEventListener('fetch', (event) => {
    console.log('SW: Loading ', event.request.url);

    const getResponse = async () => {
        try {
            console.log('Attempting to load from cache...')
            return await getFromCache(event.request)
        } catch (e) {
            console.log('Loading from network...')
        }
        return await getFromNetwork(event.request);

    }

    event.respondWith(getResponse());

    // getFromCache(event.request)
    // .catch(e => console.error('Failed to load from cache: ' + event.request.url)));
})

