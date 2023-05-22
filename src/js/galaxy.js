// GUI

const galaxyGui = document.getElementById("galaxyUi");
const doneGalaxyButton = galaxyGui.getElementsByTagName("button")[0]; //quand edit/add


function openCreateGalaxy(event){ //ouvre la fenetre d'edit/ajout d'étoile
    event.stopPropagation();
    closeOption();
    galaxyGui.classList.remove("hidden");

    doneGalaxyButton.onclick = function(event) {
        INVISIBLE.classList.add("hidden");    
        addGalaxy(event)
    };

    onclickoutside(closeGalaxyGui);
}

function closeGalaxyGui(){
    INVISIBLE.classList.add("hidden");
    document.getElementById("galaxyName").value = "";
    document.getElementById("galaxyDesc").value = "";
    galaxyGui.classList.add("hidden");
}


function openEditGalaxy(event){
    closeOption(); //dans le cas ou done est visible on veut le rendre invisible
    closeGalaxyOptionsList();
    galaxyGui.classList.remove("hidden");

    const ptag = currentGalaxy.getElementsByTagName("p");
    const name = ptag[0].textContent;
    const desc = ptag[1].textContent;
    document.getElementById("galaxyName").value = name;
    document.getElementById("galaxyDesc").value = desc;

    doneGalaxyButton.onclick = function(event) {
        editGalaxy(event)
    };

    onclickoutside(closeEditGalaxy);
}

function closeEditGalaxy(){
    closeGalaxyGui();
}

const galaxyOptions = document.getElementById("contextMenu");

//CONTEXT MENU
function openGalaxyOptionsList(x, y){
    contextMenu.style.top = y.toString() + "px";
    contextMenu.style.left = x.toString() + "px";
    contextMenu.classList.remove("hidden");

    document.getElementById("edit").onclick = function(event){
        openEditGalaxy(event)};
    document.getElementById("move").onclick = function(event){
        moveGalaxy(event)};
    document.getElementById("link").classList.add("hidden");
    // document.getElementById("link").onclick = function(event){
        // editGalaxy(event)}; TODO
    document.getElementById("remove").onclick = function(event){
        removeGalaxy(event)};

    onclickoutside(closeGalaxyOptionsList);
}
function closeGalaxyOptionsList(){
    galaxyOptions.classList.add("hidden");
}

let movableG = false;
function moveGalaxy(event){
    INVISIBLE.classList.add("hidden"); 
    closeGalaxyOptionsList();
    document.getElementById("done").classList.remove("hidden");

    menu.style.width = "auto";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition= ".3s";

    movableG = true;
    doneMenuButton.onclick = function(event) {
        event.stopImmediatePropagation();
        confirmGalaxyPosition(event)};
}

function confirmGalaxyPosition(event){
    movableG = false;
    closeOption();
}

//

function addGalaxy(event){
    //set coordonnées pour la nouvelle galaxy
    const x = getRandomInt( window.innerWidth ) - offsetX;
    const y = getRandomInt( window.innerHeight ) - offsetY;

    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    addGalaxyWithInfo(galaxyName, galaxyDesc, x, y);
    closeGalaxyGui();
    INVISIBLE.classList.add("hidden"); 
}


function addGalaxyWithInfo(gName, gDesc, x, y){
    const galaxyDiv = document.createElement("div");
    galaxyDiv.classList.add("galaxyDiv");
    galaxyDiv.style.position = "fixed";
    galaxyDiv.style.left = `${x}px`;
    galaxyDiv.style.top = `${y}px`;

    const newGalaxy = document.createElement("img");
    newGalaxy.classList.add("galaxy");
    newGalaxy.src = "../img/galaxy.png";
    newGalaxy.style.transform = `scale(${zoom})`;

    newGalaxy.style.width = (200 + getRandomInt(30) ).toString() + "px";
    newGalaxy.style.height = "auto";


    galaxyDiv.appendChild(newGalaxy);

    const galaxyInfo = document.createElement("div");
    galaxyInfo.classList.add("galaxyInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");

    name.textContent = gName;
    name.classList.add("galaxyName");
    desc.textContent = gDesc;
    desc.classList.add("galaxyDesc");

    galaxyInfo.appendChild(name);
    galaxyInfo.appendChild(desc);

    galaxyDiv.appendChild(galaxyInfo);
    UNIVERS.appendChild(galaxyDiv);

    galaxyDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentGalaxy = galaxyDiv;
        openGalaxyOptionsList(event.clientX, event.clientY);
    });

    moveGalaxyElement(galaxyDiv);
}


let currentGalaxy;
function editGalaxy(event){
    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    const ptag = currentGalaxy.getElementsByTagName("p");
    ptag[0].textContent = galaxyName;
    ptag[1].textContent = galaxyDesc;

    closeEditGalaxy();
    INVISIBLE.classList.add("hidden"); 
}


function removeGalaxy(){
    currentGalaxy.remove();
    closeGalaxyOptionsList();
    INVISIBLE.classList.add("hidden"); 
}

/**
 * DRAGGABLE PART
 */

function moveGalaxyElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (!movableG) return;
        e.stopPropagation();
        
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
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}