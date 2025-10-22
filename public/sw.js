importScripts("/version.js");

const APP_VERSION = self.APP_VERSION || "dev";
const CACHE_VERSION = "v1.1";
const CACHE_NAME = `VESSEL_TRACKA_${APP_VERSION}_${CACHE_VERSION}`;
const BACKEND_URL = "https://www.omdbapi.com";

// OFFLINE SUPPORT
async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll([
    // "/",
    "/offline",
    "/vesseltracka_icon.png",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

// CACHING STRATEGY
// async function dynamicCaching(request) {
//   // console.log("Dynamic cache triggered", request);
//   try {
//     const response = await fetch(request);
//     const cache = await caches.open(CACHE_NAME);
//     cache.put(request, response.clone());
//     return response;
//   } catch {
//     return caches.match(request);
//   }
// }

async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    await cache.put(request, responseClone);
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    return caches.match("/offline");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === BACKEND_URL) {
    // USES THE INDEXED DB; NOT YET IMPLEMENTED THO
    event.respondWith(networkFirstStrategy(request));
  } else if (event.request.mode === "navigate") {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // event.respondWith(dynamicCaching(request));
    event.respondWith(fetch(request));
  }
});

// self.addEventListener("fetch", (event) => {
//   const { request } = event;
//   const url = new URL(request.url);
//   console.log(url)
//   console.log(request.mode)

//   if (request.mode === "navigate") {
//     // For navigation (HTML pages)
//     event.respondWith(cacheFirstStrategy(request));
//   } else if (url.pathname.startsWith("/api/")) {
//     // Only cache API responses dynamically
//     event.respondWith(networkFirstStrategy(request));
//   } else {
//     // Let other requests just go to network (don’t cache)
//     return;
//   }
// });

// // Fetch event listener for all pages/resources
// self.addEventListener("fetch", (event) => {
//   // console.log("Fetch event for ", event.request);
// event.respondWith(fetch(event.request));
// });

// NEXT JS PUSH NOTIFICATIONS
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.");
  event.notification.close();
  event.waitUntil(clients.openWindow("/")); // Opens root of current domain, you can also send the user to a specific URL just pass the data via the event
});

// INDEXED DB (FOR FUTURE USE)
