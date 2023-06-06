const CONNECT = document.getElementById("connect");

const CHATBUTTON = document.getElementById("chat-section");

function openConnect(event) {
    ajaxGetSuggestions();
    stopContactCall();
    event.stopPropagation();
    closeOption();
    onclickoutside(closeConnect);
    
    CONNECT.style.transform = "translateX(0%)";
    CONNECT.classList.remove("hidden");
}

function closeConnect() {
    clearAllSuggestions();
    clearAllContactMessages();
    CONNECT.style.transform = "translateX(100%)";
    CHAT.style.transform = "translateX(100%)";
}

CHATBUTTON.addEventListener("click", (event) => {
    clearAllSuggestions();
    CONNECT.classList.add("hidden");
});

function addAllSuggestions(suggestions) {
    for (let i = 0; i <suggestions.length; i++) {
        addSuggestions(suggestions[i]);
    } 
}

const SUGG = document.getElementById("suggestions");

function clearAllSuggestions() {
    while (SUGG.firstChild != null) {
        SUGG.removeChild(SUGG.firstChild);
    }
}

function addSuggestions(name) {

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

function ajaxGetSuggestions() {
    $.ajax({
        url: "DBInterface/chatDB.php",
        type: "POST",
        //TODO Trouver moyen de cache
        data: {
            action: "getSuggestions"
        },
        success: function (response) {
            try {
               
                const suggestions = JSON.parse(response);
                //console.log(suggestions);
                addAllSuggestions(suggestions);

            } catch (error) {
                console.log(response);
            }


        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error(error);
        }
    });

}