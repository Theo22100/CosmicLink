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

    constructor() {
        super("friends", pageFriends.page, true);
    }

    openInterface() {
        super.openInterface();

        pageFriends.ajaxGetFriends();
        const CHATBUTTON = document.getElementById("chat-section");
        CHATBUTTON.addEventListener("click", (event) => this.openChat())





        const CONNECTBUTTON = document.getElementById("connect-section");
        CONNECTBUTTON.addEventListener("click", (event) => this.openConnect());



    }

    static addAllFriends(friends) {
        for (let i = 0; i <friends.length; i++) {
            pageFriends.addFriends(friends[i]);
        } 
    }

    static addFriends(name) {

        const LI = document.createElement("li");
        LI.classList.add("friends-content");
        const PP = document.createElement("img");
        PP.src = "../img/profile-pic.png";
        PP.classList.add("friends-pp");
        LI.appendChild(PP);

        const NAME = document.createElement("p");
        NAME.textContent = name;
        NAME.classList.add("friends-name");
        LI.appendChild(NAME);

        const SUGG = document.getElementById("suggestionsF");
        SUGG.appendChild(LI);
    }

    openChat() {
        this.closeInterface();

        chatInter.openInterface();

    }

    openConnect() {
        this.closeInterface();

        connectInter.openInterface();

    }

    static ajaxGetFriends() {
        $.ajax({
            url: "DBInterface/friendsDB.php",
            type: "GET",
            //TODO Trouver moyen de cache
            data: {
                action: "getFriends"
            },
            success: function (response) {
                try {

                    const friends = JSON.parse(response);
                    pageFriends.addAllFriends(friends);

                } catch (error) {
                    console.log(response);
                    console.error(error);
                }


            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });

    }
}

