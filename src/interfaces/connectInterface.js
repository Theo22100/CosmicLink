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
       console.log(suggestions);
        for (const username in suggestions) {
            const starnames = suggestions[username]['starnames']; //array, potentially empty
            const starcount = suggestions[username]['count']; //number of stars, >= 1
            console.log(starnames+ ' '+ starcount);
            pageConnect.addSuggestions(username);
        }
    }

    static addSuggestions(name) {

        const LI = document.createElement("li");
        LI.classList.add("suggestion-content");
        const PP = document.createElement("img");
        PP.src = "../img/profile-pic.png";
        PP.classList.add("suggestion-pp");
        LI.appendChild(PP);

        const NAME = document.createElement("p");
        NAME.textContent = name;
        NAME.classList.add("suggestion-name");
        LI.appendChild(NAME);

        const SUGG = document.getElementById("suggestions");
        SUGG.appendChild(LI);
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
                    //format : suggestions =  {<user1> : { "starnames" : {<possibly empty>} , "count" : <number> } , <user2> { "starnames" : {<possibly empty>} , "count" : <number> } }
                    //console.log(suggestions);
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

