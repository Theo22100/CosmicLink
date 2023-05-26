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

    document.getElementById("galaxyName").value = currentGalaxy.getName();
    document.getElementById("galaxyDesc").value = currentGalaxy.getDescription();

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

//

function addGalaxy(event){
    //set coordonnées pour la nouvelle galaxy
    const x = getRandomInt( window.innerWidth ) - offsetX;
    const y = getRandomInt( window.innerHeight ) - offsetY;

    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    const s = new Galaxy(galaxyName, galaxyDesc, x, y);
    s.addElementAnimation();
    s.addElement();

    closeGalaxyGui();
    INVISIBLE.classList.add("hidden"); 

    ajaxGAdd(galaxyName,galaxyDesc,x,y);
}


function addGalaxyWithInfo(gName, gDesc, x, y){
    const s = new Galaxy(gName, gDesc, x, y);
    s.addElement();
}


let currentGalaxy;
function editGalaxy(event){
    let oldName = currentGalaxy.getName();
    let newName = document.getElementById("galaxyName").value;
    let descr = document.getElementById("galaxyDesc").value;
    currentGalaxy.setName(newName);
    currentGalaxy.setDescription(descr);

    closeEditGalaxy();
    INVISIBLE.classList.add("hidden"); 

    ajaxGEdit(oldName,newName,descr);
}


function removeGalaxy(){
    currentGalaxy.removeElement();
    closeGalaxyOptionsList();
    INVISIBLE.classList.add("hidden"); 
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

        
        // console.log(galaxyObject.getGalaxyLinked());
        //c'est comme ça que tu récupère la galaxy liée 
    }
}

function ajaxGAdd(Gname, Gdesc, x, y) {

    $.ajax({
        url: "galaxyDB.php",
        type: "POST",
        data: {
            action: 'add',
            name: Gname,
            descr: Gdesc,
            x: x,
            y: y
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function ajaxGMove(Gname, x, y) {

    $.ajax({
        url: "galaxyDB.php",
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
        url: "galaxyDB.php",
        type: "POST",
        data: {
            action: "delete",
            name: galaxy_name
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

function ajaxGEdit(oldName, newName, galaxyDesc){
    $.ajax({
        url: "galaxyDB.php",
        type: "POST",
        data: {
            action: 'edit',
            old_name: oldName,
            new_name: newName,
            descr: galaxyDesc
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}