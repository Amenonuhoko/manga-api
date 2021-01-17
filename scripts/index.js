// const image = document.getElementById("image");
// const header = document.getElementById("header");
// const synopsis = document.getElementById("synopsis");
const container = document.querySelector(".page-container");
const showHide = (bool) => {
	const loading = document.getElementById("loading");
	if (bool) {
		loading.style.display = "inline";
	} else {
		loading.style.display = "none";
	}
};
// バカやろ
const getManga = async () => {
	// Loading
	showHide(true);
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
	showHide(false);
	// Iterate
	objArr.data.forEach((arr, index) => {
		// Template
		const newImage = `<img class="image" src=${arr.attributes.posterImage.small}>`;
		const newCanTitle = `<h1 class="header">${arr.attributes.canonicalTitle}</h1>`;
		const newAltTitle = `<h6 class="header">${arr.attributes.titles.en_jp}</h1>`;
		const newSyn = `<p class="synopsis">${arr.attributes.synopsis}</p>`;
		const newRating = `<p class="rank">Ranking <br> #${arr.attributes.ratingRank}</p>`;
		const newChapCount = `<p class="chap">Chapter <br> ${arr.attributes.chapterCount}</p>`;
		const newStatus = `<p class="chap">Status <br> ${arr.attributes.status}</p>`;
		const newTemplate = `
			<div class="manga-cards" id="manga-card-${index}">
			${newImage}
				<div class="detail">
					<div class="info">
						${newCanTitle}
						${newAltTitle}
					</div>
					<div class="subInfo">
						${newRating}
						${newChapCount}
						${newStatus}
					</div>
					<div class="synopsis">
						${newSyn}
					</div>
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
