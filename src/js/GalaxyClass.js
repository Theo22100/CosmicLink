class Galaxy {

    #name;
    #description;
    #x;
    #y;

    #element;

    constructor(name, description, x, y) {
        this.#name = name;
        this.#description = description;
        this.#x = x;
        this.#y = y;

        this.#element = this.toElement();
    }

    toElement() {
        const galaxyDiv = document.createElement("div");
        galaxyDiv.classList.add("galaxyDiv");
        galaxyDiv.style.left = `${this.#x}px`;
        galaxyDiv.style.top = `${this.#y}px`;

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

        name.textContent = this.#name;
        name.classList.add("galaxyName");
        desc.textContent = this.#description;
        desc.classList.add("galaxyDesc");

        galaxyInfo.appendChild(name);
        galaxyInfo.appendChild(desc);

        galaxyDiv.appendChild(galaxyInfo);

        return galaxyDiv;
    }

    addElementAnimation(){
        this.#element.getElementsByClassName("galaxy")[0].style.animationName = "popUpStar";
    }

    addElement() {

        UNIVERS.appendChild(this.#element);
        //listener doivent être mis après le placement de l'élément
        this.#element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            currentGalaxy = this;
            openGalaxyOptionsList(event.clientX, event.clientY);
        });


        moveGalaxyElement(this, this.#element); //fait en sorte que l'etoile puisse être déplacé
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(newX) {
        this.#element.style.left = newX;
        this.#x = newX;
    }

    setY(newY) {
        this.#element.style.top = newY;
        this.#y = newY;
    }

    setName(newName) {
        this.#element.getElementsByTagName("p")[0].textContent = newName;
        this.#name = newName;
    }

    setDescription(newDescription) {
        this.#element.getElementsByTagName("p")[1].textContent = newDescription;
        this.#description = newDescription;
    }


    removeElement() {
        this.#element.remove();
    }

    //private functions
    #getElementName() {
        this.#element.getElementsByTagName("p")[0].value;
    }

    #getElementDescription() {
        this.#element.getElementsByTagName("p")[1].value;
    }

}