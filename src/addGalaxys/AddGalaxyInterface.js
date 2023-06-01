class pageAddGalaxy extends Interface{
    static page =''

    #editing;

    constructor() {
        super("galaxyui", pageAddGalaxy.page, true);
        
    }

    openInterface(editing){
        super.openInterface();
        this.#editing = editing;
    }

    setName(){

    }

    getName(){

    }

    setDescription(){

    }

    getDescription(){

    }

    loadChanges(galaxyObject){

    }

    submit(){

    }
}