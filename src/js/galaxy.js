function galaxy(){
    if (edit){
        editGalaxy();
    }
    else {
        addGalaxy();
    }
}

function addGalaxy(){
    const galaxyDiv = document.createElement("div");
    galaxyDiv.classList.add("galaxyDiv");
    galaxyDiv.style.position = "fixed";
    galaxyDiv.style.left = (getRandomInt(100)).toString() + "%" ;
    galaxyDiv.style.top = (getRandomInt(90)).toString() + "%";

    const newGalaxy = document.createElement("img");
    newGalaxy.classList.add("galaxy");
    newGalaxy.src = "../img/galaxy.png";

    switch (getRandomInt(3)){
        case 0: newGalaxy.classList.add("red"); break;
        case 1: newGalaxy.classList.add("blue"); break;
        case 2: newGalaxy.classList.add("yellow"); break;
        default: newGalaxy.classList.add("white");
    }

    newGalaxy.style.width = (20 + getRandomInt(30) ).toString() + "px";
    newGalaxy.style.height = "auto";


    galaxyDiv.appendChild(addGalaxy);

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
    document.getElementById('universe').appendChild(galaxyDiv);

    galaxyDiv.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        currentStar = galaxyDiv;
        starOptionsList(event.clientX, event.clientY);
    });
    dragElement(galaxyDiv);
    closeGalaxyGui();
}

function editGalaxy(){

    const galaxyName = document.getElementById("galaxyName").value;
    const galaxyDesc = document.getElementById("galaxyDesc").value;

    const ptag = currentStar.getElementsByTagName("p");
    ptag[0].textContent = galaxyName;
    ptag[1].textContent = galaxyDesc;

    hideEdit();
}

function openGalaxyGui(){
    edit = false;
    gui.classList.remove("hidden");
}

function closeGalaxyGui(){
    document.getElementById("galaxyName").value = "";
    document.getElementById("galaxyDesc").value = "";
    gui.classList.add("hidden");
}