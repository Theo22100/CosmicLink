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
const gui = document.getElementById("starMenu");

function openStarGui(){
    edit = false;
    gui.classList.remove("hidden");
}
function closeStarGui(){
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
    switch (getRandomInt(3)){
        case 0: newStar.src = "/rsc/etoile1.png"; break;
        case 1: newStar.src = "/rsc/etoile2.png"; break;
        case 2: newStar.src = "/rsc/etoile3.png"; break;
        default: newStar.src = "/rsc/etoile1.png";
    }

    switch (getRandomInt(3)){
        case 0: newStar.classList.add("red"); break;
        case 1: newStar.classList.add("blue"); break;
        case 2: newStar.classList.add("yellow"); break;
        default: newStar.classList.add("white");
    }

    newStar.style.width = (10 + getRandomInt(10) ).toString() + "px";
    newStar.style.height = "auto";


    starDiv.appendChild(newStar);

    const starInfo = document.createElement("div");
    starInfo.classList.add("starInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;

    document.getElementById("starName").value = "";
    document.getElementById("starDesc").value = "";

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


/**
 * Movable in space
 */
moveSpace(document.getElementById("galaxy"));

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
            child.style.top = (child.offsetTop - pos2) + "px";
            child.style.left = (child.offsetLeft - pos1) + "px";
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

document.getElementById("galaxy").addEventListener("wheel", (event)=>{
    event.preventDefault();
    let zoomIn = false;
    if(event.deltaY < 0){ //si molette vers l'avant dézoom
        zoom += ZOOM_SPEED;
        zoomIn = true
    }
    else {
        zoom -= ZOOM_SPEED;
    }

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    zoomInOut(mouseX, mouseY, zoomIn)
})

function zoomInOut(originx, originy, zoomIn){
    const starList = document.getElementById("galaxy").getElementsByClassName("starDiv");
    // galaxy.style.transform = "scale("+ strength.toString() + ")";
    // galaxy.style.width = "100%";
    // galaxy.style.height = "100%";

    for(let i = 0; i < starList.length; i++){ //itére dans tout les enfants
        const child = starList.item(i);


        //augmente / diminue la taille de l'étoile
        child.getElementsByClassName("star")[0].style.transform = "scale("+ zoom.toString() + ")";


        //calcule de la distance a changer

        let zoomPower = ZOOM_SPEED;
        if (!zoomIn){
            zoomPower = -ZOOM_SPEED;
        }

        let pos2 = distance2Point(originx, child.offsetLeft) * zoomPower;
        let pos3 = distance2Point(originy, child.offsetTop) * zoomPower ;
        if (originx < child.offsetLeft) { //MARCHE PAS JE SAIS PAS CE QUE CA FAIT!!!
            pos2 = - pos2;
        }
        if (originy < child.offsetTop ) {
            pos3 = - pos3;
        }


        //reactualise la taille de l'étoile
        child.style.top = (child.offsetTop - pos3) + "px";
        child.style.left = (child.offsetLeft - pos2) + "px";

    }
}


function distance2Point(p1, p2){
    return Math.sqrt( (p2-p1)*(p2-p1))
}

function debug(nb){
    for (let i =0; i < nb; i++){
        addStar();
    }
}