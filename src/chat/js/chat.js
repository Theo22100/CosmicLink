const CHAT = document.getElementById("chat");
function openChat(event) {
    event.stopPropagation();
    closeOption();
    onclickoutside(closeChat);
    addAllContactMessage();
    CHAT.style.transform = "translateX(0%)";
}

function closeChat() {
    CHAT.style.transform = "translateX(100%)";
    clearAllContactMessages();
}

const CONNECTBUTTON = document.getElementById("connect-section");
CONNECTBUTTON.addEventListener("click",(event)=>{
    openConnect(event)
});

function addAllContactMessage(){
    console.log();
    addContactMessage("Josh","oui oui baguette");
    addContactMessage("Baptiste","oui non baguette");
    addContactMessage("Johnny","texxte");
    addContactMessage("Joshua","peut être");

}

function clearAllContactMessages(){
    while(PREVIOUSCHATS.firstChild != null){
        PREVIOUSCHATS.removeChild(PREVIOUSCHATS.firstChild);
    }
}

const PREVIOUSCHATS = document.getElementById("previous-chats");

function addContactMessage(name, previousMessage){
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

    PREVIOUSCHATS.appendChild(li);

    li.addEventListener("click", openChatWith(name));

}