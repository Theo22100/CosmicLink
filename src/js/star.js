// GUI
const doneMenuButton = document.getElementById("done");

const firstPageInterface =  new firstPageAddStar();
const secondPageInterface =  new secondPageAddStar();
const thirdPageInterface =  new thirdPageAddStar();

let newStar;
function openCreateStarInterface() { //ouvre la fenetre d'edit/ajout d'étoile
    const x = getRandomInt(window.innerWidth) - offsetX;
    const y = getRandomInt(window.innerHeight) - offsetY;
    newStar = new Star("", "", "", 3, false, x, y, []);


    firstPageInterface.openInterface(false);
    firstPageInterface.clear();
    thirdPageInterface.setEditing(false);
}

function openEditStarInterface(){
    newStar = new Star(currentStar.getName(), currentStar.getDescription(), currentStar.getGalaxyLinked(), currentStar.getSize(), currentStar.getPublicStar(), currentStar.getX(), currentStar.getY(), currentStar.getImgLinkArray());

    firstPageInterface.openInterface(true);
    firstPageInterface.loadChanges(newStar);
    thirdPageInterface.setEditing(true);
}



function openCreateStar(event) { //ouvre la fenetre d'edit/ajout d'étoile
    event.stopPropagation();
    closeOption();
    openCreateStarInterface();
    INVISIBLE.classList.add("hidden");
}

function openEditStar(event) {
    closeOption(); //dans le cas ou done est visible on veut le rendre invisible
    closeStarOptionsList();
    openEditStarInterface();
    INVISIBLE.classList.add("hidden");

}


//CONTEXT MENU
const contextMenu = document.getElementById("contextMenu");
function openStarOptionsList(x, y) {
    contextMenu.style.top = y.toString() + "px";
    contextMenu.style.left = x.toString() + "px";
    contextMenu.classList.remove("hidden");

    document.getElementById("edit").onclick = function (event) {
        openEditStar(event)
    };
    document.getElementById("move").onclick = function (event) {
        moveStar(event)
    };
    document.getElementById("link").classList.remove("hidden");
    // document.getElementById("link").onclick = function(event){
    // editStar(event)}; TODO
    document.getElementById("remove").onclick = function (event) {
        removeStar(event)
    };

    onclickoutside(closeStarOptionsList);
}
function closeStarOptionsList() {
    contextMenu.classList.add("hidden");
    INVISIBLE.classList.add("hidden");
}


//action du bouton move dans le contextMenu
let movable = false;
function moveStar(event) {
    INVISIBLE.classList.add("hidden");
    closeStarOptionsList(); // ferme le menu contextuelle
    doneMenuButton.classList.remove("hidden");

    menu.style.width = "auto";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition = ".3s";

    movable = true;
    menu.onclick = function (event) { confirmStarPosition(event) };
}

function confirmStarPosition(event) {
    movable = false;
    closeOption();
    menu.onclick = function (event) { openOption(event) };
}


function addStarWithInfo(starName, galaxy, starDesc, starSize, publicStar, x, y, imgArray) {
    const s = new Star(starName, starDesc, galaxy, starSize, publicStar, x, y, imgArray);
    s.addElement();
}


let currentStar;
function removeStar(event) {
    currentStar.removeElement();
    closeStarOptionsList();
    INVISIBLE.classList.add("hidden");

    const galaxy = currentStar.getGalaxyLinked();
    const star_name = currentStar.getName();
    ajaxRemove(galaxy, star_name);
}

/**
 * DRAGGABLE PART
 */

function moveStarElement(starObject, element) {
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
        let x = element.offsetLeft - pos1;
        let y = element.offsetTop - pos2

        element.style.top = y + "px";
        element.style.left = x + "px";



    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        const x = element.offsetLeft;
        const y = element.offsetTop;
        const star_name = element.getElementsByClassName("starName")[0].textContent;

        const galaxy_name = starObject.getGalaxyLinked();
        ajaxMove(star_name, galaxy_name, x, y);

    }
}

function ajaxMove(Sname, Gname, x, y) {


    $.ajax({
        url: "DBInterface/starDB.php",
        type: "POST",
        data: {
            action: "move",
            name: Sname,
            galaxy_name: Gname,
            x: x,
            y: y
        },
        success: function (response) {
            // Handle the successful response from the server
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });

}

function ajaxRemove(galaxy_name, star_name) {
    $.ajax({
        url: "DBInterface/starDB.php",
        type: "POST",
        data: {
            action: "delete",
            name: star_name,
            galaxy_name: galaxy_name
        },
        success: function (response) {
            // Handle the successful response from the server
            console.log(response);
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });
}

