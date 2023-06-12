class pageAddGalaxy extends Interface{
    static page = '' + 
    '<div class="ui hidden" id="galaxyui">' + 
    '        <header>' + 
    '            <p class="addTitle">Add Galaxy</p>' + 
    '            <p>main information</p>' + 
    '' + 
    '            <input type="checkbox" id="publicGalaxy">' +
    '            <label class="switch" for="publicGalaxy"></label>' +
    '' +
    '            <button type="button" class="btn-close">close' + 
    '            </button>' + 
    '        </header>' + 
    '        <div class="ui_body">' + 
    '' + 
    '            <p class="inputText">Galaxy Name</p>' + 
    '            <input type="text" name="galaxyName" id="galaxyName" placeholder="name">' + 
    '' + 
    '            <p class="inputText">Galaxy description <span>(optionnal)</span></p>' + 
    '            <textarea  id="galaxyDesc"  placeholder="Describe your galaxy here..."></textarea>' + 
    '' + 
    '        </div>' + 
    '' + 
    '        <footer class="ui-footer">' + 
    '            <div class="nextPrevious">' + 
    '                <button class="next">Add Galaxy</button>' + 
    '            </div>' + 
    '        </footer>' + 
    '' + 
    '    </div>' + 
    '';

    #editing;

    constructor() {
        super("galaxyui", pageAddGalaxy.page, true);
        

    }

    openInterface(editing){
        super.openInterface();
        this.#editing = editing;

        const SUBMIT = document.getElementsByClassName("nextPrevious")[0].getElementsByClassName("next")[0];
        const NAME = document.getElementsByClassName("ui hidden")[0].getElementsByClassName("addTitle")[0];
        if (this.#editing){
             SUBMIT.textContent = "Edit Galaxy";
             NAME.textContent = "Edit Galaxy";
        }
        SUBMIT.addEventListener("click", (event) => this.submit());

        this.interfaceElement.getElementsByClassName("btn-close")[0].addEventListener("click", (event)=> this.closeInterface());
    }
    
    setName(newName){
        document.getElementById("galaxyName").value = newName;
    }

    getName(){
        return document.getElementById("galaxyName").value;
    }

    setDescription(newDesc){
        document.getElementById("galaxyDesc").value = newDesc;
    }

    getDescription(){
        return document.getElementById("galaxyDesc").value;
    }

    getPublic() {
        return document.getElementById("publicGalaxy").checked? 1: 0;
    }

    setPublic(bool) {
        document.getElementById("publicGalaxy").checked = (parseInt(bool) == 1);
    }

    loadChanges(galaxyObject){
        this.setName(galaxyObject.getName());
        this.setDescription(galaxyObject.getDescription());
        this.setPublic(galaxyObject.getPublicGalaxy());
    }

    submit(){
        if(this.#editing == false){
            newGalaxy.setName(this.getName());
            newGalaxy.setDescription(this.getDescription());
            newGalaxy.setPublicGalaxy(this.getPublic());

            newGalaxy.addElementAnimation();
            newGalaxy.addElement();
            pageAddGalaxy.ajaxGAdd(newGalaxy.getName(), newGalaxy.getDescription(), newGalaxy.getX(), newGalaxy.getY(), this.getPublic());
        }
        else{
            pageAddGalaxy.ajaxGEdit(currentGalaxy.getName(), this.getName(), this.getDescription(), this.getPublic());
            currentGalaxy.setName(this.getName());
            currentGalaxy.setDescription(this.getDescription());
            currentGalaxy.setPublicGalaxy(this.getPublic());
        }

        this.closeInterface();
    }


    static ajaxGAdd(Gname, Gdesc, x, y, GpublicGalaxy) {

        $.ajax({
            url: "DBInterface/galaxyDB.php",
            type: "POST",
            data: {
                action: 'add',
                name: Gname,
                descr: Gdesc,
                x: x,
                y: y,
                publicGalaxy: GpublicGalaxy
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    static ajaxGEdit(oldName, newName, galaxyDesc, GpublicGalaxy){
        $.ajax({
            url: "DBInterface/galaxyDB.php",
            type: "POST",
            data: {
                action: 'edit',
                old_name: oldName,
                new_name: newName,
                descr: galaxyDesc,
                publicGalaxy: GpublicGalaxy
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