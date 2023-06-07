class pageFriends extends Interface {

        static page = '' + '<div class="chat-div " id="friends">' +
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
            super("friends", pageFriends.page, true);
        }

        openInterface(editing) {
            super.openInterface();
           
            const CHATBUTTON = document.getElementById("chat-section");
            CHATBUTTON.addEventListener("click", (event) => this.openChat())

        



            const CONNECTBUTTON = document.getElementById("connect-section");
            CONNECTBUTTON.addEventListener("click", (event) => this.openConnect());



        }

        openChat() {
            this.closeInterface();

            chatInter.openInterface();
            
        }

        openConnect() {
            this.closeInterface();

            connectInter.openInterface();
           
        }


    }

