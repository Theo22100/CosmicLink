window.oncontextmenu = (e) => {
    e.preventDefault();
}

//GLOBAL CONSTANTS
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//DEPLACEMENT DANS L'ESPACE !

const UNIVERS = document.getElementById("univers")
let offsetX = 0; //0 = originX
let offsetY = 0; //0 = originY

/**
 * Movable in space
 */
moveSpace(UNIVERS);

function moveSpace(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
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

        offsetX -= pos1;
        offsetY -= pos2;


        // set the element's new position:
        for (const child of element.children) {

            // Extract the translateX and translateY values from the transform property
            let translate = getTranslateXY(child);

            let translateX = translate.translateX - pos1;
            let translateY = translate.translateY - pos2;
            child.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}
/**
 * ZOOM IN SPACE
 */

let zoom = 1;
const ZOOM_SPEED = 0.1;

UNIVERS.addEventListener("wheel", (event) => {
    event.preventDefault();
    let zoomIn = false;
    let oldZoom = zoom;
    if (event.deltaY < 0) { //si molette vers l'avant zoom
        zoom *= 1.1;
        zoomIn = true
    }
    else {
        zoom /= 1.1;
    }

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    zoomInOut(mouseX, mouseY, zoomIn, oldZoom)
});

function zoomInOut(translateX, translateY, zoomIn, oldZoom) {
    const starList = UNIVERS.getElementsByClassName("starDiv");

    zoomCoordinatesOffSet(zoomIn, translateX, translateY);

    for (let i = 0; i < starList.length; i++) { //itère dans tout les enfants
        const child = starList.item(i);

        //augmente / diminue la taille de l'étoile
        child.getElementsByClassName("stars")[0].style.transform = `scale(${zoom})`;
        zoomCoordinates(zoomIn, child, translateX, translateY);

        if (zoom > 0.7) child.style.visibility = "visible";
        else child.style.visibility = "hidden";

        console.log("zoom: " + zoom);
    }

    const galaxyList = UNIVERS.getElementsByClassName("galaxyDiv");
    for (let i = 0; i < galaxyList.length; i++) {
        const child = galaxyList.item(i);

        //augmente / diminue la taille de la galaxy
        child.getElementsByClassName("galaxy")[0].style.transform = `scale(${zoom})`;
        zoomCoordinates(zoomIn, child, translateX, translateY);


        // 0.7 full 1 faded
        // 0.7 -> 1
        // 0.85 -> 0.5
        // 1 -> 0
        if (zoom < 1) {
            // child.getElementsByClassName("galaxy")[0].style.opacity = 1 - (zoom - 0.7);
            child.style.visibility = "visible";
            // child.style.transition= "3s opacity";

            
        }
        else {
            // child.getElementsByClassName("galaxy")[0].style.opacity = 0;
            child.style.visibility = "hidden";
            // child.style.transition= "3s opacity";
        }

    }
}

function zoomCoordinatesOffSet(zoomIn, originX, originY) {
    //calcule de la distance a changer
    let zoom = 0.1;
    if (zoomIn) zoom = -zoom;

    let translateX = distance2Point(originX, offsetX);
    translateX *= zoom;

    let translateY = distance2Point(originY, offsetY);
    translateY *= zoom;

    if (originX < offsetX) {
        translateX = - translateX;
    }
    if (originY < offsetY) {
        translateY = - translateY;
    }

    offsetX += translateX;
    offsetY += translateY;
}

function zoomCoordinates(zoomIn, element, originX, originY) {

    // Extract the translateX and translateY values from the transform property
    let translate = getTranslateXY(element);

    let elementX = translate.translateX + element.offsetLeft;
    let elementY = translate.translateY + element.offsetTop;

    //calcule de la distance a changer
    let zoom = 0.1;
    if (zoomIn) zoom = -zoom;

    let translateX = distance2Point(originX, elementX);
    translateX *= zoom;

    let translateY = distance2Point(originY, elementY);
    translateY *= zoom;

    if (originX < elementX) {
        translateX = - translateX;
    }
    if (originY < elementY) {
        translateY = - translateY;
    }

    //remet les anciennes position de translation de l'étoile (pour conserver le déplacement)
    translateX += translate.translateX;
    translateY += translate.translateY;

    //reactualise la taille de l'étoile
    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function distance2Point(p1, p2) {
    return Math.sqrt((p2 - p1) * (p2 - p1))
}
