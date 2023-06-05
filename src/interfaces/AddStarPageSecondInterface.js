class secondPageAddStar extends Interface {
    static page = '' +
        '<div class="ui" id="starui2">' +
        '        <header>' +
        '            <p>Add Star</p>' +
        '            <p>Add some details to your star</p>' +
        '' +
        '            <button type="button" class="btn-close">' +
        '                <span class="icon-cross"></span>' +
        '            </button>' +
        '        </header>' +
        '        <div class="ui_body">' +
        '' +
        '            <p class="inputText">Star description <span>(optional)</span></p>' +
        '            <textarea  id="starDesc"  placeholder="Describe your star here..."></textarea>' +
        '            ' +
        '' +
        '        </div>' +
        '        <footer class="ui-footer">' +
        '            <div class="selectorPages">' +
        '                <button class="selectPage" id="1"></button>' +
        '                <button class="selectPage active" id="2"></button>' +
        '                <button class="selectPage" id="3"></button>' +
        '            </div>' +
        '            <div class="nextPrevious">' +
        '                <button class="previous">Previous</button>' +
        '                <button class="next">Next</button>' +
        '            </div>' +
        '        </footer>' +
        '' +
        '    </div>' +
        '';

    constructor() {
        super("starui2", secondPageAddStar.page, true);
    }

    openInterface() {
        super.openInterface();

        const PREVIOUS = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("previous")[0];
        PREVIOUS.addEventListener("click", (event) => this.goToFirstPage());

        const NEXT = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("next")[0];
        NEXT.addEventListener("click", (event) => this.goToThirdPage());

        const FIRSTBUTTON = document.getElementById("1");
        FIRSTBUTTON.addEventListener("click", (event) => this.goToFirstPage());
        
        const THIRDBUTTON = document.getElementById("3");
        THIRDBUTTON.addEventListener("click", (event) => this.goToThirdPage());

        this.interfaceElement.getElementsByClassName("btn-close")[0].addEventListener("click", (event)=> this.closeInterface());
    }

    clear(){
        this.setDescription("");
    }

    getDescription() {
        return document.getElementById("starDesc").value;
    }

    setDescription(desc) {
        document.getElementById("starDesc").value = desc;
    }


    loadChanges(starObject){
        this.setDescription(starObject.getDescription());
    }

    saveChanges(){
        newStar.setDescription(this.getDescription());
    }

    goToFirstPage(){
        this.saveChanges();
        this.closeInterface();
        firstPageInterface.openInterface(true);
        firstPageInterface.loadChanges(newStar);
    }
    
    goToThirdPage(){
        this.saveChanges();
        this.closeInterface();
        thirdPageInterface.openInterface();
        thirdPageInterface.loadChanges(newStar);
    }
}