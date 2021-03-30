const staticDevCoffee = "dev-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
];

console.log('here')
self.addEventListener("install", installEvent => {
  console.log('service worker installed ');
  self.skipWaiting();
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      console.log('service worker frefatching file');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  console.log('url fetch ', fetchEvent.request.url);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      console.log('response ', res)
      if (res) {
        console.log('Found cache resource');
        return res
      } else {
        console.log('Fetch again');
        return fetch(fetchEvent.request);
      }
      // return res || fetch(fetchEvent.request);
    })
  );
});
