const cacheName = "v2";

const cacheAssets = ["index.html", "style.css", "index.js"];

// call install Events
self.addEventListener("install", (e) => {
  console.log("Service Worker : installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("service worker : caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// call Activate Event
self.addEventListener("activate", (e) => {
  console.log("service Worker: Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            console.log("Service Worker : Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call Fetch Events
self.addEventListener("fetch", (e) => {
  console.log("service worker : fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
