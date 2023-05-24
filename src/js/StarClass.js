class Star {

    #name;
    #description;
    #galaxyLinked;
    #size;
    #x;
    #y;

    #element;

    constructor(name, description, galaxyLinked, size, x, y) {
        this.#name = name;
        this.#description = description;
        this.#galaxyLinked = galaxyLinked;
        this.#size = size;
        this.#x = x;
        this.#y = y;

        this.#element = this.toElement();
    }

    toElement() {
        const starDiv = document.createElement("div");
        starDiv.classList.add("starDiv");
        starDiv.style.left = `${this.#x}px`;
        starDiv.style.top = `${this.#y}px`;

        const newStar = document.createElement("img");
        newStar.classList.add("star");
        newStar.classList.add(Star.numberToSize(this.#size));
        newStar.src = "../img/etoile.png";
        newStar.style.transform = `scale(${zoom})`;

        switch (getRandomInt(3)) {
            case 0: newStar.classList.add("red"); break;
            case 1: newStar.classList.add("blue"); break;
            case 2: newStar.classList.add("yellow"); break;
            default: newStar.classList.add("white");
        }
        starDiv.appendChild(newStar);


        const starInfo = document.createElement("div");
        starInfo.classList.add("starInfo");

        const name = document.createElement("p");
        const desc = document.createElement("p");
        // const linkedGalaxy = document.createElement("p");

        name.textContent = this.#name;
        name.classList.add("starName");
        desc.textContent = this.#description;
        desc.classList.add("starDesc");

        // linkedGalaxy.textContent = this.#galaxyLinked;

        starInfo.appendChild(name);
        starInfo.appendChild(desc);
        // starInfo.appendChild(linkedGalaxy);

        starDiv.appendChild(starInfo);

        moveStarElement(starDiv);

        return starDiv;
    }

    addElement() {

        UNIVERS.appendChild(this.#element);
        //listener doivent être mis après le placement de l'élément
        this.#element.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            currentStar = this;
            openStarOptionsList(event.clientX, event.clientY);
        });


        moveStarElement(this.#element); //fait en sorte que l'etoile puisse être déplacé
    }

    getSize() {
        return this.#size;
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

    getGalaxyLinked() {
        return this.#galaxyLinked;
    }

    getGalaxyLinkedName() {
        const select = document.getElementById("select-galaxy");
        return select.options[this.#galaxyLinked].text;
    }


    setSize(newSize) {
        const img = this.#element.getElementsByTagName("img")[0];
        Star.changeSize(img, parseInt(newSize));

        console.log(newSize);

        this.#size = parseInt(newSize);
    }

    setX(newX) {
        this.#element.style.left = newX;
        this.#x = newX;
    }

    setY(newY) {
        this.#element.style.top = newY;
        this.#y = newY;
    }

    setGalaxyLinked(newGalaxy) {
        this.#galaxyLinked = newGalaxy;
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

    #getElementSize() {
        this.#element.getElementsByTagName("img")[0];

        if (img.classList.contains("size-1")) return 1;
        if (img.classList.contains("size-2")) return 2;
        if (img.classList.contains("size-3")) return 3;
        if (img.classList.contains("size-4")) return 4;
        if (img.classList.contains("size-5")) return 5;
        return 1;
    }

    #getElementName() {
        this.#element.getElementsByTagName("p")[0].value;
    }

    #getElementDescription() {
        this.#element.getElementsByTagName("p")[1].value;
    }


    //GLOBAL FUNCTION

    static changeSize(img, newSize) {
        img.classList.remove("size-1");
        img.classList.remove("size-2");
        img.classList.remove("size-3");
        img.classList.remove("size-4");
        img.classList.remove("size-5");

        img.classList.add(Star.numberToSize(newSize));
    }

    static numberToSize(number) {
        let constSize = 0;
        switch (number) {
            case 1: constSize = "size-1"; break;
            case 2: constSize = "size-2"; break;
            case 3: constSize = "size-3"; break;
            case 4: constSize = "size-4"; break;
            case 5: constSize = "size-5"; break;
            default: constSize = "size-1";
        }
        return constSize;
    }
}