self.addEventListener('push', function (event) {
    if (event.data) {
        const payload = event.data.json();
        const options = {
            body: payload.body,
            icon: '/icon-192.png', // Ensure this exists in public
            badge: '/icon-192.png',
            data: { url: payload.url || '/' },
            vibrate: [100, 50, 100],
        };

        event.waitUntil(
            self.registration.showNotification(payload.title || 'Check Me Today', options)
        );
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});
