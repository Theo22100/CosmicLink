const MESSAGES = document.getElementById("messages");

function openChatWith() {
    onclickoutside(closeChatWith);
    ajaxGetMessages();
    MESSAGES.style.transform = "translateX(0%)";
}

function closeChatWith() {
    MESSAGES.style.transform = "translateX(100%)";
    onclickoutside(closeChat);
    clearPreviousMessages();
}

document.getElementById("back").addEventListener("click", closeChatWith);



function addPreviousMessages(){
    addMessageSendee("Josh","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", "Jan 18 5:20");
    addMessageSendee("Josh","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", "Jan 18 5:20");
    addMessageSender("Me","Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", "Jan 18 5:20");
}


function clearPreviousMessages(){
    while(CHATHISTORY.firstChild != null){
        CHATHISTORY.removeChild(CHATHISTORY.firstChild);
    }
}

const CHATHISTORY = document.getElementById("chat-history");

function addMessageSender(name, content, time){

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

function addMessageSendee(name, content, time){
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


const sendButton = document.getElementById("sendMessage");
const messageInput = document.getElementById("textMessage");
sendButton.addEventListener("click",(event)=>{
    sendMessage();
})

messageInput.addEventListener("keydown", (event)=>{
    if (event.key === 'Enter' || event.keyCode === 13) {
        sendMessage();
    }
})


function sendMessage(){
    if(messageInput.value != ""){
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        addMessageSender("me", messageInput.value, day +"/"+ month);
        messageInput.value = "";
    }
}

function ajaxGetMessages(username){
    $.ajax({
        url: "chat/chatDB.php",
        type: "POST",
        //TODO Trouver moyen de cache
        data: {
            action: "getMsg",
            contactUsername : username
        },
        cache: true,
        success: function (response) {
            console.log(response);
            //TODO
            const msgs = '';
            addPreviousMessages(msgs);
            
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });
}