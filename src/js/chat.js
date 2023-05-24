const CHAT = document.getElementById("chat");
function openChat(event){
    event.stopPropagation();
    closeOption();
    onclickoutside(closeChat);
    CHAT.style.transform = "translateX(0%)";
}

function closeChat(){
    CHAT.style.transform = "translateX(100%)";
}



let lis = document.getElementById("previous-chats").getElementsByTagName("li");

for(let i = 0; i < lis.length; i++){
    lis.item(i).addEventListener("click", openChatWith)
}


const MESSAGES = document.getElementById("messages");

function openChatWith(){
    onclickoutside(closeChatWith);
    MESSAGES.style.transform = "translateX(0%)";

}

function closeChatWith(){
    MESSAGES.style.transform = "translateX(100%)";
    onclickoutside(closeChat);
}

document.getElementById("back").addEventListener("click", closeChatWith);