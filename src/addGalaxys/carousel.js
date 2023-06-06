// article.dataset.columns; // "3"


const linksArray = ["../../img/carousel/desert.jpg", "../../img/carousel/island.jpg", "../../img/carousel/redPanda.jpg", "../../img/carousel/universeIMG.jpg"];



function addImageCarousel(link) {
    const imgContainer = document.getElementById("image-caroussel");

    const imgAdd = document.createElement("img");
    imgAdd.setAttribute("data-index", imgContainer.childElementCount);
    if (imgContainer.childElementCount == 0) {
        imgAdd.setAttribute("data-status", "active");
    }
    else {
        imgAdd.setAttribute("data-status", "inactive");
    }
    imgAdd.setAttribute("src", link);

    imgContainer.appendChild(imgAdd);
}


initCarousel(linksArray);
function initCarousel(linksArray) {
    if (linksArray.length == 0) return;
    const memCarousel = document.createElement("div");
    memCarousel.id = "memory-caroussel";
    memCarousel.classList.add("memory-caroussel");


    const imgCarousel = document.createElement("div");
    imgCarousel.id = "image-caroussel";
    imgCarousel.classList.add("image-caroussel");
    memCarousel.appendChild(imgCarousel);

    const popUp = document.getElementsByClassName("popUpInfo")[0];
    popUp.appendChild(memCarousel);


    for (let i = 0; i < linksArray.length; i++) {
        addImageCarousel(linksArray[i]);
    }


    if (imgCarousel.childElementCount > 1) {
        const mem = document.getElementById("memory-caroussel");


        const previousCarousel = document.createElement("button");
        previousCarousel.id = "navigation-previous";
        const iconPrevious = document.createElement("img");
        iconPrevious.src = "../../img/chevron-right.png";
        previousCarousel.appendChild(iconPrevious);
        mem.appendChild(previousCarousel);

        const nextCarousel = document.createElement("button");
        nextCarousel.id = "navigation-next";
        const iconNext = document.createElement("img");
        iconNext.src = "../../img/chevron-right.png";
        nextCarousel.appendChild(iconNext);
        mem.appendChild(nextCarousel);

        nextCarousel.addEventListener("click", (event) => goNextCarousel());
        previousCarousel.addEventListener("click", (event) => goPreviousCarousel());
    }
}

function goNextCarousel() {
    const imgContainer = document.getElementById("image-caroussel");
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) + 1;
    console.log(imgContainer.childElementCount);
    if (nextId > (imgContainer.childElementCount - 1)) nextId = 0;

    const nextImg = document.querySelector('[data-index="' + nextId + '"]');

    nextImg.setAttribute("data-status", "active");
    currentImg.setAttribute("data-status", "inactive");
}

function goPreviousCarousel() {
    const imgContainer = document.getElementById("image-caroussel");
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) - 1;
    if (nextId < 0) nextId = imgContainer.childElementCount - 1;

    console.log("nextId: " + nextId);
    const nextImg = document.querySelector('[data-index="' + nextId + '"]');

    nextImg.setAttribute("data-status", "active");
    currentImg.setAttribute("data-status", "inactive");
}