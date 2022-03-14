//  import lib for service worker
importScripts("node_modules/localforage/dist/localforage.min.js");

const cacheVersion = "0";

const currentCaches = {
	css: "CSS-" + cacheVersion + ".2",
	imgs: "images-" + cacheVersion + ".1",
	perm: "perm-" + cacheVersion + ".1",
};

const cachesToDelete = ["CSS", "images", "CSS-0.1"];

const cacheFiles = {
	css: ["http://localhost:8080/css/style.css"],
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
	perm: [
		"https://fonts.googleapis.com/css?family=Roboto:400,500,700",
		"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
	],
};

//create a IndexDb with localforage
const dbName = "store";
const productStore = localforage.createInstance({
	name: dbName,
	storeName: "products",
});
const categorieStore = localforage.createInstance({
	name: dbName,
	storeName: "categories",
});
const characterStore = localforage.createInstance({
	name: dbName,
	storeName: "characters",
});

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
			caches.open(currentCaches.perm).then((cache) => {
				return cache.addAll(cacheFiles.perm);
			}),
			...cachesToDelete.map((cache) => {
				return caches.delete(cache);
			}),
		])
	);
});

self.addEventListener("fetch", (e) => {
	if (
		[...cacheFiles.css, ...cacheFiles.imgs, ...cacheFiles.perm].includes(
			e.request.url
		)
	) {
		e.respondWith(
			caches.match(e.request).then((res) => {
				if (res) {
					return res;
				} else {
					return fetch(e.request);
				}
			})
		);
	}

	if (e.request.url.includes("data/products.json")) {
		e.respondWith(
			(async function () {
				const response = await fetch(e.request);
				let data = await response.clone().json();

				if (data.products.length) {
					data.products.forEach((elem, key) => {
						productStore.setItem(String(key), elem);
					});
				}

				if (data.characters.length) {
					data.characters.forEach((elem, key) => {
						characterStore.setItem(String(key), elem);
					});
				}

				if (data.categories.length) {
					data.categories.forEach((elem, key) => {
						categorieStore.setItem(String(key), elem);
					});
				}

				return response;
			})()
		);
	}
});
