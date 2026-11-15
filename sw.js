
const CACHE = 'film-lab-a6db68cd2697a2e2';
const SHELL = ["/film-lab-app/index.html","/film-lab-app/assets/index-CKstFTws.js","/film-lab-app/assets/index-BB4BvRED.css","/film-lab-app/assets/smart-worker-Du6GCeZs.js","/film-lab-app/fonts/Caveat-OFL.txt","/film-lab-app/fonts/Caveat-Variable.ttf","/film-lab-app/fonts/Fraunces-Italic-Variable.ttf","/film-lab-app/fonts/Fraunces-OFL.txt","/film-lab-app/fonts/Fraunces-Variable.ttf","/film-lab-app/fonts/Inter-Italic-Variable.ttf","/film-lab-app/fonts/Inter-LICENSE.txt","/film-lab-app/fonts/Inter-Variable.ttf","/film-lab-app/icons/apple-touch-icon.png","/film-lab-app/icons/icon-192.png","/film-lab-app/icons/icon-512.png","/film-lab-app/icons/icon.svg","/film-lab-app/manifest.webmanifest"];
const INDEX = '/film-lab-app/index.html';
const ALLOWED = new Set(SHELL.map(path => new URL(path, self.location.origin).href));
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  await cache.addAll(SHELL);
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith('film-lab-') && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate' && url.pathname.startsWith('/film-lab-app/')) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(INDEX)).then(hit => hit || fetch(event.request)));
  } else if (ALLOWED.has(url.href)) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(url.href, { ignoreVary: true })).then(hit => hit || fetch(event.request)));
  }
});