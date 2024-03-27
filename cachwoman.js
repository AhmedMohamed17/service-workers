const cacheName = "v2";

// call install Events
self.addEventListener("install", (e) => {
  console.log("Service Worker : installed");
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // make copy/clone of response
        const resClone = res.clone();
        // open cahce
        caches.open(cacheName).then((cache) => {
          // add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
