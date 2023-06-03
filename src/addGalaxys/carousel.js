// article.dataset.columns; // "3"


const nextCarousel = document.getElementById("navigation-next");

const previous = document.getElementById("navigation-previous");

nextCarousel.addEventListener("click", (event) => goNextCarousel());
previous.addEventListener("click", (event) => goPreviousCarousel());

function goNextCarousel(){
    const imgContainer = document.getElementById("image-caroussel");
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) + 1;
    console.log(imgContainer.childElementCount);
    if(nextId > (imgContainer.childElementCount - 1) ) nextId = 0;

    const nextImg = document.querySelector('[data-index="'+nextId+'"]');

    nextImg.setAttribute("data-status","active");
    currentImg.setAttribute("data-status","inactive");
}

function goPreviousCarousel(){
    const imgContainer = document.getElementById("image-caroussel");
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) - 1;
    if(nextId < 0) nextId = imgContainer.childElementCount -1;

    console.log("nextId: " + nextId);
    const nextImg = document.querySelector('[data-index="'+nextId+'"]');

    nextImg.setAttribute("data-status","active");
    currentImg.setAttribute("data-status","inactive");
}