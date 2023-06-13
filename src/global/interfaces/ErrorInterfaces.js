class errorAllInterface extends Interface {
    static page = '' +
        '' +
        '        <div id="errorAll">' +
        '' +
        '            <h3 id="errorTitle"> Are you sure you want to delete this galaxy</h3>' +
        '            <p id="errorDescription">This action will delete all stars contained by this galaxy !</p>' +
        '            <button class="ok" id="ok">Ok</button>' +
        '        </div>' +
        '' +
        '';


    constructor() {
        super("errorAll", errorAllInterface.page, true);
    }

    openInterface(title, description) {
        super.openInterface();
        document.getElementById("ok").addEventListener("click", (event) => this.closeInterface());

        document.getElementById("errorTitle").textContent = title;
        document.getElementById("errorDescription").textContent = description;
    }

}


const pageErrorAll = new errorAllInterface();