window.oncontextmenu = (e) => {
    e.preventDefault();
}

//GLOBAL CONSTANTS
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const popUpPage = new popUpInfo();


const INVISIBLE = document.getElementById("invisible");

function onclickoutside(func) {
    INVISIBLE.classList.remove("hidden");
    INVISIBLE.onclick = function () {
        INVISIBLE.classList.add("hidden");
        func();
    }
    INVISIBLE.addEventListener('contextmenu', (event) => {
        INVISIBLE.classList.add("hidden");
        func();
    });
}


const menu = document.getElementById("menu");
function openOption(event) {
    menu.style.width = "30%";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition = ".3s";


    menu.style.zIndex = 999;
    const opts = menu.getElementsByClassName("options");

    for (let i = 0; i < opts.length - 1; i++) {
        opts.item(i).classList.remove("hidden");
    }

    onclickoutside(closeOption);
}

menu.onclick = function (event) { openOption(event) };

function closeOption() {
    const opts = menu.getElementsByClassName("options");

    for (let i = 0; i < opts.length; i++) {
        opts.item(i).classList.add("hidden");
    };

    menu.style.width = "45px";
    menu.style.borderRadius = "50%";
    menu.style.paddingLeft = "0px";
    menu.style.paddingRight = "0px";
    menu.style.backgroundColor = "none";
    menu.style.backgroundColor = "rgba(146, 180, 184,0)";
    menu.style.transition = ".3s";

    menu.style.zIndex = 0;

}

const chatInter = new pageChat();
const friendsInter = new pageFriends();
const connectInter = new pageConnect();
const messInter = new pageMessage();

const chatButton = document.getElementById("chatButton");

chatButton.addEventListener("click", (event) => {
    event.stopImmediatePropagation();
    closeOption();
    chatInter.openInterface()
});


























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
    }

    const galaxyList = UNIVERS.getElementsByClassName("galaxyDiv");
    for (let i = 0; i < galaxyList.length; i++) {
        const child = galaxyList.item(i);

        //augmente / diminue la taille de la galaxy
        child.getElementsByClassName("galaxy")[0].style.transform = `scale(${zoom})`;
        zoomCoordinates(zoomIn, child, translateX, translateY);
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

function debug(nb) {
    for (let i = 0; i < nb; i++) {
        addStar();
    }
}