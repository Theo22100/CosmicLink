

const galaxyGui = document.getElementById("galaxyUi");
let editingGalaxy;


function openGalaxyGui(){ //ouvre la fenetre d'edit/ajout d'étoile
    hideOption();
    GLOBAL_HIDABLE = false;
    editingGalaxy = false;
    galaxyGui.classList.remove("hidden");
}
function closeGalaxyGui(){
    document.getElementById("galaxyName").value = "";
    document.getElementById("galaxyDesc").value = "";
    galaxyGui.classList.add("hidden");
}


let movableG = false;
function moveGalaxy(){
    closeGalaxyOptionsList();
    hideOption();
    movableG = true;
    document.getElementById("circle").classList.add("hidden");
    document.getElementById("done").classList.remove("hidden");
}

function confirm(){
    movableG = false;
    closegGalaxyGui();
    hideOption();
}

function showEditGalaxy(){
    closeGalaxyOptionsList();

    const ptag = currentGalaxy.getElementsByTagName("p");
    const name = ptag[0].textContent;
    const desc = ptag[1].textContent;
    document.getElementById("galaxyName").value = name;
    document.getElementById("galaxyDesc").value = desc;


    galaxyGui.classList.remove("hidden");
    editingGalaxy = true;
}

function hideEdit(){
    closeGalaxyGui();
}

function galaxy(){
    if(editingGalaxy){
        editGalaxy();
    }
    else {
        addGalaxy();
    }
}

const galaxyOptions = document.getElementById("galaxy-option");
function galaxyOptionsList(x, y){
    galaxyOptions.style.top = y.toString() + "px";
    galaxyOptions.style.left = x.toString() + "px";
    galaxyOptions.classList.remove("hidden");
    //console.log(1111);
}
function closeGalaxyOptionsList(){
    galaxyOptions.classList.add("hidden");
}


//

function addGalaxy(){
    const galaxyDiv = document.createElement("div");
    galaxyDiv.classList.add("galaxyDiv");
    galaxyDiv.style.position = "fixed";
    starDiv.style.left = (getRandomInt( window.innerWidth )).toString() + "px" ;
    starDiv.style.top = (getRandomInt( window.innerHeight )).toString() + "px";

    const newGalaxy = document.createElement("img");
    newGalaxy.classList.add("galaxy");
    newGalaxy.src = "../img/galaxy.png";

    newGalaxy.style.width = (200 + getRandomInt(30) ).toString() + "px";
    newGalaxy.style.height = "auto";


    galaxyDiv.appendChild(newGalaxy);

    const galaxyInfo = document.createElement("div");
    galaxyInfo.classList.add("galaxyInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");

    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    name.textContent = galaxyName;
    name.classList.add("galaxyName");
    desc.textContent = galaxyDesc;
    name.classList.add("galaxyDesc");

    galaxyInfo.appendChild(name);
    galaxyInfo.appendChild(desc);

    galaxyDiv.appendChild(galaxyInfo);
    UNIVERS.appendChild(galaxyDiv);

    galaxyDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentGalaxy = galaxyDiv;
        galaxyOptionsList(event.clientX, event.clientY);
    });
    moveGalaxyElement(galaxyDiv);
    closeGalaxyGui();
}

let currentGalaxy;
function editGalaxy(){

    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    const ptag = currentGalaxy.getElementsByTagName("p");
    ptag[0].textContent = galaxyName;
    ptag[1].textContent = galaxyDesc;

    hideEdit();
}


function removeGalaxy(){
    currentGalaxy.remove();
    closeGalaxyOptionsList();
}

/**
 * DRAGGABLE PART
 */

function moveGalaxyElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementsByClassName("galaxys").length ===1) {
        // if present, the header is where you move the DIV from:
        document.getElementsByClassName("galaxys")[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (!movableG) return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = galaxyDrag;
    }

    function galaxyDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        console.log(movableG);
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



