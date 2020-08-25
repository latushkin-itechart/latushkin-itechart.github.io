const currentPermission = Notification.permission;
if (currentPermission === 'default') {
    Notification.requestPermission().then((permission) => {
        Notification.permission = permission;
        proceedNotifications();
        console.log(permission);
    });
} else {
    proceedNotifications();
}

function proceedNotifications() {
    if (Notification.permission === 'granted') {
        const ntf = new Notification('Access granted!', {
            body: 'Lorem ipsum dolor sit amet consequetur',
            image: 'img/1.jpg'
        });

        console.log(ntf);
    }
}

const handle = () => {
    window.navigator.serviceWorker.register('./sw.js',)
        .then((registration) => {
            console.log('Index: SW registered!', registration);

            return window.navigator.serviceWorker.ready.then((swr) => {
                console.log('Index: SW ready', swr)

                return swr.pushManager.getSubscription().then(async (subscription) => {

                    if (subscription) {
                        return subscription;
                    }

                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: ('BOBsPAnnz3dlQfnMpnS0v7sqELuAlwNH5QSNcre1CwE2plkkCUTbh3uW7A5GRAM-tXq1T0w-uRh3EVcXB-ePdDs'),
                    })
                }).then((subscription) => {
                    console.log(subscription.toJSON());
                    fetch('/register-subscription', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(subscription.toJSON())
                    }).then(async (result) => {
                        console.log(await result.text())
                    })
                }).catch((e) => {
                    console.error(e);
                })
            })
        })
}

handle();