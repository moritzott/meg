const cacheName = 'v1'; // version 1

// variable of assets:
const cacheAssets = [
    'index.html',
    './css/bootstrap/bootstrap.css',
    './css/master/style.css',
    './js/bootstrap/bootstrap.bundle.js',
    './js/app.js',
    'serviceworker.js',
    'manifest.json',
    './img/favicon.ico',
    './img/android-chrome-192x192.png',
    './img/android-chrome-192x192.png',
    './img/apple-touch-icon.png',
    './img/favicon-16x16.png',
    './img/favicon-32x32.png',
    './img/contactMail.png',
    'README.md'
];


// call the install event
// attach an event listener to the worker:
self.addEventListener('install', (event) => {
    console.log('ServiceWorker installed.');

    // cache the assets
    event.waitUntil(
        // use caches API
        caches
            .open(cacheName)
            .then(cache => {
                console.log('ServiceWorker: Caching Files..');
                cache.addAll(cacheAssets);
            })
            .then(() => {
                self.skipWaiting()
            })
    )
});

// let's call the activate event: here we want to clean our old cache!
self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activated.');
    // remove unwanted caches
    event.waitUntil(
        // loop thru the caches with condition if the current files are not like the files in te cache : delete
        // gives a promise:
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        console.log('ServieWorker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// show cached files when we are offline
// call fetch event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching.');
    // if the live site is available then load it, otherwise use the cache
    event.respondWith(// if it fails -> catch
        fetch(event.request).catch(() => caches.match(event.request)
        )
    )
});