const CONNECT = document.getElementById("connect");

// const CHATBUTTON = document.getElementById("chat-section");

function openConnect(event) {
    event.stopPropagation();
    closeOption();
    onclickoutside(closeConnect);
    addAllSuggestions();
    CONNECT.style.transform = "translateX(0%)";
    CONNECT.classList.remove("hidden");
    
}

function closeConnect() {
    clearAllSuggestions();
    clearAllContactMessages();
    CONNECT.style.transform = "translateX(100%)";
    CHAT.style.transform = "translateX(100%)";
}

CHATBUTTON.addEventListener("click", (event)=>{
    clearAllSuggestions();
    CONNECT.classList.add("hidden");
    openChat(event);
});

CHATBUTTON1.addEventListener("click", (event)=>{
    clearAllSuggestions();
    CONNECT.classList.add("hidden");
    openChat(event);
});



FRIENDSBUTTON.addEventListener("click", (event)=>{
    clearAllSuggestions();
    CONNECT.classList.add("hidden");
    openFriends(event);
});

FRIENDSBUTTON1.addEventListener("click", (event)=>{
    clearAllSuggestions();
    CONNECT.classList.add("hidden");
    openFriends(event);
});

function addAllSuggestions(){
    addSuggestions("aaa");
    addSuggestions("ppoqds");
    addSuggestions("adqs");
    addSuggestions("qaa");
    addSuggestions("qaaa");
    addSuggestions("aaa");
    addSuggestions("ppoqds");
    addSuggestions("adqs");
    addSuggestions("qaa");
    addSuggestions("qaaa");
}

const SUGG = document.getElementById("suggestions");

function clearAllSuggestions(){
    while (SUGG.firstChild != null){
        SUGG.removeChild(SUGG.firstChild);
    }
}

function addSuggestions(name){

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

    SUGG.appendChild(LI);
}