const CACHE_NAME = 'ttha-pwa-v11';
const ASSETS = [
  './ttha_hostel_report_pwa_v11.html',
  './manifest_v11.json',
  './sw_v11.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => { cache.put(e.request, fetchRes.clone()); return fetchRes; });
      });
    }).catch(()=>{
      if(e.request.mode === 'navigate') return caches.match('./ttha_hostel_report_pwa_v11.html');
    })
  );
});