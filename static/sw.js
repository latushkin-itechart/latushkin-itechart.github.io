self.addEventListener('push', (event) => {

    const ntfData = event.data.json().notification;
    console.log('SW: push!', event.data.json());
    const ntfPromise = self.registration.showNotification(ntfData.title, {body: ntfData.body});
    event.waitUntil(ntfPromise);
})
