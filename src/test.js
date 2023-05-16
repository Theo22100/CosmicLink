window.oncontextmenu = (e) => {
    e.preventDefault();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showOption(){
    const opts = document.getElementsByClassName("options");

    for (let i = 0; i <opts.length - 1; i++) {
        opts.item(i).classList.remove("hidden");
    }
    document.getElementById("circle").classList.add("hidden");
}


function hideOption(){
    if (movable) return;
    const opts = document.getElementsByClassName("options");

    for (let i = 0; i <opts.length; i++) {
        opts.item(i).classList.add("hidden");
    }

    document.getElementById("circle").classList.remove("hidden");
    closeStarGui();
    closeStarOptionsList();
    hideEdit();
}
const gui = document.getElementById("ui");

function openStarGui(){
    edit = false;
    gui.classList.remove("hidden");
}
function closeStarGui(){
    document.getElementById("starName").value = "";
    document.getElementById("starDesc").value = "";
    gui.classList.add("hidden");
}

let edit = false;
let currentStar;

function addStar(){
    const starDiv = document.createElement("div");
    starDiv.classList.add("starDiv");
    starDiv.style.position = "fixed";
    starDiv.style.left = (getRandomInt(100)).toString() + "%" ;
    starDiv.style.top = (getRandomInt(90)).toString() + "%";

    const newStar = document.createElement("img");
    newStar.classList.add("star");
    newStar.src = "../img/etoile.png";

    switch (getRandomInt(3)){
        case 0: newStar.classList.add("red"); break;
        case 1: newStar.classList.add("blue"); break;
        case 2: newStar.classList.add("yellow"); break;
        default: newStar.classList.add("white");
    }

    newStar.style.width = (20 + getRandomInt(30) ).toString() + "px";
    newStar.style.height = "auto";


    starDiv.appendChild(newStar);

    const starInfo = document.createElement("div");
    starInfo.classList.add("starInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;

    name.textContent = starName;
    name.classList.add("starName");
    desc.textContent = starDesc;
    name.classList.add("starDesc");

    starInfo.appendChild(name);
    starInfo.appendChild(desc);

    starDiv.appendChild(starInfo);
    document.getElementById('galaxy').appendChild(starDiv);

    starDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentStar = starDiv;
        starOptionsList(event.clientX, event.clientY);
    });
    dragElement(starDiv);
    closeStarGui();
}

const starOptions = document.getElementById("star-option");
function starOptionsList(x, y){
    starOptions.style.top = y.toString() + "px";
    starOptions.style.left = x.toString() + "px";
    starOptions.classList.remove("hidden");

}
function closeStarOptionsList(){
    starOptions.classList.add("hidden");
}

function star(){
    if (edit){
        editStar();
    }
    else {
        addStar();
    }
}


let movable = false;
function moveStar(){
    closeStarOptionsList();
    hideOption();
    movable = true;
    document.getElementById("circle").classList.add("hidden");
    document.getElementById("done").classList.remove("hidden");
}

function confirm(){
    movable = false;
    closeStarGui();
    hideOption();
}

function showEdit(){
    closeStarOptionsList();

    const ptag = currentStar.getElementsByTagName("p");
    const name = ptag[0].textContent;
    const desc = ptag[1].textContent;
    document.getElementById("starName").value = name;
    document.getElementById("starDesc").value = desc;


    gui.classList.remove("hidden");
    edit = true;
}

function hideEdit(){
    closeStarGui();
}

function editStar(){

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;

    const ptag = currentStar.getElementsByTagName("p");
    ptag[0].textContent = starName;
    ptag[1].textContent = starDesc;

    hideEdit();
}

/**
 * DRAGGABLE PART
 */

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementsByClassName("stars").length ===1) {
        // if present, the header is where you move the DIV from:
        document.getElementsByClassName("stars")[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (!movable) return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = starDrag;
    }

    function starDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        console.log(movable);
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


//DEPLACEMENT DANS L'ESPACE !

const GALAXY = document.getElementById("galaxy")
const origin = document.getElementById("origin");

/**
 * Movable in space
 */
moveSpace(GALAXY);

function moveSpace(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (movable) return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        for (const child of element.children){

            // Extract the translateX and translateY values from the transform property
            const match = child.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
            let translateX = match ? parseFloat(match[1]) : 0;
            let translateY = match ? parseFloat(match[2]) : 0;
            translateX -= pos1;
            translateY -= pos2;

            child.style.transform = `translate(${translateX}px, ${translateY}px)`;

            // child.style.top = (child.offsetTop - pos2) + "px";
            // child.style.left = (child.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/**
 * ZOOM IN SPACE
 */

let zoom = 1;
const ZOOM_SPEED = 0.1;

GALAXY.addEventListener("wheel", (event)=>{
    event.preventDefault();
    let zoomIn = false;
    let oldZoom = zoom;
    // if (zoom >= 5 && event.deltaY < 0) return;
    // if(zoom <= 0 && event.deltaY >=0) return;
    if(event.deltaY < 0){ //si molette vers l'avant zoom
        zoom *= 1.1;
        zoomIn = true
    }
    else {
        zoom /= 1.1;
    }

    console.log("zoom value: " + zoom)
    // const containerRect = GALAXY.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;



    // const translateX = (mouseX - GALAXY.offsetLeft) * (1 - zoom);
    // const translateY = (mouseY - GALAXY.offsetTop) * (1 - zoom);
    //
    //
    // const offsetX = mouseX / GALAXY.offsetWidth;
    // const offsetY = mouseY / GALAXY.offsetHeight;

    zoomInOut(mouseX, mouseY, zoomIn, oldZoom)
})

function zoomInOut(translateX, translateY, zoomIn, oldZoom){
    const starList = GALAXY.getElementsByClassName("starDiv");

    // let zoomPower = ZOOM_SPEED;
    // if (!zoomIn){
    //     zoomPower = -ZOOM_SPEED;
    // }
    // origin.style.transform = `translate(${translateX}px, ${translateY}px)`;

    // zoomCoordinates(zoom, origin, translateX, translateY);
    for(let i = 0; i < starList.length; i++){ //itére dans tout les enfants
        const child = starList.item(i);

        //augmente / diminue la taille de l'étoile
        // child.style.transform = `translate(${translateX}px, ${translateY}px)`;

        child.getElementsByClassName("star")[0].style.transform = `scale(${zoom})`;

        zoomCoordinates(zoom, oldZoom, zoomIn, child, translateX, translateY);
    }
}


function zoomCoordinates(zoom, oldZoom, zoomIn, element, originX, originY){


    // Extract the translateX and translateY values from the transform property
    const match = element.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
    let translateX1 = match ? parseFloat(match[1]) : 0;
    let translateY1 = match ? parseFloat(match[2]) : 0;

    let elementX = translateX1 + element.offsetLeft;
    let elementY = translateY1 + element.offsetTop;

    // console.log("elementX: " + elementX);
    // console.log("elementY: " + elementY);

    // console.log("originX: " + originX);
    // console.log("originY: " + originY);

    //calcule de la distance a changer
    // zoom = distance2Point(oldZoom, zoom);
    if (!zoomIn) zoom = 1.1;
    else zoom = -1.1;
    let translateX = - distance2Point(originX, elementX) * zoom;
    let translateY = - distance2Point(originY, elementY) * zoom ;
    if (originX < elementX) { //MARCHE PAS JE SAIS PAS CE QUE CA FAIT!!!
        translateX = - translateX;
    }
    if (originY < elementY ) {
        translateY = - translateY;
    }


    //reactualise la taille de l'étoile
    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    // element.style.top = (element.offsetTop - translateY) + "px";
    // element.style.left = (element.offsetLeft - translateX) + "px";
}








function distance2Point(p1, p2){
    return Math.sqrt( (p2-p1)*(p2-p1))
}

function debugdist(){
    const starList = document.getElementById("galaxy").getElementsByClassName("starDiv");
    const star1 = starList.item(0);

    console.log("distance x: " + distance2Point(origin.offsetLeft, star1.offsetLeft));
    console.log("distance y: " + distance2Point(origin.offsetTop, star1.offsetTop));

}

function debug(nb){
    for (let i =0; i < nb; i++){
        addStar();
    }
}
