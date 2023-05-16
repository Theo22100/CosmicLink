// UI

const gui = document.getElementById("ui");
let editingStar;


function openStarGui(){ //ouvre la fenetre d'edit/ajout d'étoile
    editingStar = false;
    gui.classList.remove("hidden");
}
function closeStarGui(){
    document.getElementById("starName").value = "";
    document.getElementById("starDesc").value = "";
    gui.classList.add("hidden");
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
    editingStar = true;
}

function hideEdit(){
    closeStarGui();
}

function star(){
    if(editingStar){
        editStar();
    }
    else {
        addStar();
    }
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


//

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
    UNIVERS.appendChild(starDiv);

    starDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentStar = starDiv;
        starOptionsList(event.clientX, event.clientY);
    });
    moveStar(starDiv);
    closeStarGui();
}

let currentStar;
function editStar(){

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;

    const ptag = currentStar.getElementsByTagName("p");
    ptag[0].textContent = starName;
    ptag[1].textContent = starDesc;

    hideEdit();
}


function removeStar(){
    currentStar.remove();
    closeStarOptionsList();
}

/**
 * DRAGGABLE PART
 */

function moveStar(element) {
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



