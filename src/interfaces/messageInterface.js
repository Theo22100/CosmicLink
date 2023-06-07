class pageMessage extends Interface {

    static page = '' +
        '<div class="chat-div" id="messages">' +
        '' +
        '<div class="chat-personne">' +
        '<header>' +
        '<a id="back">' +
        '<div></div>' +
        '</a>' +
        '<img src="../img/profile-pic.png">' +
        '<div>' +
        '<p class="nom" id="messageProfileName"></p>' +
        '<p class="status orange">Online</p>' +
        '</div>' +
        '</header>' +
        '' +
        '' +
        ' <ul id="chat-history">' +
        '' +
        '</ul>' +
        '' +
        '<footer class="sendMessages">' +
        '<input type="text" placeholder="Enter your message..." id="textMessage">' +
        '<input type="submit" value="Send" id="sendMessage">' +
        '</footer>' +
        '</div>' +
        '';


    constructor() {
        super("messages", pageMessage.page, true);
    }

    openInterface() {
        super.openInterface();

        const sendButton = document.getElementById("sendMessage");
        const messageInput = document.getElementById("textMessage");
        sendButton.addEventListener("click", (event) => {
            this.sendMessage();
        })
        messageInput.addEventListener("keydown", (event) => {
            if (event.key === 'Enter' || event.keyCode === 13) {
                this.sendMessage();
            }
        })

        document.getElementById("back").addEventListener("click", (event)=>{
            this.closeInterface();
            chatInter.openInterface();
        });
    }

    setName(name){
        document.getElementById("messageProfileName").textContent = name;
    }

    load(name){
        this.setName(name);
        pageMessage.ajaxGetMessages(name,true);
    }

    closeInterface() {
        super.closeInterface();
        pageMessage.stopCall();
    }

    sendMessage() {
        const messageInput = document.getElementById("textMessage");
        if (messageInput.value != "") {
            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;

            const name = document.getElementById("messageProfileName").textContent;
            pageMessage.ajaxSendMsg(name, messageInput.value);
            pageMessage.addMessageSender("me", messageInput.value, day + "/" + month);
            messageInput.value = "";
        }
    }



    static addPreviousMessages(msgs) {
        for (let i = 0; i < msgs.length; i++) {

            if (msgs[i]['sender'] == 'me') {

                pageMessage.addMessageSender("Me", msgs[i]['content'], msgs[i]['timestamp']);
            }
            else {
                pageMessage.addMessageSendee(msgs[i]['sender'], msgs[i]['content'], msgs[i]['timestamp']);
            }
        }
    }

    static clearPreviousMessages() {
        const CHATHISTORY = document.getElementById("chat-history");

        while (CHATHISTORY.firstChild != null) {
            CHATHISTORY.removeChild(CHATHISTORY.firstChild);
        }
    }


    static addMessageSender(name, content, time) {
        const CHATHISTORY = document.getElementById("chat-history");


        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("msg");
        div.classList.add("me");
        li.appendChild(div);
        const spanName = document.createElement("span");
        spanName.classList.add("personne");
        spanName.textContent = name;
        div.appendChild(spanName);
        div.innerHTML += content;

        const spanTime = document.createElement("span");
        spanTime.classList.add("time");
        spanTime.textContent = time;
        div.appendChild(spanTime);

        CHATHISTORY.appendChild(li);
    }

    static addMessageSendee(name, content, time) {
        const CHATHISTORY = document.getElementById("chat-history");

        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("msg");
        div.classList.add("them");
        li.appendChild(div);
        const spanName = document.createElement("span");
        spanName.classList.add("personne");
        spanName.textContent = name;
        div.appendChild(spanName);

        div.innerHTML += content;

        const spanTime = document.createElement("span");
        spanTime.classList.add("time");
        spanTime.textContent = time;
        div.appendChild(spanTime);


        CHATHISTORY.appendChild(li);
    }

    static ajaxGetMessages(username, first) {
        $.ajax({
            url: "DBInterface/chatDB.php",
            type: "POST",
            //TODO Trouver moyen de cache
            data: {
                action: 'getMsg',
                contactUsername: username
            },
            cache: true,
            success: function (response) {
                const msgs = JSON.parse(response);
                //console.log(msgs);
                if ((msgs[1] != 0) || first) {
                    if (!first) { pageMessage.clearPreviousMessages(); }
                    pageMessage.addPreviousMessages(msgs[0]);
                }

            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });
        pageMessage.updateCall();
    }


    static timeout;

    static updateCall() {
        pageMessage.timeout = setTimeout(
            function () {
                pageMessage.ajaxGetMessages(document.getElementById("messageProfileName").textContent, false)
            }, 1000);
    }

    static stopCall() {
        clearTimeout(pageMessage.timeout);
    }

    static ajaxSendMsg(name, msgTxt) {
        $.ajax({
            url: "DBInterface/chatDB.php",
            type: "POST",
            data: {
                action: 'sendMsg',
                contactUsername: name,
                msgTxt: msgTxt
            },
            cache: true,
            success: function (response) {

            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error(error);
            }
        });
    }

}

