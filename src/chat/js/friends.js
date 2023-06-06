const FRIENDS = document.getElementById("friends");

// const CHATBUTTON = document.getElementById("chat-section");

function openFriends(event) {
    event.stopPropagation();
    closeOption();
    // onclickoutside(closeFriends);
    // addAllFSuggestions();
    FRIENDS.style.transform = "translateX(0%)";
    FRIENDS.classList.remove("hidden");
}

function closeFriends() {
    clearAllSuggestions();
    clearAllContactMessages();
    FRIENDS.style.transform = "translateX(0%)";
    CHAT.style.transform = "translateX(100%)";
    
}


CHATBUTTON.addEventListener("click", (event)=>{
    clearAllSuggestions();
    FRIENDS.classList.add("hidden");
    openChat(event);
});

CHATBUTTON1.addEventListener("click", (event)=>{
    clearAllSuggestions();
    FRIENDS.classList.add("hidden");
    openChat(event);
});

CONNECTBUTTON.addEventListener("click", (event)=>{
    clearAllSuggestions();
    FRIENDS.classList.add("hidden");
    openConnect(event);
});

CONNECTBUTTON1.addEventListener("click", (event)=>{
    clearAllSuggestions();
    FRIENDS.classList.add("hidden");
    openConnect(event);
});


function addAllFSuggestions(){
    addFSuggestions("aaa");
  
}


const SUGGF = document.getElementById("suggestionsF");
function clearAllFSuggestions(){
    
    while (SUGGF.firstChild != null){
        SUGGF.removeChild(SUGGF.firstChild);
    }
}

function addFSuggestions(name){

    const LIF = document.createElement("li");
    LIF.classList.add("suggestion-content");
    const PPF = document.createElement("img");
    PPF.src = "../img/profile-pic.png";
    PPF.classList.add("suggestion-pp");
    LIF.appendChild(PPF);

    const NAME = document.createElement("p");
    NAME.textContent = name;
    NAME.classList.add("suggestion-name");
    LIF.appendChild(NAME);

    SUGGF.appendChild(LIF);
}