async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();

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

	return data;
}

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
