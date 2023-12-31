class Interface{

    #htmlContent;

    interfaceElement;

    interfaceId;

    closesOnClickOutside;
    invisibleDiv;

    constructor(interfaceId, htmlContent, closesOnClickOutside){
        this.#htmlContent = htmlContent;
        this.interfaceId =  interfaceId;
        this.closesOnClickOutside = closesOnClickOutside;
    }

    static BODY = document.getElementById("background");
    openInterface(){
        Interface.BODY.insertAdjacentHTML("beforeend", this.#htmlContent);
        this.interfaceElement = document.getElementById(this.interfaceId);

        
        this.interfaceElement.classList.add("firstView");
        
        this.invisibleDiv = document.createElement("div");
        this.invisibleDiv.classList.add("invisible-background");
        Interface.BODY.appendChild(this.invisibleDiv);
        if (this.closesOnClickOutside == true){
            this.invisibleDiv.addEventListener("click", (event)=> this.closeInterface());
        }
    }

    closeInterface(){
        this.invisibleDiv.remove();
        this.interfaceElement.remove();
    }
}