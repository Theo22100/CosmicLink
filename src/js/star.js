// GUI

const starGui = document.getElementById("ui");
const doneButton = starGui.getElementsByTagName("button")[0]; //quand edit/add
const doneMenuButton = document.getElementById("done");

function openCreateStar(event){ //ouvre la fenetre d'edit/ajout d'étoile
    event.stopPropagation();
    closeOption();
    starGui.classList.remove("hidden");

    doneButton.onclick = function(event) {
        INVISIBLE.classList.add("hidden");    
        addStar(event)
    };

    onclickoutside(closeCreateGui);
}

function closeCreateGui(){
    INVISIBLE.classList.add("hidden");
    document.getElementById("starName").value = "";
    document.getElementById("starDesc").value = "";
    document.getElementById("starSize").value = 3;
    starGui.classList.add("hidden");
}


function openEditStar(event){
    closeOption(); //dans le cas ou done est visible on veut le rendre invisible
    closeStarOptionsList();
    starGui.classList.remove("hidden");

    const ptag = currentStar.getElementsByTagName("p");
    const name = ptag[0].textContent;
    const desc = ptag[1].textContent;
    const size = ptag[2].textContent;
    document.getElementById("starName").value = name;
    document.getElementById("starDesc").value = desc;
    document.getElementById("starSize").value = numberFromSize(parseInt(size));

    doneButton.onclick = function(event) {
        editStar(event)
    };

    onclickoutside(closeEditStar);
}

function closeEditStar(){
    closeCreateGui();
}


//CONTEXT MENU
const contextMenu = document.getElementById("contextMenu");
function openStarOptionsList(x, y){
    contextMenu.style.top = y.toString() + "px";
    contextMenu.style.left = x.toString() + "px";
    contextMenu.classList.remove("hidden");

    document.getElementById("edit").onclick = function(event){
        openEditStar(event)};
    document.getElementById("move").onclick = function(event){
        moveStar(event)};
    document.getElementById("link").classList.remove("hidden");
    // document.getElementById("link").onclick = function(event){
        // editStar(event)}; TODO
    document.getElementById("remove").onclick = function(event){
        removeStar(event)};

    onclickoutside(closeStarOptionsList);
}
function closeStarOptionsList(){
    contextMenu.classList.add("hidden");
}


//action du bouton move dans le contextMenu
let movable = false;
function moveStar(event){
    INVISIBLE.classList.add("hidden"); 
    closeStarOptionsList(); // ferme le menu contextuelle
    document.getElementById("done").classList.remove("hidden");
    
    menu.style.width = "auto";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition= ".3s";

    movable= true;
    doneMenuButton.onclick = function(event) {
        event.stopImmediatePropagation();
        confirmStarPosition(event)};
}

function confirmStarPosition(event){
    movable = false;
    closeOption(); // cache le done et affiche et remet le cercle de base
}


//FONCTION NON GRAPHIQUE
function addStar(event){
    //set coordonnées pour la nouvelle étoile
    const x = getRandomInt( window.innerWidth ) - offsetX;
    const y = getRandomInt( window.innerHeight ) - offsetY;

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;
    const starSize = parseInt(document.getElementById("starSize").value);


    addStarWithInfo(starName, starDesc, starSize, x, y);

    closeCreateGui();
    INVISIBLE.classList.add("hidden"); 
}

function addStarWithInfo(Sname, Sdesc, Ssize, x, y){
    const starDiv = document.createElement("div");
    starDiv.classList.add("starDiv");
    starDiv.style.position = "fixed";
    //set coordonnées pour la nouvelle étoile
    starDiv.style.left = `${x}px`;
    starDiv.style.top = `${y}px`;

    const newStar = document.createElement("img");
    newStar.classList.add("star");
    newStar.src = "../img/etoile.png";
    newStar.style.transform = `scale(${zoom})`;

    switch (getRandomInt(3)){
        case 0: newStar.classList.add("red"); break;
        case 1: newStar.classList.add("blue"); break;
        case 2: newStar.classList.add("yellow"); break;
        default: newStar.classList.add("white");
    }

    
    // (20 + getRandomInt(30) ).toString() + "px"
    let constSize = numberToSize(Ssize);
    newStar.style.width = `${constSize}px`;
    newStar.style.height = "auto";


    starDiv.appendChild(newStar);

    const starInfo = document.createElement("div");
    starInfo.classList.add("starInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");
    const size = document.createElement("p");
    size.textContent = constSize;
    size.classList.add("hidden");
    
    name.textContent = Sname;
    name.classList.add("starName");
    desc.textContent = Sdesc;
    desc.classList.add("starDesc");

    starInfo.appendChild(name);
    starInfo.appendChild(desc);
    starInfo.appendChild(size);

    starDiv.appendChild(starInfo);
    UNIVERS.appendChild(starDiv);

    starDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentStar = starDiv;
        openStarOptionsList(event.clientX, event.clientY);
    });

    moveStarElement(starDiv); //fait en sorte que l'etoile puisse être déplacé
    
}

function numberToSize(number){
    let constSize = 0;
    switch(number){
        case 1: constSize = 20; break;
        case 2: constSize = 35; break;
        case 3: constSize = 50; break;
        case 4: constSize = 75; break;
        case 5: constSize = 100; break;
        default: constSize = 20;
    }
    return constSize;
}

function numberFromSize(size){
    let constNumber = 0;
    switch(size){
        case 20: constNumber = 1; break;
        case 35: constNumber = 2; break;
        case 50: constNumber = 3; break;
        case 75: constNumber = 4; break;
        case 100: constNumber = 5; break;
        default: constNumber = 1;
    }
    return constNumber;
}

let currentStar;
function editStar(event){
    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;
    const starSize = document.getElementById("starSize").value;

    const ptag = currentStar.getElementsByTagName("p");
    ptag[0].textContent = starName;
    ptag[1].textContent = starDesc;
    ptag[2].textContent = numberToSize(parseInt(starSize));

    currentStar.getElementsByTagName("img")[0].style.width = `${ptag[2].textContent}px`;

    closeEditStar();
    INVISIBLE.classList.add("hidden"); 
}


function removeStar(event){
    currentStar.remove();
    closeStarOptionsList();
    INVISIBLE.classList.add("hidden"); 
}

/**
 * DRAGGABLE PART
 */

function moveStarElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (!movable) return;
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