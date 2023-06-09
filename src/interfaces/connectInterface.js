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
        '<div class="switch-list">' +
        '                <button id="list" class="switch-active">Suggestions</button>' +
        '                <button id="request">All Users</button>' +
        '            </div>' +
        '<header class="search-friends">' +
        '<input id="search-personnes" class="search-personnes" type="text" placeholder="search">' +
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


        const FRLIST = document.getElementById("list");
        FRLIST.addEventListener("click", (event) => {
            if (FRLIST.classList.contains("switch-active")) return;
            this.openSuggestion();
        });
        const FRREQ = document.getElementById("request");
        FRREQ.addEventListener("click", (event) => {
            if (FRREQ.classList.contains("switch-active")) return;
            this.openAllUsers();
        });

        
        const SEARCH = document.getElementById("search-personnes");
        SEARCH.addEventListener("input", (event) => this.search(event));
    }

    search(event) {
        const SEARCH = document.getElementById("search-personnes");
        const searchValue = SEARCH.value;

        const FLIST = document.getElementById("suggestions");
        for (let i = 0, len = FLIST.childElementCount; i < len; ++i) {
            const nameD = FLIST.children[i].getElementsByClassName("profile-name");
            if (nameD[0].textContent.toLowerCase().startsWith(searchValue.toLowerCase())) {
                FLIST.children[i].style.display = "flex";
            }
            else {
                FLIST.children[i].style.display = "none";
            }
        }
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
        for (const id in suggestions) {
            const username = suggestions[id]['pseudo']; //string
            const starnames = suggestions[id]['starnames']; //array, potentially empty
            const starcount = suggestions[id]['count']; //number of stars, >= 1
            pageConnect.addSuggestions(username);
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
        ADDF.addEventListener("click", (event) => pageConnect.addFriend(name));
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


    static addFriend(name) {
        //TODO C'est ICI LEONIE!
    }


    openSuggestion(){
        const FRLIST = document.getElementById("list");
        FRLIST.classList.add("switch-active");
        const FRREQ = document.getElementById("request");
        FRREQ.classList.remove("switch-active");

        this.removeFriendsView();
        pageConnect.ajaxGetSuggestions();
    }

    openAllUsers(){
        const FRLIST = document.getElementById("list");
        FRLIST.classList.remove("switch-active");
        const FRREQ = document.getElementById("request");
        FRREQ.classList.add("switch-active");

        this.removeFriendsView();
        pageConnect.ajaxGetAllUsers();
    }

    removeFriendsView() {
        const FLIST = document.getElementById("suggestions");
        while (FLIST.firstChild != null) {
            FLIST.firstChild.remove();
        }
    }

    static ajaxGetAllUsers() {
        $.ajax({
            url: "DBInterface/chatDB.php",
            type: "POST",
            //TODO Trouver moyen de cache
            data: {
                action: "getAllUsers"
            },
            success: function (response) {
                try {

                    
                    const allUsers = JSON.parse(response);
                    console.log(allUsers);
                    pageConnect.addAllSuggestions(allUsers);

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
                    //format : {<iduser> : { "pseudo" : <username>, "starnames" : {<possibly empty>} , "count" : <number> } ,<iduser2> : { "pseudo" : <username2> , "starnames" : {<possibly empty>} , "count" : <number> } }
                    console.log(suggestions);
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

