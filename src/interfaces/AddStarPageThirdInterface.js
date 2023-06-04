class thirdPageAddStar extends Interface {
    static page = '' + 
    '<div class="ui" id="starui3">' + 
    '        <header>' + 
    '            <p>Add Star</p>' + 
    '            <p>Add some photos to spice up those memories</p>' + 
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
    '                    <div id="carousel-content">' + 
    '' + 
    '                    </div>' + 
    '                    <button id="prev">' + 
    '                        <svg' + 
    '                          xmlns="http://www.w3.org/2000/svg"' + 
    '                          width="24"' + 
    '                          height="24"' + 
    '                          viewBox="0 0 24 24"' + 
    '                        >' + 
    '                          <path fill="none" d="M0 0h24v24H0V0z" />' + 
    '                          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />' + 
    '                        </svg>' + 
    '                      </button>' + 
    '                      <button id="next">' + 
    '                        <svg' + 
    '                          xmlns="http://www.w3.org/2000/svg"' + 
    '                          width="24"' + 
    '                          height="24"' + 
    '                          viewBox="0 0 24 24"' + 
    '                        >' + 
    '                          <path fill="none" d="M0 0h24v24H0V0z" />' + 
    '                          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />' + 
    '                        </svg>' + 
    '                      </button>' + 
    '                </div>' + 
    '' + 
    '' + 
    '                <footer class="pictureOption">' + 
    '                    <button>remove</button>' + 
    '                    <input id="file-picture" type="file" name="file-picture[]" onchange="handleImageUpload()"></input>' + 
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

        const PREVIOUS = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("previous")[0];
        PREVIOUS.addEventListener("click", (event) => this.goToSecondPage());

        const SUBMIT = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("next")[0];
        if (this.#editing) SUBMIT.textContent = "Edit Star";
        SUBMIT.addEventListener("click", (event) => this.submit());


        const FIRSTBUTTON = document.getElementById("1");
        FIRSTBUTTON.addEventListener("click", (event) => this.goToFirstPage());

        
        const SECONDBUTTON = document.getElementById("2");
        SECONDBUTTON.addEventListener("click", (event) => this.goToSecondPage());
        
        this.interfaceElement.getElementsByClassName("btn-close")[0].addEventListener("click", (event)=> this.closeInterface());
    }

    clear(){
    }

    setEditing(editing){
        this.#editing = editing;
    }

    
    getEditing(editing){
        return this.#editing;
    }

    loadChanges(starObject){
    }

    saveChanges(){
    }

    

    goToFirstPage(){
        this.saveChanges();
        this.closeInterface();
        firstPageInterface.openInterface(true);
        firstPageInterface.loadChanges(newStar);
    }
    
    goToSecondPage(){
        this.saveChanges();
        this.closeInterface();
        secondPageInterface.openInterface();
        secondPageInterface.loadChanges(newStar);
    }

    submit(){
        if (this.#editing == false){
            newStar.addElementAnimation();
            newStar.addElement();
            thirdPageAddStar.ajaxAdd(newStar.getName(), newStar.getGalaxyLinked(), newStar.getDescription(), newStar.getSize(), newStar.getX(), newStar.getY(), newStar.getPublicStar());
        }
        else{
            thirdPageAddStar.ajaxEdit(currentStar.getName(), newStar.getName(), currentStar.getGalaxyLinked(), newStar.getGalaxyLinked(), newStar.getDescription(), newStar.getSize(), newStar.getPublicStar());

            currentStar.setName(newStar.getName());
            currentStar.setGalaxyLinked(newStar.getGalaxyLinked());
            currentStar.setDescription(newStar.getDescription());
            currentStar.setSize(newStar.getSize());
            currentStar.setPublicStar(newStar.getPublicStar());

        }   

        this.closeInterface();
    }


    // AJAX
    static ajaxEdit(oldName, newName, oldGalaxy, newGalaxy, starDesc, starSize, publicStar) {
        $.ajax({
            url: "./starDB.php",
            type: "POST",
            data: {
                action: 'edit',
                old_name: oldName,
                new_name: newName,
                old_galaxy: oldGalaxy,
                new_galaxy: newGalaxy,
                descr: starDesc,
                size: starSize,
                public: publicStar
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    static ajaxAdd(Sname, Gname, Sdesc, Ssize, x, y, publicStar) {

        $.ajax({
            url: "./starDB.php",
            type: "POST",
            data: {
                action: 'add',
                name: Sname,
                galaxy_name: Gname,
                descr: Sdesc,
                size: Ssize,
                x: x,
                y: y,
                public: publicStar
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }
}