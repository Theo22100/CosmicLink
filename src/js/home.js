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



//DEPLACEMENT DANS L'ESPACE !

const UNIVERS = document.getElementById("univers")
const origin = document.getElementById("origin");

/**
 * Movable in space
 */
moveSpace(UNIVERS);

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

UNIVERS.addEventListener("wheel", (event)=>{
    event.preventDefault();
    let zoomIn = false;
    let oldZoom = zoom;
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
    const starList = UNIVERS.getElementsByClassName("starDiv");

    for(let i = 0; i < starList.length; i++){ //itère dans tout les enfants
        const child = starList.item(i);

        //augmente / diminue la taille de l'étoile
        child.getElementsByClassName("star")[0].style.transform = `scale(${zoom})`;
        zoomCoordinates(zoomIn, child, translateX, translateY);
    }
}


function zoomCoordinates(zoomIn, element, originX, originY){

    // Extract the translateX and translateY values from the transform property
    const match = element.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
    let translateXOld = match ? parseFloat(match[1]) : 0;
    let translateYOld = match ? parseFloat(match[2]) : 0;

    let elementX = translateXOld + element.offsetLeft;
    let elementY = translateYOld + element.offsetTop;

    //calcule de la distance a changer
    const zoom = 0.1; 
    if (zoomIn) zoom = -zoom;

    let translateX = distance2Point(originX, elementX) ;
    translateX *= zoom;

    let translateY = distance2Point(originY, elementY) ;
    translateY *= zoom;

    if (originX < elementX) {
        translateX = - translateX;
    }
    if (originY < elementY ) {
        translateY = - translateY;
    }

    //remet les anciennes position de translation de l'étoile (pour conserver le déplacement)
    translateX += translateXOld;
    translateY += translateYOld;

    //reactualise la taille de l'étoile
    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
}



function distance2Point(p1, p2){
    return Math.sqrt( (p2-p1)*(p2-p1))
}

function debugdist(){
    const starList = UNIVERS.getElementsByClassName("starDiv");
    const star1 = starList.item(0);

    console.log("distance x: " + distance2Point(origin.offsetLeft, star1.offsetLeft));
    console.log("distance y: " + distance2Point(origin.offsetTop, star1.offsetTop));

}

function debug(nb){
    for (let i =0; i < nb; i++){
        addStar();
    }
}
