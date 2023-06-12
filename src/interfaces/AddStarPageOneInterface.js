class firstPageAddStar extends Interface {

    static page = '' +
        '<div class="ui" id="starui">' +
        '        <header>' +
        '            <p class="editTitle">Add Star</p>' +
        '            <p>main information</p>' +
        '' +
        '            <input type="checkbox" id="publicStar">' +
        '            <label class="switch" for="publicStar"></label>' +
        '' +
        '            <button type="button" class="btn-close">close' +
        '            </button>' +
        '        </header>' +
        '        <div class="ui_body">' +
        '' +
        '            <p class="inputText">Star Name</p>' +
        '            <input type="text" name="starName" id="starName" placeholder="name">' +
        '' +
        '            <p class="inputText">Galaxy Linked to the Star</p>' +
        '            <select id="select-galaxy">' +
        '                ' +
        '            </select>' +
        '' +
        '            <p class="inputText">Star Size</p>' +
        '            <form oninput="firstPageAddStar.changePreview()" class="sizeForm">' +
        '                <input type="range" name="size" min="1" max="5" value="3" class="slider" id="starSize">' +
        '            </form>' +
        '' +
        '            <div class="previewContainer">' +
        '                <img src="../img/etoile.png" class="size-3" id="preview">' +
        '            </div>' +
        '        </div>' +
        '' +
        '        <footer class="ui-footer">' +
        '            <div class="selectorPages">' +
        '                <button class="selectPage active" id="1"></button>' +
        '                <button class="selectPage" id="2"></button>' +
        '                <button class="selectPage" id="3"></button>' +
        '            </div>' +
        '            <div class="nextPrevious">' +
        '                <button class="next">Next</button>' +
        '            </div>' +
        '        </footer>' +
        '' +
        '    </div>' +
        '';

    #edit;

    constructor() {
        super("starui", firstPageAddStar.page, true);
    }

    openInterface(editing) {
        super.openInterface();
        this.ajaxGetGalaxies(editing);
       

        const TITLE = document.getElementsByClassName("ui")[0].getElementsByClassName("editTitle")[0];
        if(this.#edit){TITLE.textContent="Edit Star";}

        const NEXT = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("next")[0];
        NEXT.addEventListener("click", (event) => this.goToSecondPage());

        const SECONDBUTTON = document.getElementById("2");
        SECONDBUTTON.addEventListener("click", (event) => this.goToSecondPage());
        
        const THIRDBUTTON = document.getElementById("3");
        THIRDBUTTON.addEventListener("click", (event) => this.goToThirdPage());

        this.interfaceElement.getElementsByClassName("btn-close")[0].addEventListener("click", (event)=> this.closeInterface());
    }

    clear(){
        this.setName("");
        firstPageAddStar.setGalaxy("");
        this.setPublic(false);
        this.setSize(3);
    }


    static changePreview() {
        const PREVIEW = document.getElementById("preview");
        const value = parseInt(document.getElementById("starSize").value);
        Star.changeSize(PREVIEW, value);
    }

    setEdit(edit) {
        this.#edit = edit;
    }

    getPublic() {
        return document.getElementById("publicStar").checked? 1: 0;
    }

    setPublic(bool) {
        document.getElementById("publicStar").checked = (parseInt(bool)==1);
    }

    getName() {
        return document.getElementById("starName").value;
    }

    setName(newName) {
        document.getElementById("starName").value = newName;
    }

    getSize() {
        return document.getElementById("starSize").value;
    }

    setSize(newSize) {
        if (newSize > 5) newSize = 5;
        if (newSize < 0) newSize = 0;
        document.getElementById("starSize").value = newSize;
    }

    getGalaxy(){
        return document.getElementById("select-galaxy").value;
    }

    

    removeGalaxyOptions() {
        const SELECTGALAXY = document.getElementById("select-galaxy");
        while (SELECTGALAXY.firstChild) {
            SELECTGALAXY.removeChild(SELECTGALAXY.firstChild);
        }
    }

    

    loadChanges(starObject){
        this.setName(starObject.getName());
        this.setPublic(starObject.getPublicStar());
        this.setSize(starObject.getSize());
    }

    saveChanges(){
        newStar.setName(this.getName());
        newStar.setGalaxyLinked(this.getGalaxy());
        newStar.setPublicStar(this.getPublic());
        newStar.setSize(parseInt(this.getSize()));
    }


    checkFilledInfos(){

    }

    goToSecondPage(){
        this.saveChanges();

        this.closeInterface();
        secondPageInterface.openInterface();
        secondPageInterface.loadChanges(newStar);
    }

    goToThirdPage(){
        this.saveChanges();
        this.closeInterface();
        thirdPageInterface.openInterface();
        thirdPageInterface.loadChanges(newStar);
    }
    

    // AJAX

    ajaxGetGalaxies(starDefined) {
        $.ajax({
           
            url: "DBInterface/starDB.php",
            type: "GET",
            //TODO Trouver moyen de cache
            data: {
                action: "getGalaxies"
            },
            cache: true,
            success: function (response) {
                firstPageAddStar.addGalaxyOptions(JSON.parse(response));
                
                //si en mode edit on modifie la galaxy courante
                if (starDefined) firstPageAddStar.setGalaxy(newStar.getGalaxyLinked());
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });
    }


    static setGalaxy(newGalaxy){
        document.getElementById("select-galaxy").selectedIndex = firstPageAddStar.getGalaxyLinkedNumber(newGalaxy);
    }

    static getGalaxyLinkedNumber(galaxyName){
        const SELECTGALAXY = document.getElementById("select-galaxy");
        const options = SELECTGALAXY.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
            if (options.item(i).textContent.toUpperCase().localeCompare(galaxyName.toUpperCase()) == 0) {
                return i;
            }
        }
        return 0;
    }
    
    static addGalaxyOptions(galaxies) {
        const SELECTGALAXY = document.getElementById("select-galaxy");
        const arrayTmp = galaxies;

        for (let i = 0; i < arrayTmp.length; i++) {
            const option = document.createElement("option");
            option.textContent = arrayTmp[i];

            SELECTGALAXY.appendChild(option);
        }
    }
}