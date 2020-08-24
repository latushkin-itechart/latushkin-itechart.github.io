window.navigator.serviceWorker.register('./sw.js',)
    .then((registration) => {
        console.log('Index: SW registered!', registration);

        return window.navigator.serviceWorker.ready.then((sw) => {
            console.log('Index: SW ready', sw)
        })
        // window.addEventListener('unload', () => {
        //     registration.unregister().then(() => {
        //         console.log('SW unregistered!')
        //     })
        // })
    })