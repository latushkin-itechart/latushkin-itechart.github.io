self.addEventListener('install', (event) => {
    console.log('SW Installed!', event)
});

self.addEventListener('activate', (event) => {
    console.log('SW Activated!', event);
})