// const image = document.getElementById("image");
// const header = document.getElementById("header");
// const synopsis = document.getElementById("synopsis");
const container = document.querySelector(".page-container");

// バカやろ
const getManga = async () => {
	// Subject to other type
	const url = "https://kitsu.io/api/edge";
	//For this type
	const type = "/manga";
	// Form declaration
	const forms = document.getElementById("manga-form").elements;
	const submitButton = forms["submit"];
	const typeQuery = forms["search-param"].value;
	const wordQuery = forms["input"].value;
	// Combined endpoint
	const endpoint = `${url}${type}?filter%5B${typeQuery}%5D=${wordQuery}`;
	console.log(endpoint);
	// Fetch
	let response = await fetch(endpoint, {
		Accept: "application/vnd.api+json",
		"Content-Type": "application/vnd.api+json",
	});
	try {
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		alert(error);
	}
};

const createDocument = async () => {
	// Obj
	const objArr = await getManga();
	// Iterate
	objArr.data.forEach((arr, index) => {
		// Declare
		const populateImage = arr.attributes.posterImage.small;
		const populateTitle = arr.attributes.titles.en;
		const populateSyn = arr.attributes.synopsis;
		// Template
		const newImage = `<img class="image" src=${populateImage}>`;
		const newTitle = `<h1 class="header">${populateTitle}</h1>`;
		const newSyn = `<p class="synopsis">${populateSyn}</p>`;
		const newTemplate = `
			<div class="manga-cards" id="manga-card-${index}">
			${newImage}
				<div class="detail">
					${newTitle}
					${newSyn}
				</div>
			</div>
			`;
		// Add
		container.insertAdjacentHTML("beforeend", newTemplate);
	});
};

const form = document.getElementById("manga-form");
form.addEventListener("submit", (e) => {
	console.log(e);
	e.preventDefault();
	createDocument();
});
