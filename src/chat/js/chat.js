const CHAT = document.getElementById("chat");
let timeoutContact;
function openChat(event) {
    event.stopPropagation();
    closeOption();
    // onclickoutside(closeChat);
    ajaxGetContacts(true);
    CHAT.style.transform = "translateX(0%)";
    //  CONNECT.classList.add("active");
}

function closeChat() {
    CHAT.style.transform = "translateX(100%)";
    clearAllContactMessages();
    stopContactCall();
}
const CHATBUTTON = document.getElementById("chat-section");
CHATBUTTON.addEventListener("click",(event)=>{
    openChat(event)
});

const CHATBUTTON1= document.getElementById("chat-section1");
CHATBUTTON1.addEventListener("click",(event)=>{
    openChat(event)
});


const CONNECTBUTTON = document.getElementById("connect-section");
CONNECTBUTTON.addEventListener("click",(event)=>{
    openConnect(event)
});

const CONNECTBUTTON1 = document.getElementById("connect-section1");
CONNECTBUTTON1.addEventListener("click",(event)=>{
    openConnect(event)
});

const FRIENDSBUTTON = document.getElementById("friends-section");

FRIENDSBUTTON.addEventListener("click",(event)=>{
    openFriends(event)
});

const FRIENDSBUTTON1 = document.getElementById("friends-section1");

FRIENDSBUTTON1.addEventListener("click",(event)=>{
    openFriends(event)
});


function addAllContactMessage(contacts){
    for (let i = 0; i <contacts.length; i++) {
        const contactName = contacts[i][0];
        const lastMsg = contacts[i][1];
        const numberUnread = contacts[i][2];
        addContactMessage(contactName,lastMsg);
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

function ajaxGetContacts(first) {
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
                if (!first) {clearAllContactMessages();}
                addAllContactMessage(contacts);
            }
            
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });

    updateContactCall();
}

function updateContactCall() {
    timeoutContact = setTimeout(function () { ajaxGetContacts(false) }, 3000);
}

function stopContactCall(){
    clearTimeout(timeoutContact);
}
