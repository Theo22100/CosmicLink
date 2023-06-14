class thirdPageAddStar extends Interface {
    static page = '' +
        '<div class="ui" id="starui3">' +
        '        <header>' +
        '            <p class="editTitle3">Add Star</p>' +
        '            <p>Add some photos to your star</p>' +
        '' +
        '            <button type="button" class="btn-close">' +
        '                <span class="icon-cross"></span>' +
        '            </button>' +
        '        </header>' +
        '        <div class="ui_body">' +
        '' +
        '            <p class="inputText">Pictures <span>(optional)</span></p>' +
        '            ' +
        '            <div class="pictureDiv">' +
        '' +
        '                <div class="carousel">' +
        '                    <div id="carousel-content"></div>' +
        '                    <button id="caroussel-prev">' +
        '                        <img src="../img/chevron-right.png">' +
        '                    </button>' +
        '                    <button id="caroussel-next">' +
        '                        <img src="../img/chevron-right.png">' +
        '                    </button>' +
        '                </div>' +
        '' +
        '                <footer class="pictureOption">' +
        '                    <button id="file-remove" onclick="thirdPageAddStar.removeCurrent()">remove</button>' +
        '                    <input id="file-picture" type="file" name="file-picture[]"' +
        '                     onchange="thirdPageAddStar.handleImageUpload(this)"></input>' +
        '                    <label class="upload" for="file-picture">' +
        '                        <span>Add</span>' +
        '                    </label>' +
        '                </footer>' +
        '            </div>' +
        '' +
        '        </div>' +
        '        <footer class="ui-footer">' +
        '            <div class="selectorPages">' +
        '                <button class="selectPage" id="1"></button>' +
        '                <button class="selectPage" id="2"></button>' +
        '                <button class="selectPage active" id="3"></button>' +
        '            </div>' +
        '            <div class="nextPrevious">' +
        '                <button class="previous">Previous</button>' +
        '                <button class="next">Add Star</button>' +
        '            </div>' +
        '        </footer>' +
        '' +
        '    </div>' +
        '';

    #editing;

    constructor() {
        super("starui3", thirdPageAddStar.page, true);
    }

    openInterface() {
        super.openInterface();


       

        const TITLE = document.getElementsByClassName("ui")[0].getElementsByClassName("editTitle3")[0];
        if(this.#editing)TITLE.textContent="Edit Star";

        const PREVIOUS = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("previous")[0];
        PREVIOUS.addEventListener("click", (event) => this.goToSecondPage());

        const SUBMIT = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("next")[0];
        if (this.#editing) SUBMIT.textContent = "Edit Star";
        SUBMIT.addEventListener("click", (event) => this.submit());


        const FIRSTBUTTON = document.getElementById("1");
        FIRSTBUTTON.addEventListener("click", (event) => this.goToFirstPage());


        const SECONDBUTTON = document.getElementById("2");
        SECONDBUTTON.addEventListener("click", (event) => this.goToSecondPage());

        this.interfaceElement.getElementsByClassName("btn-close")[0].addEventListener("click", (event) => this.closeInterface());



        const prev = document.getElementById("caroussel-prev");
        const next = document.getElementById("caroussel-next");
        next.addEventListener("click", (event) => this.nextCarousel());
        prev.addEventListener("click", (event) => this.previousCarousel());

        thirdPageAddStar.updateMovingButton();
    }

    clear() {
    }

    setEditing(editing) {
        this.#editing = editing;
    }

    getEditing(editing) {
        return this.#editing;
    }

    loadChanges(starObject) {
        const imgArray = starObject.getImgLinkArray();
        for(let i =  0;  i  < imgArray.length; i++){
            thirdPageAddStar.addImage(imgArray[i],i);
        }
        thirdPageAddStar.updateMovingButton();
    }

    saveChanges() {
    }



    goToFirstPage() {
        this.saveChanges();
        this.closeInterface();
        firstPageInterface.openInterface(true);
        firstPageInterface.loadChanges(newStar);
    }

    goToSecondPage() {
        this.saveChanges();
        this.closeInterface();
        secondPageInterface.openInterface();
        secondPageInterface.loadChanges(newStar);
    }

    submit() {
        if (this.#editing == false) {
            newStar.addElementAnimation();
            newStar.addElement();
            // console.log("submit new imageArray: " + newStar.getImgLinkArray());
            thirdPageAddStar.ajaxAdd(newStar.getName(), newStar.getGalaxyLinked(), newStar.getDescription(), newStar.getSize(), newStar.getX(), newStar.getY(), newStar.getPublicStar(), newStar.getImgLinkArray(), newStar);
            
            
        
        }
        else {
            thirdPageAddStar.ajaxEdit(newStar.getName(), newStar.getGalaxyLinked(), newStar.getDescription(), newStar.getSize(), newStar.getPublicStar(), newStar.getImgLinkArray(), newStar, currentStar.getId());

            currentStar.setName(newStar.getName());
            currentStar.setGalaxyLinked(newStar.getGalaxyLinked());
            currentStar.setDescription(newStar.getDescription());
            currentStar.setSize(newStar.getSize());
            currentStar.setPublicStar(newStar.getPublicStar());
            // console.log("newStar.getImgLinkArray(): " + newStar.getImgLinkArray());
            currentStar.setImgLinkArray(newStar.getImgLinkArray());
        }

        this.closeInterface();
    }

    //carousel images

    static handleImageUpload(input) {
        const carouselContent = document.getElementById("carousel-content");

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            let currentID = 0;
            if (carouselContent.childElementCount > 0) {
                const currentImg = document.querySelector('[data-status="active"]');
                currentID = parseInt(currentImg.getAttribute('data-index'));
            }

            reader.onload = function (e) {
                thirdPageAddStar.addImage(e.target.result, currentID);
                newStar.addImgLinkArray(e.target.result, currentID);
            }
            reader.readAsDataURL(input.files[0]);
        }


    }

    static addImage(link, id) {
        const carouselContent = document.getElementById("carousel-content");

        const newImg = document.createElement("img");
        newImg.setAttribute("data-index", id);
        newImg.src = link;

        //remove old image display
        if (carouselContent.childElementCount > 0) document.querySelector('[data-status="active"]').setAttribute("data-status", "inactive");


        newImg.setAttribute("data-status", "active");

        for (let i = 0; i < carouselContent.childElementCount; i++) {
            const currentIndex = parseInt(carouselContent.children[i].getAttribute("data-index"));
            if (currentIndex >= id) {
                carouselContent.children[i].setAttribute("data-index", (currentIndex + 1));
            }
        }

        carouselContent.appendChild(newImg);
        thirdPageAddStar.updateMovingButton();
    }

    static removeCurrent() {

        const carouselContent = document.getElementById("carousel-content");
        if (carouselContent.childElementCount == 0) return;

        const currentImg = document.querySelector('[data-status="active"]');
        const currentID = parseInt(currentImg.getAttribute('data-index'));
        
        newStar.removeImgLinkArray(currentImg.src);
        currentImg.remove();


        let changedCurrent = false;
        for (let i = 0; i < carouselContent.childElementCount; i++) {
            const currentIndex = parseInt(carouselContent.children[i].getAttribute("data-index"));

            if (currentIndex > currentID) {
                if (!changedCurrent) {
                    carouselContent.children[i].setAttribute("data-status", "active");
                    changedCurrent = true;
                }
                carouselContent.children[i].setAttribute("data-index", (currentIndex - 1));
            }
        }

        if (!changedCurrent && currentID > 0) {
            document.querySelector('[data-index="' + (currentID - 1) + '"]').setAttribute("data-status", "active");
        }

        thirdPageAddStar.updateMovingButton();
    }


    nextCarousel() {
        const imgContainer = document.getElementById("carousel-content");
        const currentImg = document.querySelector('[data-status="active"]');
        let idImg = currentImg.getAttribute('data-index');
        let nextId = parseInt(idImg) + 1;

        if (nextId > (imgContainer.childElementCount - 1)) return;

        const nextImg = document.querySelector('[data-index="' + nextId + '"]');

        nextImg.setAttribute("data-status", "active");
        currentImg.setAttribute("data-status", "inactive");

        thirdPageAddStar.updateMovingButton();
    }

    previousCarousel() {
        const currentImg = document.querySelector('[data-status="active"]');
        let idImg = currentImg.getAttribute('data-index');
        let nextId = parseInt(idImg) - 1;

        if (nextId < 0) return;

        const nextImg = document.querySelector('[data-index="' + nextId + '"]');

        nextImg.setAttribute("data-status", "active");
        currentImg.setAttribute("data-status", "inactive");

        thirdPageAddStar.updateMovingButton();
    }

    static updateMovingButton() {
        const prev = document.getElementById("caroussel-prev");
        const next = document.getElementById("caroussel-next");

        const imgContainer = document.getElementById("carousel-content");
        if (imgContainer.childElementCount == 0) {
            prev.style.visibility = "hidden";
            next.style.visibility = "hidden";
            return;
        }
        prev.style.visibility = "visible";
        next.style.visibility = "visible";

        const currentImgID = parseInt(document.querySelector('[data-status="active"]').getAttribute('data-index'));

        if (currentImgID == 0) {
            prev.style.visibility = "hidden";
        }

        if (currentImgID == (imgContainer.childElementCount - 1)) {
            next.style.visibility = "hidden";
        }
    }

    // AJAX
    static ajaxEdit(newName, newGalaxy, starDesc, starSize, publicStar, linkArray, newStar, starId) {
        const tets= JSON.stringify(linkArray);
        $.ajax({
            url: "./univers/star/starDB.php",
            type: "POST",
            data: {
                action: 'edit',
                new_name: newName,
                size: starSize,
                descr: starDesc,
                new_galaxy: newGalaxy,
                public: publicStar,
                arrayLink: tets,
                starID: starId
            },
            success: function (response) {
                console.log(response);
                const responDict = JSON.parse(response);
                console.log("responDict: " + responDict);
                console.log("debug: "+ responDict['debug']);
                if(  responDict["status"] == "success"){
                    const newArray = responDict["data"];
                    newStar.setImgLinkArray(newArray);
                }

                if( responDict["status"] == "failed"){
                    console.log(responDict["data"]);
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    static ajaxAdd(Sname, Gname, Sdesc, Ssize, x, y, publicStar, linkArray, newStar) {
        const tets= JSON.stringify(linkArray);
        $.ajax({
            url: "./univers/star/starDB.php",
            type: "POST",
            data: {
                action: 'add',
                name: Sname,
                galaxy_name: Gname,
                descr: Sdesc,
                size: Ssize,
                x: x,
                y: y,
                public: publicStar,
                arrayLink: tets
            },
            success: function (response) {
                const responDict = JSON.parse(response);
                if(  responDict["status"] == "success"){
                    const newArray = responDict["data"];
                    const starID = responDict["starID"];
                    console.log("starID: " + starID);
                    newStar.setId(starID);
                    newStar.setImgLinkArray(newArray);
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }
}