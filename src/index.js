window.navigator.serviceWorker.register('./src/sw.js').then((registration) => {
    console.log('Index: SW registered!', registration);

    window.addEventListener('_unload', () => {
        registration.unregister().then(() => {
            console.log('SW unregistered!')
        })
    })
})