class pageConnect extends Interface {

    static page = class pageChat extends Interface {

        static page = '' +
            '<div class="chat-div hidden" id="connect">' +
            ' <div class="chat-top">' +
            '<a id="chat-section1">Chat</a>' +
            '<a id="friends-section1">Friends</a>' +
            '<a class="active">Connect</a>' +
            '</div>' +
            '' +
            '' +
            '<div class="list-suggestion">' +
            '<header class="search-friends">' +
            '<input class="search-personnes" type="text" placeholder="search">' +
            '</header>' +
            '<ul id="suggestions">' +
            '' +
            '</ul>' +
            '</div>' +
            '</div>' + '';

        #editing;

        constructor() {
            super("chat-div", pageConnect.page, true);
        }

        openInterface(editing) {
            super.openInterface();
            const CHATBUTTON = document.getElementById("chat-section");
            CHATBUTTON.addEventListener("click", (event) => this.openChat)

            const CHATBUTTON1 = document.getElementById("chat-section1");
            CHATBUTTON1.addEventListener("click", (event) => this.openChat)


            FRIENDSBUTTON.addEventListener("click", (event) => this.openFriends());

            const FRIENDSBUTTON1 = document.getElementById("friends-section1");

            FRIENDSBUTTON1.addEventListener("click", (event) => this.openFriends());


        }

        openChat() {
            pageChat.openInterface();
        }

        openFriends() {
            pageFriends.openInterface();
        }


    }

}