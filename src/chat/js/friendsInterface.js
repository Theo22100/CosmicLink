class pageFriends extends Interface {

    static page = class pageChat extends Interface {

        static page = '' + '<div class="chat-div hidden" id="friends">' +
            '<div class="chat-top">' +
            '<a id="chat-section">Chat</a>' +
            '<a class="active">Friends</a>' +
            '<a id="connect-section">Connect</a>' +
            '</div>' +
            '' +
            ' <div class="list-friends">' +
            '<header class="search-friends">' +
            '<input class="search-personnes" type="text" placeholder="search">' +
            '</header>' +
            '<ul id="suggestionsF">' +
            '' +
            '</ul>' +
            '</div>' + '';
        #editing;

        constructor() {
            super("chat-div", pageFriends.page, true);
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


        }

        openChat() {
            pageChat.openInterface();
        }

        openConnect() {
            pageConnect.openInterface();
        }


    }

}