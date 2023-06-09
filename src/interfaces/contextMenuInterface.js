class contextMenuI extends Interface {
    static page = '' + 
    '   <div id="contextMenu" class="hidden">' + 
    '        <div class="option" id="edit"> Edit</div>' + 
    '        <div class="option" id="move"> Move</div>' + 
    '        <div class="option" id="remove"> remove</div>' + 
    '    </div>' + 
    '';


    constructor(){
        super('contextMenu', contextMenuI.page, true );
    }

    
    openGalaxyOptionsList(x, y){
        super.openInterface();

        const contextMenu = document.getElementById("contextMenu");
        contextMenu.style.top = y.toString() + "px";
        contextMenu.style.left = x.toString() + "px";
        contextMenu.classList.remove("hidden");
    
        document.getElementById("edit").addEventListener("click", (event) =>{
            this.closeInterface();
            openEditGalaxy(event);
        });
        document.getElementById("move").addEventListener("click", (event) =>{
            this.closeInterface();
            moveGalaxy(event);
        });
        document.getElementById("remove").addEventListener("click", (event) =>{
            this.closeInterface();
            errorPageI.openInterface();
        });
        
    }

    openStarOptionsList(x, y) {
        super.openInterface();
        
        const contextMenu = document.getElementById("contextMenu");

        contextMenu.style.top = y.toString() + "px";
        contextMenu.style.left = x.toString() + "px";
        contextMenu.classList.remove("hidden");
    
        document.getElementById("edit").addEventListener("click", (event) =>{
            this.closeInterface();
            openEditStar(event);
        });
        document.getElementById("move").addEventListener("click", (event) =>{
            this.closeInterface();
            moveStar(event);
        });
        document.getElementById("remove").addEventListener("click", (event) =>{
            this.closeInterface();
            removeStar(event);
        });
    }
}
