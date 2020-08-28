const logMessage = (...args) => {
    if ('ReactNativeWebView' in window) {
        window.ReactNativeWebView.postMessage(JSON.stringify([...args]));
    } else {
        console.log(...args);
    }
}
logMessage({n: 1});
try {
// Allowing to display notifications
    if (window.Notification) {
        const currentPermission = Notification.permission;
        if (currentPermission === 'default') {
            Notification.requestPermission().then((permission) => {
                Notification.permission = permission;
            });
        }
    }

    const handle = () => {

        // Registering service worker
        window.navigator.serviceWorker.register('./sw.js', {scope: './'})
            .then((registration) => {
                logMessage('Index: SW registered!', registration);

                // When worker is registered, registering push manager
                return window.navigator.serviceWorker.ready.then((swr) => {
                    logMessage('Index: SW ready', swr)

                    window.navigator.serviceWorker.onmessage = (event) => {
                        alert(event);
                        logMessage(event);
                    }

                    // Receiving subscription
                    return swr.pushManager.getSubscription().then(async (subscription) => {

                        if (subscription) {
                            // If subscription already exists, no need to send redundant request to save subscription
                            return subscription;
                        }

                        return registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: ('BOBsPAnnz3dlQfnMpnS0v7sqELuAlwNH5QSNcre1CwE2plkkCUTbh3uW7A5GRAM-tXq1T0w-uRh3EVcXB-ePdDs'),
                        }).then((subscription) => {
                            fetch('/register-subscription', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(subscription.toJSON())
                            }).then(async (result) => {
                                logMessage(await result.text())
                            })
                        })
                    })
                })
            })
            .catch((e) => {
                logMessage(e.message);
            })
    }

    handle();

    window.addEventListener('beforeinstallprompt', (event) => {
        logMessage('beforeinstallprompt');
        event.preventDefault();

        const installBtn = document.getElementById('install-app');
        installBtn.addEventListener('click', () => {
            event.prompt();
            event.userChoice.then((result) => {
                logMessage({result});
            })
        })

    })

} catch (e) {
    logMessage(Object.keys(e));
}