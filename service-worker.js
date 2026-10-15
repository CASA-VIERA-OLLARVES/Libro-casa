// Service worker de "Casa Viera Ollarves".
// Guarda una copia de la cáscara de la app (HTML, manifest, íconos) para que abra
// rápido e instale como app. Firebase, Google Fonts y las librerías externas
// (html2canvas, jsPDF) NUNCA pasan por acá: siempre van directo a internet.
//
// Si alguna vez hacés un cambio grande y querés forzar que todos bajen la
// versión nueva, cambiá el número de CACHE_NAME (ej: 'cvo-shell-v3').
const CACHE_NAME = 'cvo-shell-v2';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Se guarda archivo por archivo: si falta un ícono, no se cae todo el service worker.
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Firebase/CDN: sin intervenir

  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/index.html');
  if (isPage) {
    // Página principal: primero internet (para traer siempre la versión más nueva),
    // y si no hay conexión, se muestra la última copia guardada.
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Archivos propios (manifest, íconos): lo guardado primero, actualizando en segundo plano.
  event.respondWith(
    caches.match(req).then(cached => {
      const fresh = fetch(req)
        .then(res => {
          if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
