/* Offline shell for the trip app.
   Same-origin files are cache-first, then refreshed in the background.
   Map tiles are not intercepted and are never prefetched.
   Tour audio (audio/tour/) is NOT precached and not handled here: the page fetches clips on demand
   and keeps them in its own "trip-audio-v1" cache (plus an optional per-tour "오프라인 저장" button),
   so that cache survives shell version bumps. */
const CACHE_VERSION = "trip-docs-v16";
const AUDIO_CACHE = "trip-audio-v1";
const SHELL = [
  "./",
  "./index.html",
  "./assets/css/app.css",
  "./assets/css/tour.css",
  "./assets/js/app.js",
  "./assets/js/tour.js",
  "./assets/js/relay.js",
  "./assets/favicon.svg",
  "./data/trip.js",
  "./data/transit.js",
  "./data/guide.js",
  "./data/story.js",
  "./data/relay.js",
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
    await Promise.all(keys.filter((key) => key !== CACHE_VERSION && key !== AUDIO_CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes("/audio/tour/")) return;
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
