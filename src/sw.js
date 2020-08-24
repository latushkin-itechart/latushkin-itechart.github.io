self.addEventListener('install', (event) => {
    console.log('SW: SW Installed!', event)
});

self.addEventListener('activate', (event) => {
    console.log('SW: SW Activated!', event);
})

self.addEventListener('fetch', (event) => {
    console.log('SW: Fetch caught!', event);
})