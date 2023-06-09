class errorPage extends Interface {
    static page = '' +
        '' +
        '        <div class="container" id="errorGalaxy">' +
        '' +
        '            <h3> Are you sure you want to delete this galaxy</h3>' +
        '            <p>This action will delete all stars contained by this galaxy !</p>' +
        '            <button class ="yes" id="confirmYesGalaxy">Yes</button>' +
        '            <button class="no" id="confirmNoGalaxy">No</button>' +
        '        </div>' +
        '' +
        '';


    constructor() {
        super("errorGalaxy", errorPage.page, false);
    }

    openInterface() {
        super.openInterface();

        const YES = document.getElementById("confirmYesGalaxy");
        YES.addEventListener("click", (event) => {
            this.closeInterface();
            removeGalaxy(event);
        });
        const NO = document.getElementById("confirmNoGalaxy");
        NO.addEventListener("click", (event) => {
            this.closeInterface();
        });
    }


}