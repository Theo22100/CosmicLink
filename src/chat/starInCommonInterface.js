class starInCommon extends Interface{

    static page = '' + 
    '    <div id="starInCommon">' + 
    '        <header class="commonStar-title">' + 
    '            <p>List of stars in common</p>' + 
    '        </header>' + 
    '' + 
    '        <div class="list-common-star" id="commonstarlist">' + 
    '        </div>' + 
    '    </div>' + 
    '';


    constructor(){
        super("starInCommon", starInCommon.page, true);
    }

    openInterface(listData){
        super.openInterface();

        const DIV= document.getElementById("commonstarlist"); 
        for (let i = 0; i < listData.length; i++){
            const p = document.createElement("p");
            p.textContent = listData[i];
            DIV.appendChild(p);
        }
    }

    closeInterface(){
        super.closeInterface();
        connectInter.interfaceElement.style.zIndex = 999; 
    }
}

const STARINCOMMONPAGE = new starInCommon();