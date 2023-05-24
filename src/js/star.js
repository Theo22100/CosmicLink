// GUI

const starGui = document.getElementById("ui");
const doneButton = starGui.getElementsByTagName("button")[0]; //quand edit/add
const doneMenuButton = document.getElementById("done");

function openCreateStar(event) { //ouvre la fenetre d'edit/ajout d'étoile
    addGalaxyOptions();
    event.stopPropagation();
    closeOption();
    starGui.classList.remove("hidden");

    doneButton.onclick = function (event) {
        INVISIBLE.classList.add("hidden");
        addStar(event)
    };

    onclickoutside(closeCreateGui);
}

function closeCreateGui() {
    INVISIBLE.classList.add("hidden");
    document.getElementById("starName").value = "";
    document.getElementById("starDesc").value = "";
    document.getElementById("starSize").value = 3;
    starGui.classList.add("hidden");
    removeGalaxyOptions();
}


function openEditStar(event) {
    addGalaxyOptions();
    closeOption(); //dans le cas ou done est visible on veut le rendre invisible
    closeStarOptionsList();
    starGui.classList.remove("hidden");

    document.getElementById("starName").value = currentStar.getName();
    document.getElementById("starDesc").value = currentStar.getDescription();
    document.getElementById("starSize").value = currentStar.getSize();
    document.getElementById("select-galaxy").value = currentStar.getGalaxyLinked();

    doneButton.onclick = function (event) {
        editStar(event)
    };
    onclickoutside(closeEditStar);
}

function closeEditStar() {
    closeCreateGui();
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
    menu.onclick = function(event){confirmStarPosition(event)};
}

function confirmStarPosition(event) {
    movable = false;
    closeOption();
    menu.onclick = function(event){ openOption(event)};
}


const PREVIEW = document.getElementById("preview");

function changePreview() {
    const value = parseInt(document.getElementById("starSize").value);
    Star.changeSize(PREVIEW, value);
}

const SELECTGALAXY = document.getElementById("select-galaxy");
function addGalaxyOptions() {
    const arrayTmp = ["1", "2", "3", "4", "5"];

    for (let i = 0; i < arrayTmp.length; i++) {
        const option = document.createElement("option");
        option.textContent = arrayTmp[i];

        SELECTGALAXY.appendChild(option);
    }
}

function removeGalaxyOptions() {
    while (SELECTGALAXY.firstChild) {
        SELECTGALAXY.removeChild(SELECTGALAXY.firstChild);
    }
}


//FONCTION NON GRAPHIQUE
function addStar(event) {
    //set coordonnées pour la nouvelle étoile
    const x = getRandomInt(window.innerWidth) - offsetX;
    const y = getRandomInt(window.innerHeight) - offsetY;

    const starName = document.getElementById("starName").value;
    const starDesc = document.getElementById("starDesc").value;
    const starSize = parseInt(document.getElementById("starSize").value);

    //recupère le nom de la galaxy liée a l'étoile
    const select = document.getElementById("select-galaxy");
    const galaxy = select.options[select.value].text;

    const s = new Star(starName, starDesc, galaxy, starSize, x, y);
    s.addElementAnimation();
    s.addElement();

    closeCreateGui();
    INVISIBLE.classList.add("hidden");
    ajaxAdd(starName, starDesc, starSize, x, y);
}

function addStarWithInfo(starName, galaxy, starDesc, starSize, x, y) {
    const s = new Star(starName, starDesc, galaxy, starSize, x, y);    
    s.addElement();
}




let currentStar;
function editStar(event) {
    currentStar.setName(document.getElementById("starName").value);
    currentStar.setDescription(document.getElementById("starDesc").value);
    currentStar.setSize(document.getElementById("starSize").value);
    currentStar.setGalaxyLinked(document.getElementById("select-galaxy").value);

    closeEditStar();
    INVISIBLE.classList.add("hidden");
}

function removeStar(event) {
    currentStar.removeElement();
    closeStarOptionsList();
    INVISIBLE.classList.add("hidden");
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

        let x = element.offsetLeft;
        let y = element.offsetTop;
        const star_name = element.getElementsByClassName("starName")[0].textContent;

        ajaxMove(star_name, x, y);


        // console.log(starObject.getGalaxyLinked());
        //c'est comme ça que tu récupère la galaxy liée 
    }
}

function ajaxAdd(Sname, Sdesc, Ssize,x,y){
    
    $.ajax({
        url: "starDB.php",
        type: "POST",
        data: {
          action : 'add',
          name : Sname,
          descr : Sdesc,
          size : Ssize,
          x: x,
          y: y
        },
        success: function(response) {
          // Handle the successful response from the server
          console.log(response);
        },
        error: function(xhr, status, error) {
          // Handle errors
          console.error(error);
        }
      });
}

function ajaxMove(Sname, x, y){


    $.ajax({
        url: "starDB.php",
        type: "POST",
        data: {
          action : "move",
          name : Sname,
          x: x,
          y: y
        },
        success: function(response) {
          // Handle the successful response from the server
          console.log(response);
        },
        error: function(xhr, status, error) {
          // Handle errors
          console.error(error);
        }
      });
    
}
