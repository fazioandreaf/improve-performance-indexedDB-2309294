const currentCaches = {
	css: "CSS",
	imgs: "images",
};

const cacheFiles = {
	css: [
		"https://fonts.googleapis.com/css?family=Roboto:400,500,700",
		"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
		"http://localhost:8080/css/style.css",
	],
	imgs: [
		"http://localhost:8080/imgs/logo.svg",
		"http://localhost:8080/imgs/product-montage.png",
		"http://localhost:8080/imgs/rex-disc.png",
		"http://localhost:8080/imgs/dolores-disc.png",
		"http://localhost:8080/imgs/fred-disc.png",
		"http://localhost:8080/imgs/rivet-disc.png",
		"http://localhost:8080/imgs/eileen-disc.png",
		"http://localhost:8080/imgs/belle-disc.png",
		"http://localhost:8080/imgs/cosmo-disc.png",
		"http://localhost:8080/imgs/dolly-disc.png",
		"http://localhost:8080/imgs/sergeant-disc.png",
		"http://localhost:8080/imgs/oscar-disc.png",
		"http://localhost:8080/imgs/levi-disc.png",
		"http://localhost:8080/imgs/elton-disc.png",
		"http://localhost:8080/imgs/spring-disc.png",
		"http://localhost:8080/imgs/header.png",
	],
};

self.addEventListener("install", (event) => {
	//Tells the installation to wait until this particular piece of code is finished
	event.waitUntil(
		Promise.all([
			// open new cache
			caches.open(currentCaches.css).then((cache) => {
				// add more data at once
				return cache.addAll(cacheFiles.css);
			}),
			caches.open(currentCaches.imgs).then((cache) => {
				return cache.addAll(cacheFiles.imgs);
			}),
		])
	);
});

self.addEventListener("fetch", (e) => {
	if ([...cacheFiles.css, ...cacheFiles.imgs].includes(e.request.url)) {
		e.respondWith(
			caches.match(e.request).then((res) => {
				if (res) {
					console.log("returnin file from cache");
					return res;
				} else {
					return fetch(e.request);
				}
			})
		);
	}
});
