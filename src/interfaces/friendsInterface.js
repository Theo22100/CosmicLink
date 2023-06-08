class pageFriends extends Interface {

    static page = '' + 
    '<div class="chat-div" id="friends">' + 
    '        <div class="chat-top">' + 
    '            <a id="chat-section">Chat</a>' + 
    '            <a class="active">Friends</a>' + 
    '            <a id="connect-section">Connect</a>' + 
    '        </div>' + 
    '    ' + 
    '        <div class="list-friends">' + 
    '            <div class="switch-list">' + 
    '                <button id="list" class="switch-active">List</button>' + 
    '                <button id="request">Requests</button>' + 
    '            </div>' + 
    '            <header class="search-friends" id="search-friends">' + 
    '                <input class="search-personnes" type="text" placeholder="Search Contact">' + 
    '            </header>' + 
    '            ' + 
    '            <div id="friendList"></div>' + 
    '        </div>' + 
    '    </div>' + 
    '';

    constructor() {
        super("friends", pageFriends.page, true);
    }

    openInterface() {
        super.openInterface();

        const CHATBUTTON = document.getElementById("chat-section");
        CHATBUTTON.addEventListener("click", (event) => this.openChat())

        const CONNECTBUTTON = document.getElementById("connect-section");
        CONNECTBUTTON.addEventListener("click", (event) => this.openConnect());

        
        this.openList();

        
        const FRLIST = document.getElementById("list");
        FRLIST.addEventListener("click", (event) => {
            if(FRLIST.classList.contains("switch-active")) return;
            this.openList();
        });
        const FRREQ = document.getElementById("request");
        FRREQ.addEventListener("click", (event) => {
            if(FRREQ.classList.contains("switch-active")) return;
            this.openRequest();
        });
    }

    openList(){
        const FRLIST = document.getElementById("list");
        FRLIST.classList.add("switch-active");
        const FRREQ = document.getElementById("request");
        FRREQ.classList.remove("switch-active");

        this.removeFriendsView();
        pageFriends.ajaxGetFriends();
    }

    openRequest(){
        pageFriends.ajaxGetRequests();
        const FRLIST = document.getElementById("list");
        FRLIST.classList.remove("switch-active");
        const FRREQ = document.getElementById("request");
        FRREQ.classList.add("switch-active");

        this.removeFriendsView();
    }

    removeFriendsView(){
        const FLIST = document.getElementById("friendList");
        while(FLIST.firstChild != null){
            FLIST.firstChild.remove();
        }
    }


    static addAllFriends(friends) {
        for (let i = 0; i <friends.length; i++) {
            pageFriends.addFriends(friends[i]);
        } 
    }

    static addFriends(name) {

        const DIV = document.createElement("div");
        DIV.classList.add("friendProfile");
        const PP = document.createElement("img");
        PP.src = "../img/profile-pic.png";
        PP.classList.add("friend-ProfilePic");
        DIV.appendChild(PP);

        const NAME = document.createElement("p");
        NAME.textContent = name;
        NAME.classList.add("friend-ProfileName");
        DIV.appendChild(NAME);


        const BUTTONDIV = document.createElement("div");
        BUTTONDIV.classList.add("friendActionButton");

        const SENDMESSAGE = document.createElement("button");
        SENDMESSAGE.classList.add("sendMessage");
        SENDMESSAGE.textContent = "Message";
        SENDMESSAGE.addEventListener("click", (event) => pageFriends.sendNewMessage(name));
        BUTTONDIV.appendChild(SENDMESSAGE);

        const VISITFRIEND = document.createElement("button");
        VISITFRIEND.classList.add("visitFriend");
        VISITFRIEND.textContent = "Visit";
        VISITFRIEND.addEventListener("click", (event)=> {
            window.location.href= "./visit.php?visit_id=" + name;
        });
            
        BUTTONDIV.appendChild(VISITFRIEND);

        const REMOVEFRIEND = document.createElement("button");
        REMOVEFRIEND.classList.add("removeFriend");
        REMOVEFRIEND.textContent = "Remove Friend";
        REMOVEFRIEND.addEventListener("click", (event) => pageFriends.removeFriend(name));
        BUTTONDIV.appendChild(REMOVEFRIEND);

        DIV.appendChild(BUTTONDIV);

        const FLIST = document.getElementById("friendList");
        FLIST.appendChild(DIV);
    }


    static addAllFriendsRequests(friends) {
        for (let i = 0; i <friends.length; i++) {
            pageFriends.addFriendsRequests(friends[i]);
        } 
    }

    static addFriendsRequests(name) {

        const DIV = document.createElement("div");
        DIV.classList.add("friendProfile");
        const PP = document.createElement("img");
        PP.src = "../img/profile-pic.png";
        PP.classList.add("friend-ProfilePic");
        DIV.appendChild(PP);

        const NAME = document.createElement("p");
        NAME.textContent = name;
        NAME.classList.add("friend-ProfileName");
        DIV.appendChild(NAME);


        const BUTTONDIV = document.createElement("div");
        BUTTONDIV.classList.add("friendActionButton");

        const VISITFRIEND = document.createElement("button");
        VISITFRIEND.classList.add("visitFriend");
        VISITFRIEND.textContent = "Visit";
        VISITFRIEND.addEventListener("click", (event)=> {
            window.location.href= "./visit.php?visit_id=" + name;
        });
            
        BUTTONDIV.appendChild(VISITFRIEND);

        const ADDFRIEND = document.createElement("button");
        ADDFRIEND.classList.add("addFriend");
        ADDFRIEND.textContent = "Add Friend";
        ADDFRIEND.addEventListener("click", (event) => pageFriends.addFriend(name));
        BUTTONDIV.appendChild(ADDFRIEND);

        DIV.appendChild(BUTTONDIV);

        const FLIST = document.getElementById("friendList");
        FLIST.appendChild(DIV);
    }

    static addFriend(name){

    }
    
    static removeFriend(name){

    }

    static sendNewMessage(name){

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

    static ajaxGetRequests() {
        $.ajax({
            url: "DBInterface/friendsDB.php",
            type: "GET",
            //TODO Trouver moyen de cache
            data: {
                action: "getRequests"
            },
            success: function (response) {
                try {

                    console.log(response);
                    const friends = JSON.parse(response);
                    pageFriends.addAllFriendsRequests(friends);

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

