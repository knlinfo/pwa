const CACHE_NAME = "v1_cache_panel_adm",
  urlsToCache = [
    "https://script.google.com/a/macros/knlinfo.com/s/AKfycbxAmc1nsUjLYdbkyOBNgW9anAa-6Bl82EOOyxYgS5ytgQ4ZWtZKZnv6W7JN2JJxqNPo/exec?page=whatsapp",
    "./manifest.json",
  ];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => "cache registration failed", err)
  );
});

self.addEventListener("activate", (e) => {
  const caheWitheList = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then((cachesNames) =>
      cachesNames.map((cacheName) => {
        if (cacheName.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
