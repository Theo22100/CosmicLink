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
        '        <input id="search-personnes" class="search-personnes" type="text" placeholder="search">' +
        '   </header>' +
        '' +
        '       <ul id="previous-chats">' +
        '         ' +
        '   </ul>' +
        '</div>' +
        '</div>' +
        '';

    constructor() {
        super("chat", pageChat.page, true);
    }

    openInterface() {
        super.openInterface();


        const CONNECTBUTTON = document.getElementById("connect-section");
        CONNECTBUTTON.addEventListener("click", (event) => this.openConnect());


        const FRIENDSBUTTON = document.getElementById("friends-section");

        FRIENDSBUTTON.addEventListener("click", (event) => this.openFriends());

        const SEARCH = document.getElementById("search-personnes");

        SEARCH.addEventListener("input",(event)=> this.search(event));

        pageChat.ajaxGetContacts(true);
    }

    closeInterface() {
        super.closeInterface();

        pageChat.stopContactCall();
    }


    openConnect() {
        this.closeInterface();

        connectInter.openInterface();
    }

    openFriends() {
        this.closeInterface();

        friendsInter.openInterface();
    }

    getSearchValue(){

    }

    search(event){
        const SEARCH = document.getElementById("search-personnes");
        const searchValue= SEARCH.value;

        const PREVIOUSCHATS = document.getElementById("previous-chats");
        for(let i=0, len = PREVIOUSCHATS.childElementCount ; i < len; ++i){
            const nameD = PREVIOUSCHATS.children[i].getElementsByClassName("nom");
            if(nameD[0].textContent.toLowerCase().startsWith(searchValue.toLowerCase())){
                PREVIOUSCHATS.children[i].style.display = "flex";
            }
            else{
                PREVIOUSCHATS.children[i].style.display = "none";
            }
        }
    }

    static addAllContactMessage(contacts) {
        for (let i = 0; i < contacts.length; i++) {
            const contactName = contacts[i][0];
            const lastMsg = contacts[i][1];
            const numberUnread = contacts[i][2];
            pageChat.addContactMessage(contactName, lastMsg, numberUnread);
        }
    }

    static clearAllContactMessages() {
        const PREVIOUSCHATS = document.getElementById("previous-chats");
        while (PREVIOUSCHATS.firstChild != null) {
            PREVIOUSCHATS.removeChild(PREVIOUSCHATS.firstChild);
        }
    }

    static addContactMessage(name, previousMessage, numberUnread) {
        //TODO faire le numberUnread
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.classList.add("profilePic");
        img.src = "../img/profile-pic.png";
        li.appendChild(img);
        const div = document.createElement("div");
        li.appendChild(div);
        div.classList.add("info-personne");

        const nom = document.createElement("p");
        nom.classList.add("nom");
        nom.textContent = name;
        div.appendChild(nom);

        const oldMsg = document.createElement("p");
        oldMsg.classList.add("oldMsg");
        oldMsg.textContent = previousMessage;
        div.appendChild(oldMsg);

        if(numberUnread !=0){
            const unreadDiv = document.createElement("div");
            unreadDiv.classList.add("unread-div");
            const unread = document.createElement("p");
            unread.classList.add("unread-number");
            unread.textContent = numberUnread;
            unreadDiv.appendChild(unread);
            li.appendChild(unreadDiv);
        }


        const PREVIOUSCHATS = document.getElementById("previous-chats");
        PREVIOUSCHATS.appendChild(li);

        li.addEventListener("click", (event) => {
            chatInter.closeInterface();
            messInter.openInterface();
            messInter.load(name);
        });
    }

    static updateAllContactMessage(contacts){
        for (let i = 0; i < contacts.length; i++) {
            const contactName = contacts[i][0];
            const lastMsg = contacts[i][1];
            const numberUnread = contacts[i][2];
            pageChat.updateContactMessage(contactName, lastMsg, numberUnread);
        }
    }

    static updateContactMessage(name, previousMessage, numberUnread){
        const PREVIOUSCHATS = document.getElementById("previous-chats");
        for(let i=0, len = PREVIOUSCHATS.childElementCount ; i < len; ++i){
            let find= false;
            const nameD = PREVIOUSCHATS.children[i].getElementsByClassName("nom");
            if(nameD[0].textContent === name){
                find= true;
                const numberUnreadD = PREVIOUSCHATS.children[i].getElementsByClassName("unread-number");
                if(numberUnread > 0 ){
                    if(numberUnreadD.length == 0){
                        const unreadDiv = document.createElement("div");
                        unreadDiv.classList.add("unread-div");
                        const unread = document.createElement("p");
                        unread.classList.add("unread-number");
                        unread.textContent = numberUnread;
                        unreadDiv.appendChild(unread);
                        PREVIOUSCHATS.children[i].appendChild(unreadDiv);
                    }
                    else{
                        numberUnreadD[0].textContent = numberUnread;
                    }
                }
                else{
                    if (numberUnreadD.length >0){
                        numberUnreadD.remove();
                    }
                }
                
                const previousMessageD = PREVIOUSCHATS.children[i].getElementsByClassName("oldMsg");
                previousMessageD[0].textContent = previousMessage;
            }
        }
        
        if(!find){
            this.addContactMessage(name,previousMessage,numberUnread);
        }

    }



    static ajaxGetContacts(first) {
        $.ajax({
            url: "DBInterface/chatDB.php",
            type: "POST",
            //TODO Trouver moyen de cache
            data: {
                action: "getContacts"
            },
            success: function (response) {

                const contacts = JSON.parse(response);
                if ((contacts[1] != 0) || first) {
                    if (!first) { 
                        pageChat.updateAllContactMessage(contacts); 
                    }
                    else pageChat.addAllContactMessage(contacts);
                }

            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });

        pageChat.updateContactCall();
    }

    static timeoutContact;
    static updateContactCall() {
        pageChat.timeoutContact = setTimeout(function () {
            pageChat.ajaxGetContacts(false)
        }, 3000);
    }

    static stopContactCall() {
        clearTimeout(pageChat.timeoutContact);
    }
}



