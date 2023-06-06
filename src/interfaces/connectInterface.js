class pageConnect extends Interface {

        static page = '' +
            '<div class="chat-div " id="connect">' +
            ' <div class="chat-top">' +
            '<a id="chat-section">Chat</a>' +
            '<a id="friends-section">Friends</a>' +
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
            super("connect", pageConnect.page, true);
        }

        openInterface(editing) {
            super.openInterface();

            
            const CHATBUTTON = document.getElementById("chat-section");
            CHATBUTTON.addEventListener("click", (event) => this.openChat())

         

            const FRIENDSBUTTON = document.getElementById("friends-section");
            FRIENDSBUTTON.addEventListener("click", (event) => this.openFriends());

            

        }

        openChat() {
            this.closeInterface();
            chatInter.openInterface();
        }

        openFriends() {
            this.closeInterface();
            friendsInter.openInterface();
        }


    }

