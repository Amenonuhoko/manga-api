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
// MAKE LOADING FUNCTION
//
const createDocument = async () => {
	// Obj
	const objArr = await getManga();
	console.log(objArr);
	// Iterate
	objArr.data.forEach((arr, index) => {
		// Template
		const newImage = `<img class="image" src=${arr.attributes.posterImage.small}>`;
		const newCanTitle = `<h1 class="header">${arr.attributes.canonicalTitle}</h1>`;
		const newAltTitle = `<h6 class="header">${arr.attributes.titles.en_jp}</h1>`;
		const newSyn = `<p class="synopsis">${arr.attributes.synopsis}</p>`;
		const newRating = `<p class="rank">Rating <br> ${arr.attributes.ratingRank}</p>`;
		const newChapCount = `<p class="chap">Ch <br>${arr.attributes.chapterCount}</p>`;
		const newTemplate = `
			<div class="manga-cards" id="manga-card-${index}">
			${newImage}
				<div class="detail">
					<div class="info">
					${newCanTitle}
					${newAltTitle}
					<div class="subInfo">
						${newRating}
						${newChapCount}
					</div>
					</div>
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
