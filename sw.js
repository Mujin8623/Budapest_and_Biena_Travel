/* Offline shell for the trip app.
   Same-origin files are cache-first, then refreshed in the background.
   Map tiles are not intercepted and are never prefetched. */
const CACHE_VERSION = "trip-docs-v1";
const SHELL = [
  "./",
  "./index.html",
  "./assets/css/app.css",
  "./assets/js/app.js",
  "./assets/favicon.svg",
  "./data/trip.js",
  "./data/transit.js",
  "./data/vault.js",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/leaflet.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(cacheFirst(event, request));
});

function cacheFirst(event, request) {
  const network = fetch(request).then((response) => {
    if (response && response.ok && response.type === "basic") {
      const copy = response.clone();
      caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
    }
    return response;
  }).catch(() => null);
  event.waitUntil(network.then(() => {}));
  return caches.open(CACHE_VERSION).then(async (cache) => {
    const cached = await cache.match(request);
    if (cached) return cached;
    const fresh = await network;
    if (fresh) return fresh;
    if (request.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
    }
    return Response.error();
  });
}
