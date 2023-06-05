// GUI

const galaxyPageInterface =  new pageAddGalaxy();

let newGalaxy;
function openCreateGalaxy(event){ //ouvre la fenetre d'edit/ajout d'étoile
    event.stopPropagation();
    closeOption();

    const x = getRandomInt(window.innerWidth) - offsetX;
    const y = getRandomInt(window.innerHeight) - offsetY;
    newGalaxy = new Galaxy("", "", false, x, y);

    galaxyPageInterface.openInterface(false);
    INVISIBLE.classList.add("hidden");
}

function openEditGalaxy(event){
    closeOption(); //dans le cas ou done est visible on veut le rendre invisible
    closeGalaxyOptionsList();

    newGalaxy = new Galaxy(currentGalaxy.getName(), currentGalaxy.getDescription(), currentGalaxy.getPublicGalaxy(), currentGalaxy.getX(), currentGalaxy.getY());

    galaxyPageInterface.openInterface(true);
    galaxyPageInterface.loadChanges(newGalaxy);
    INVISIBLE.classList.add("hidden");
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
    doneMenuButton.classList.remove("hidden");

    menu.style.width = "auto";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition= ".3s";

    movableG = true;
    menu.onclick = function(event){confirmGalaxyPosition(event)};

}

function confirmGalaxyPosition(event){
    movableG = false;
    closeOption();
    menu.onclick = function(event){ openOption(event)};
}


function addGalaxyWithInfo(gName, gDesc, publicGalaxy, x, y){
    const s = new Galaxy(gName, gDesc, publicGalaxy, x, y);
    s.addElement();
}


let currentGalaxy;

function removeGalaxy(){
    currentGalaxy.removeElement();
    closeGalaxyOptionsList();
    INVISIBLE.classList.add("hidden"); 
    ajaxGRemove(currentGalaxy.getName());
}

/**
 * DRAGGABLE PART
 */

function moveGalaxyElement(galaxyObject, element) {
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

        const x = element.offsetLeft;
        const y = element.offsetTop;
        const galaxy_name = galaxyObject.getName();
        ajaxGMove(galaxy_name, x, y);
        // console.log(galaxyObject.getGalaxyLinked());
        //c'est comme ça que tu récupère la galaxy liée 
    }
}


function deleteStarLinkedToGalaxy(starNameArray){
    for(let i = 0; i < starNameArray.length; i++){

        const starNameElement =getElementsByText(starNameArray[i], "starName");

        //nom de l'étoile introuvable
        if (starNameElement.length == 0) continue;
        
        
        for(let j = 0; j < starNameElement.length; j++){
            const starDiv = starNameElement[j].parentNode.parentNode;
            starDiv.remove();
        }
        
    }
}

function getElementsByText(str, tag) {
    return Array.prototype.slice.call(document.getElementsByClassName(tag)).filter(el => el.textContent.trim() === str.trim());
  }



function ajaxGMove(Gname, x, y) {

    $.ajax({
        url: "DBInterface/galaxyDB.php",
        type: "POST",
        data: {
            action: "move",
            name: Gname,
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

function ajaxGRemove(galaxy_name) {
    $.ajax({
        url: "DBInterface/galaxyDB.php",
        type: "POST",
        data: {
            action: "delete",
            name: galaxy_name
        },
        success: function (response) {
            // Handle the successful response from the server
            const deletedStars = JSON.parse(response);
            deleteStarLinkedToGalaxy(deletedStars);
            
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });
}