

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showOption(){
    const opts = document.getElementsByClassName("options");

    for (i = 0; i <opts.length; i++) {
        opts.item(i).classList.remove("hidden");
    }

      document.getElementById("circle").classList.add("hidden");
}

function hideOption(){
    const opts = document.getElementsByClassName("options");

    for (i = 0; i <opts.length; i++) {
        opts.item(i).classList.add("hidden");
    }

    document.getElementById("circle").classList.remove("hidden");
    closeStarGui()
}

function openStarGui(){
    const gui = document.getElementById("starMenu");

    gui.classList.remove("hidden");
}

function closeStarGui(){
    const gui = document.getElementById("starMenu");

    gui.classList.add("hidden");
}


function addStar(){
    const starDiv = document.createElement("div");
    starDiv.classList.add("starDiv");
    starDiv.style.position = "fixed";
    starDiv.style.left = getRandomInt(100).toString() + "%" ;
    starDiv.style.top = getRandomInt(100).toString() + "%";

    const newStar = document.createElement("img");

    switch (getRandomInt(3)){
        case 0: newStar.src = "/rsc/etoile1.png"; break;
        case 1: newStar.src = "/rsc/etoile2.png"; break;
        case 2: newStar.src = "/rsc/etoile3.png"; break;
        default: newStar.src = "/rsc/etoile1.png";
    }

    switch (getRandomInt(3)){
        case 0: newStar.classList.add("red"); break;
        case 1: newStar.classList.add("blue"); break;
        case 2: newStar.classList.add("yellow"); break;
        default: newStar.classList.add("white");
    }

    newStar.style.width = (10 + getRandomInt(10) ).toString() + "px";
    newStar.style.height = "auto";



    starDiv.appendChild(newStar);

    const starInfo = document.createElement("div");
    starInfo.classList.add("starInfo");

    const name = document.createElement("p");
    const desc = document.createElement("p");

    starName = document.getElementById("starName").value;
    starDesc = document.getElementById("starDesc").value;

    name.textContent = starName;
    desc.textContent = starDesc;

    starInfo.appendChild(name);
    starInfo.appendChild(desc);

    starDiv.appendChild(starInfo);
    document.getElementById('galaxy').appendChild(starDiv);


    closeStarGui();
}