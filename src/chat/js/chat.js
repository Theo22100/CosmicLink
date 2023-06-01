const CHAT = document.getElementById("chat");
function openChat(event) {
    event.stopPropagation();
    closeOption();
    onclickoutside(closeChat);
    ajaxGetContacts();
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

function addAllContactMessage(contacts){
  
    for (let i = 0; i <contacts.length; i++) {
        addContactMessage(contacts[i][0], contacts[i][1]);
    } 

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

    li.addEventListener("click", (event) => openChatWith(name));

}

function ajaxGetContacts() {
    $.ajax({
        url: "chat/chatDB.php",
        type: "POST",
        //TODO Trouver moyen de cache
        data: {
            action: "getContacts"
        },
        success: function (response) {
            const contacts = JSON.parse(response);
            addAllContactMessage(contacts);
            
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });


}