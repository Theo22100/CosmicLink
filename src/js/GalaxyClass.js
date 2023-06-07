class Galaxy {

    #name;
    #description;
    #x;
    #y;

    #element;

    #publicGalaxy;

    constructor(name, description, publicGalaxy, x, y) {
        this.#name = name;
        this.#description = description;
        this.#x = x;
        this.#y = y;
        this.#publicGalaxy = publicGalaxy;

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

        newGalaxy.style.width = 200+ "px";
        newGalaxy.style.height = "auto";

        galaxyDiv.appendChild(newGalaxy);

        const galaxyInfo = document.createElement("div");
        galaxyInfo.classList.add("galaxyInfo");

        const name = document.createElement("p");

        name.textContent = this.#name;
        name.classList.add("galaxyName");

        galaxyInfo.appendChild(name);

        galaxyDiv.appendChild(galaxyInfo);
        return galaxyDiv;
    }

    addElementAnimation(){
        this.#element.getElementsByClassName("galaxy")[0].style.animationName = "popUpStar";
    }

    #delta = 6;
    #startX;
    #startY;
    addElement() {

        UNIVERS.appendChild(this.#element);
        //listener doivent être mis après le placement de l'élément
        this.#element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            currentGalaxy = this;
            openGalaxyOptionsList(event.clientX, event.clientY);
        });


        moveGalaxyElement(this, this.#element); //fait en sorte que l'etoile puisse être déplacé


        this.#element.addEventListener('mousedown', (event) => {
            this.#startX = event.pageX;
            this.#startY = event.pageY;
        });

        this.#element.addEventListener('mouseup', (event) => {
            if(event.button == 2) return;
            const diffX = Math.abs(event.pageX - this.#startX);
            const diffY = Math.abs(event.pageY - this.#startY);

            if (diffX < this.#delta && diffY < this.#delta) { //click
                popUpPage.openInterface();
                popUpPage.loadGalaxyInfo(this);
            }
        });
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

    getPublicGalaxy(){
        return this.#publicGalaxy;
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
        this.#description = newDescription;
    }

    setPublicGalaxy(publicGalaxy){
        this.#publicGalaxy = publicGalaxy;
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