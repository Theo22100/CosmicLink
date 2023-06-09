class Star {

    #id;

    #name;
    #description;
    #galaxyLinked;
    #size;
    #x;
    #y;
    #publicStar;

    #imgLinkArray;

    #element;

    constructor(name, description, galaxyLinked, size, publicStar, x, y, imgLinkArray) {
        this.#name = name;
        this.#description = description;
        this.#galaxyLinked = galaxyLinked;
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#publicStar = publicStar;
        this.#element = this.toElement();

        // console.log("imgLinkArray: " + imgLinkArray);
        this.#imgLinkArray = imgLinkArray;
    }

    toElement() {
        const starDiv = document.createElement("div");
        starDiv.classList.add("starDiv");
        starDiv.style.left = `${this.#x}px`;
        starDiv.style.top = `${this.#y}px`;

        const newStar = document.createElement("img");
        newStar.classList.add("stars");
        newStar.classList.add(Star.numberToSize(this.#size));
        newStar.src = "../img/etoile.png";
        newStar.style.transform = `scale(${zoom})`;
        starDiv.appendChild(newStar);

        newStar.animate(
            this.blinkingAnimation(),
            this.blinkingOption((getRandomInt(2000) + 3000))
        );



        const starInfo = document.createElement("div");
        starInfo.classList.add("starInfo");

        const name = document.createElement("p");
        name.textContent = this.#name;
        name.classList.add("starName");

        starInfo.appendChild(name);

        starDiv.appendChild(starInfo);

        return starDiv;
    }

    blinkingAnimation() {
        let minOpacity;
        switch (getRandomInt(5)) {
            case 1: minOpacity = 0.2; break;
            case 2: minOpacity = 0.4; break;
            case 3: minOpacity = 0.5; break;
            case 3: minOpacity = 0.6; break;
            case 4: minOpacity = 0.8; break;
            default: minOpacity = 0.5;
        };

        return [
            { opacity: "1" },
            { opacity: "0.3" },
            { opacity: "1" }
        ];
    }

    blinkingOption(setduration) {
        return {
            duration: setduration,
            iterations: Infinity,
        };
    }



    addElementAnimation() {
        this.#element.getElementsByClassName("stars")[0].style.animationName = "popUpStar";
    }


    #delta = 6;
    #startX;
    #startY;
    addElement() {

        UNIVERS.appendChild(this.#element);
        //listener doivent être mis après le placement de l'élément
        if(window.location.href.endsWith("home.php")){
            this.#element.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                currentStar = this;
                contextMenuPage.openStarOptionsList(event.clientX, event.clientY);
            });
        }
        


        moveStarElement(this, this.#element); //fait en sorte que l'etoile puisse être déplacé


        this.#element.addEventListener('mousedown', (event) => {
            this.#startX = event.pageX;
            this.#startY = event.pageY;
        });

        this.#element.addEventListener('mouseup', (event) => {
            if(event.button == 2) return;
            const diffX = Math.abs(event.pageX - this.#startX);
            const diffY = Math.abs(event.pageY - this.#startY);

            if (diffX < this.#delta && diffY < this.#delta) { //click
                if( this.#description.length == 0 && this.#imgLinkArray.length == 0) return;
                popUpPage.openInterface();
                popUpPage.loadStarInfo(this);
            }
        });


        if(zoom > 0.7) this.#element.style.visibility = "visible";
        else this.#element.style.visibility = "hidden";

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

    getGalaxyLinkedNumber() {
        const select = document.getElementById("select-galaxy");
        const options = document.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
            if (options.item(i).textContent.toUpperCase().localeCompare(this.#galaxyLinked.toUpperCase()) == 0) {
                return i;
            }
        }
        return 0;
    }

    getPublicStar() {
        return this.#publicStar;
    }


    setSize(newSize) {
        const img = this.#element.getElementsByTagName("img")[0];
        Star.changeSize(img, parseInt(newSize));

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
        this.#description = newDescription;
    }

    setPublicStar(newpublicStar) {
        this.#publicStar = newpublicStar;
    }

    removeElement() {
        this.#element.remove();
    }

    getImgLinkArray() {
        return this.#imgLinkArray;
    }

    setImgLinkArray(newImgLinkArray) {
        this.#imgLinkArray = newImgLinkArray;
    }

    setId(newId) {
        this.#id = newId;
    }

    getId() {
        return this.#id;
    }

    addImgLinkArray(newLink, id) {
        this.#imgLinkArray.splice(parseInt(id), 0, newLink);
    }

    removeImgLinkArray(link) {
        const index = this.#imgLinkArray.indexOf(link);

        this.#imgLinkArray.splice(index, 1);
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