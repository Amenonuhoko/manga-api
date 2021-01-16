const forms = document.getElementById("manga-form").elements;
const submitButton = forms["submit"];

const image = document.getElementById("image");
const header = document.getElementById("header");
const synopsis = document.getElementById("synopsis");

const getManga = async () => {
	// Move for other types
	const url = "https://kitsu.io/api/edge";
	//For this type
	const type = "/manga";

	const typeQuery = forms["search-param"].value;
	const wordQuery = forms["input"].value;
	// Combined endpoint
	const endpoint = `${url}${type}?filter%5B${typeQuery}%5D=${wordQuery}`;
	console.log(endpoint);
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

const renderObj = async () => {
	const obj = await getManga();
	console.log(obj);
	image.src = obj.data["0"].attributes.posterImage.medium;
	header.innerHTML = obj.data["0"].attributes.titles.en;
	synopsis.innerHTML = obj.data["0"].attributes.synopsis;
};

submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	renderObj();
});
