// Allowing to display notifications
const currentPermission = Notification.permission;
if (currentPermission === 'default') {
    Notification.requestPermission().then((permission) => {
        Notification.permission = permission;
    });
}

const handle = () => {

    // Registering service worker
    window.navigator.serviceWorker.register('./sw.js',)
        .then((registration) => {
            console.log('Index: SW registered!', registration);

            // When worker is registered, registering push manager
            return window.navigator.serviceWorker.ready.then((swr) => {
                console.log('Index: SW ready', swr)

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
                            console.log(await result.text())
                        })
                    })
                }).catch((e) => {
                    console.error(e);
                })
            })
        })
}

handle();