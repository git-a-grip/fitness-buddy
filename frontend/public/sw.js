// Service Worker für Web-Push-Notifications
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', (event) => {
  let data = { title: 'Fitness Buddy', body: '' };
  try { if (event.data) data = event.data.json(); } catch {}
  const opts = {
    body: data.body || '',
    icon: '/icon.png',
    badge: '/icon.png',
    data: data.data || {},
    vibrate: [80, 40, 80],
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Fitness Buddy', opts));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      const url = new URL('/', self.location).href;
      const existing = clients.find(c => c.url.startsWith(url));
      if (existing) return existing.focus();
      return self.clients.openWindow('/');
    })
  );
});
