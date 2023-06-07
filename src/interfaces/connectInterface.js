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
        '<div id="suggestions">' +
        '' +
        '</div>' +
        '</div>' +
        '</div>' + '';


    constructor() {
        super("connect", pageConnect.page, true);
    }

    openInterface() {
        super.openInterface();

        pageConnect.ajaxGetSuggestions();

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


    static clearAllSuggestions() {
        const SUGG = document.getElementById("suggestions");
        while (SUGG.firstChild != null) {
            SUGG.removeChild(SUGG.firstChild);
        }
    }

    static addAllSuggestions(suggestions) {
        for (let i = 0; i < suggestions.length; i++) {
            pageConnect.addSuggestions(suggestions[i]);
        }
    }

    static addSuggestions(name) {

        const DIV = document.createElement("div");
        DIV.classList.add("friend-suggestion");
        const PP = document.createElement("img");
        PP.src = "../img/profile-pic.png";
        PP.classList.add("profile-pic");
        DIV.appendChild(PP);

        const NAME = document.createElement("p");
        NAME.textContent = name;
        NAME.classList.add("profile-name");
        DIV.appendChild(NAME);

        const DIVBUTTON = document.createElement("div");
        DIVBUTTON.classList.add("newFriend-button");

        const ADDF = document.createElement("button");
        ADDF.textContent = "Add Friend";
        ADDF.classList.add("addFriend");
        DIVBUTTON.appendChild(ADDF);

        const VISIT = document.createElement("a");
        VISIT.href = "./visit.php?visit_id=" + name;
        VISIT.textContent = "Visit";
        VISIT.classList.add("visit");
        DIVBUTTON.appendChild(VISIT);

        DIV.appendChild(DIVBUTTON);

        const SUGG = document.getElementById("suggestions");
        SUGG.appendChild(DIV);
    }


    static ajaxGetSuggestions() {
        $.ajax({
            url: "DBInterface/chatDB.php",
            type: "POST",
            //TODO Trouver moyen de cache
            data: {
                action: "getSuggestions"
            },
            success: function (response) {
                try {

                    const suggestions = JSON.parse(response);
                    pageConnect.addAllSuggestions(suggestions);

                } catch (error) {
                    console.log(response);
                }


            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });

    }
}

