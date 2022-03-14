async function fetchData(url) {
	const response = await fetch(url);
	let data = await response.json();
	return data;
}

// async function fetchData(url) {
// 	const response = await fetch(url);
// 	let data = { product: [], categories: [], characters: [] };

// 	await productStore.iterate((value) => {
// 		data.products.push(value);
// 	});
// 	await characterStore.iterate((value) => {
// 		data.characters.push(value);
// 	});
// 	await categorieStore.iterate((value) => {
// 		data.categories.push(value);
// 	});

// 	if (
// 		data.products.length &&
// 		data.characters.length &&
// 		data.categories.length
// 	) {
// 		return data;
// 	}

// 	data = await response.json();

// 	return data;
// }

// // network first
// async function APIFetchData(url) {
// 	let data;
// 	const response = await fetch(url);

// 	if (response.ok) {
// 		data = await response.json();
// 		sessionStorage.setItem(url, JSON.stringify(data));
// 	} else {
// 		data = JSON.parse(sessionStorage.getItem(url));
// 	}

// 	return data;
// }

// //local first
// async function localFetchData(url) {
// 	let data = JSON.parse(sessionStorage.getItem(url));

// 	if (data === null) {
// 		const response = await fetch(url);
// 		data = await response.json();
// 		sessionStorage.setItem(url, JSON.stringify(data));
// 	}

// 	return data;
// }
