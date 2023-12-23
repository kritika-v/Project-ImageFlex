const accessKey = "FpBUya6fv6AgzoVpXnZWZcimtsmcyYO8y2MeCSiA3mg";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const imageDetails = document.getElementById("image-details");
const imageTitle = document.getElementById("image-title");
const imageDetailsSrc = document.getElementById("image-details-src");
const favoriteBtn = document.getElementById("favorite-btn");
const closeDetailsBtn = document.getElementById("close-details-btn");

let keyword = "";
let page = 1;
const perPage = 12;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=${perPage}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.forEach((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const image = document.createElement("img");
        image.src = result.urls.small;

        const shareButton = document.createElement("button");
        shareButton.textContent = "Share";
        shareButton.classList.add("share-btn");
        shareButton.addEventListener('click', () => shareImage(result.links.html));

        image.addEventListener('click', () => showImageDetails(result));

        imageContainer.appendChild(image);
        imageContainer.appendChild(shareButton);
        searchResult.appendChild(imageContainer);
    });

    if (data.total_pages > page) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}

function showImageDetails(image) {
    imageTitle.textContent = image.alt_description || "Untitled";
    imageDetailsSrc.src = image.urls.regular;
    imageDetails.style.display = "block";

    favoriteBtn.addEventListener('click', () => {
        console.log("Added to favorites:", image.id);
    });

    closeDetailsBtn.addEventListener('click', () => {
        imageDetails.style.display = "none";
    });
}

function shareImage(imageUrl) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`, '_blank', 'width=600,height=400');
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
