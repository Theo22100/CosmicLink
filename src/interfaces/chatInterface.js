class pageChat extends Interface {

    static page = '' + '<div class="chat-div" id="chat">' +
        ' <div class="chat-top">' +
        '    <a class="active">Chat</a>' +
        '   <a id="friends-section">Friends</a>' +
        '  <a id="connect-section">Connect</a>' +
        ' ' +
        ' </div>' +
        '' +
        '   <div class="list-personnes">' +
        '     <header>' +
        '        <input class="search-personnes" type="text" placeholder="search">' +
        '   </header>' +
        '' +
        '       <ul id="previous-chats">' +
        '         ' +
        '   </ul>' +
        '</div>' +
        '</div>' +
        '';
    #editing;

    constructor() {
        super("chat", pageChat.page, true);
    }

    openInterface(editing) {
        super.openInterface();


        const CONNECTBUTTON = document.getElementById("connect-section");
        CONNECTBUTTON.addEventListener("click", (event) => this.openConnect());


        const FRIENDSBUTTON = document.getElementById("friends-section");

        FRIENDSBUTTON.addEventListener("click", (event) => this.openFriends());

    }
   

    openConnect() {
        this.closeInterface();

        connectInter.openInterface();
    }

    openFriends() {
        this.closeInterface();

        friendsInter.openInterface();
    }
}



