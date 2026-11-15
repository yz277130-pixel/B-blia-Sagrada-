/* Bíblia Ave-Maria — cache offline completo.
   A primeira abertura precisa de internet para baixar o conteúdo.
   Depois que a instalação do cache terminar, o leitor funciona offline. */
"use strict";
const CACHE_NAME = "ave-maria-offline-v1";
const CORE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./data/pages.json",
  "./data/images.json"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    const response = await cache.match("./data/images.json");
    const imageMap = await response.json();
    const imageFiles = Object.values(imageMap).map(path => "./" + path.replace(/^\\.\\//, ""));
    // Faz o cache de cada fac-símile local antes de concluir a instalação.
    for (let i = 0; i < imageFiles.length; i += 8) {
      await cache.addAll(imageFiles.slice(i, i + 8));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      if (request.mode === "navigate") {
        return (await caches.match("./index.html")) || Response.error();
      }
      return Response.error();
    }
  })());
});
