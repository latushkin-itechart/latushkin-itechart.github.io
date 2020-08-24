window.navigator.serviceWorker.register('./src/sw.js').then((registration) => {
    console.log('SW registered!', registration);
})