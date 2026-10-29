const CACHE = 'dayflow-v18', DATA = 'df-data';
const SHELL = ['./', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'tailwind.css', 'fonts.css', 'supabase.js'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE && x !== DATA).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
const timeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.hostname.endsWith('supabase.co')) return;
  if (u.origin === self.location.origin) {
    // app files: network first (so updates arrive), fall back to the cache when offline or slow
    e.respondWith(timeout(fetch(r), 3500).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('./') : undefined))));
  } else {
    // CDN scripts and fonts: cache first, refresh in the background
    e.respondWith(caches.match(r).then(m => { const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; }).catch(() => m); return m || net; }));
  }
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cl => { for (const c of cl) { if ('focus' in c) return c.focus(); } return self.clients.openWindow(url); }));
});
// best-effort background check (installed PWA on Android, interval chosen by the browser)
async function checkReminders() {
  const c = await caches.open(DATA);
  const rr = await c.match('reminders.json'); if (!rr) return;
  const list = await rr.json();
  const fr = await c.match('fired.json'); let f = fr ? await fr.json() : {};
  const now = new Date(), d = now.toDateString(), mins = now.getHours() * 60 + now.getMinutes();
  if (f.d !== d) f = { d, k: {} };
  for (const r of list) {
    const m = r.h * 60 + r.m;
    if (m <= mins && mins - m <= 90 && !f.k[r.key]) { f.k[r.key] = 1; await self.registration.showNotification(r.title, { body: r.body, icon: 'icon-192.png', badge: 'icon-192.png', tag: r.key, dir: 'rtl', lang: 'fa', data: { url: './' } }); }
  }
  await c.put('fired.json', new Response(JSON.stringify(f)));
}
self.addEventListener('periodicsync', e => { if (e.tag === 'df-reminders') e.waitUntil(checkReminders()); });
self.addEventListener('message', e => { if (e.data === 'df-check') e.waitUntil(checkReminders()); });
