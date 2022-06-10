var CACHE_NAME = 'pwa-cache-v1';
	var urlsToCache = [
		'/',
		'/sw.js',
		'/logo.png',
		'/manifest.json',
		'/sitemap.xml',

		];
	const self = this;
	
	// Install SW
	self.addEventListener('install', (event) =>{
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then((cache) => {
					console.log('Opend Cache.');
					
					return cache.addAll(urlsToCache);
				})
			);
	});
	// Listen For requests
	self.addEventListener('fetch', (event) =>{
		event.respondWith(
			caches.match(event.request)
				.then(() => {
					return fetch(event.request)
						.catch(() => caches.match('/offline'))
				})
		);
	});
	// Activate
	self.addEventListener('activate', (event) =>{
		const cacheWhitelist = [];
		cacheWhitelist.push(CACHE_NAME);
	 	event.waitUntil(
			caches.keys().then((cacheNames) => Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
						}
					})
					))
			);
	});