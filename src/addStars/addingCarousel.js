

//TODO if more than one show left button
//TODO one end stop displaying the side button
//TODO delete and add pictures



function handleImageUpload(input) {
    const carouselContent = document.getElementById("carousel-content");

    if(input.files && input.files[0]){
        const reader= new FileReader();

        let currentID = 0;
        if(carouselContent.childElementCount > 0){
            const currentImg = document.querySelector('[data-status="active"]');
            currentID = parseInt( currentImg.getAttribute('data-index'));
        }

        reader.onload = function(e){
            addImage(e.target.result, currentID);
        }
        reader.readAsDataURL(input.files[0]);
    }
    
    
}

function addImage(link, id) {
    const carouselContent = document.getElementById("carousel-content");

    const newImg = document.createElement("img");
    newImg.setAttribute("data-index", id);
    newImg.src=link;

    //remove old image display
    if(carouselContent.childElementCount> 0) document.querySelector('[data-status="active"]').setAttribute("data-status","inactive");

    
    newImg.setAttribute("data-status", "active");

    for (let i = 0; i < carouselContent.childElementCount; i++) {
        const currentIndex = parseInt( carouselContent.children[i].getAttribute("data-index") );
        if ( currentIndex >= id) {
            carouselContent.children[i].setAttribute("data-index", (currentIndex + 1));
        }
    }

    carouselContent.appendChild(newImg);
    updateMovingButton();
}


function removeCurrent(){
    
    const carouselContent = document.getElementById("carousel-content");
    if(carouselContent.childElementCount ==0) return;

    const currentImg = document.querySelector('[data-status="active"]');
    const currentID = parseInt( currentImg.getAttribute('data-index'));

    currentImg.remove();


    let changedCurrent = false;
    for (let i = 0; i < carouselContent.childElementCount; i++) {
        const currentIndex = parseInt( carouselContent.children[i].getAttribute("data-index") );

        if ( currentIndex > currentID) {
            if(!changedCurrent){
                carouselContent.children[i].setAttribute("data-status","active");
                changedCurrent=true;
            }
            carouselContent.children[i].setAttribute("data-index", (currentIndex - 1));
        }
    }

    if(!changedCurrent && currentID > 0){
        document.querySelector('[data-index="'+ (currentID - 1) +'"]').setAttribute("data-status","active");
    }

    updateMovingButton();
}


const prev = document.getElementById("caroussel-prev");
const next = document.getElementById("caroussel-next");


next.addEventListener("click",(event)=> nextCarousel());

function nextCarousel() {
    const imgContainer = document.getElementById("carousel-content");
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) + 1;

    if (nextId > (imgContainer.childElementCount - 1)) return;

    const nextImg = document.querySelector('[data-index="' + nextId + '"]');

    nextImg.setAttribute("data-status", "active");
    currentImg.setAttribute("data-status", "inactive");

    updateMovingButton();
}

prev.addEventListener("click",(event)=> previousCarousel());

function previousCarousel(){
    const currentImg = document.querySelector('[data-status="active"]');
    let idImg = currentImg.getAttribute('data-index');
    let nextId = parseInt(idImg) - 1;

    if (nextId <0 ) return;

    const nextImg = document.querySelector('[data-index="' + nextId + '"]');

    nextImg.setAttribute("data-status", "active");
    currentImg.setAttribute("data-status", "inactive");

    updateMovingButton();
}


function updateMovingButton(){
    const imgContainer = document.getElementById("carousel-content");
    if(imgContainer.childElementCount == 0){
        prev.style.visibility = "hidden";
        next.style.visibility = "hidden";
        return;
    }
    prev.style.visibility = "visible";
    next.style.visibility = "visible";
    
    const currentImgID = parseInt(document.querySelector('[data-status="active"]').getAttribute('data-index'));
    
    if(currentImgID == 0) {
        prev.style.visibility = "hidden";
    }

    if(currentImgID == (imgContainer.childElementCount - 1)){
        next.style.visibility = "hidden";
    }
}


updateMovingButton();