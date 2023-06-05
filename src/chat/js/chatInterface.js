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
        super("chat-div", pageChat.page, true);
    }

    openInterface(editing) {
        super.openInterface();
        const CHATBUTTON = document.getElementById("chat-section");
        CHATBUTTON.addEventListener("click", (event) => this.openChat)

        const CHATBUTTON1 = document.getElementById("chat-section1");
        CHATBUTTON1.addEventListener("click", (event) => this.openChat)



        const CONNECTBUTTON = document.getElementById("connect-section");
        CONNECTBUTTON.addEventListener("click", (event) => this.openConnect);

        const CONNECTBUTTON1 = document.getElementById("connect-section1");
        CONNECTBUTTON1.addEventListener("click", (event) => this.openConnect);

        const FRIENDSBUTTON = document.getElementById("friends-section");

        FRIENDSBUTTON.addEventListener("click", (event) => this.openFriends());

        const FRIENDSBUTTON1 = document.getElementById("friends-section1");

        FRIENDSBUTTON1.addEventListener("click", (event) => this.openFriends());
    }

    openChat() {
        pageChat.openInterface();
    }

    openConnect() {
        pageConnect.openInterface();
    }

    openFriends() {
        pageFriends.openInterface();
    }
}



