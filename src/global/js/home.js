const INVISIBLE = document.getElementById("invisible");

function onclickoutside(func) {
    INVISIBLE.classList.remove("hidden");
    INVISIBLE.onclick = function () {
        INVISIBLE.classList.add("hidden");
        func();
    }
    INVISIBLE.addEventListener('contextmenu', (event) => {
        INVISIBLE.classList.add("hidden");
        func();
    });
}


const menu = document.getElementById("menu");
function openOption(event) {
    menu.style.width = "30%";
    menu.style.borderRadius = "50px";
    menu.style.paddingLeft = "50px";
    menu.style.paddingRight = "50px";
    menu.style.backgroundColor = "rgba(146, 180, 184,0.8)";
    menu.style.transition = ".3s";


    menu.style.zIndex = 999;
    const opts = menu.getElementsByClassName("options");

    for (let i = 0; i < opts.length - 1; i++) {
        opts.item(i).classList.remove("hidden");
    }

    onclickoutside(closeOption);
}

menu.onclick = function (event) { openOption(event) };

function closeOption() {
    const opts = menu.getElementsByClassName("options");

    for (let i = 0; i < opts.length; i++) {
        opts.item(i).classList.add("hidden");
    };

    menu.style.width = "45px";
    menu.style.borderRadius = "50%";
    menu.style.paddingLeft = "0px";
    menu.style.paddingRight = "0px";
    menu.style.backgroundColor = "none";
    menu.style.backgroundColor = "rgba(146, 180, 184,0)";
    menu.style.transition = ".3s";

    menu.style.zIndex = 0;

}

const chatInter = new pageChat();
const friendsInter = new pageFriends();
const connectInter = new pageConnect();
const messInter = new pageMessage();

const firstPageInterface =  new firstPageAddStar();
const secondPageInterface =  new secondPageAddStar();
const thirdPageInterface =  new thirdPageAddStar();


const galaxyPageInterface =  new pageAddGalaxy();


const chatButton = document.getElementById("chatButton");

chatButton.addEventListener("click", (event) => {
    event.stopImmediatePropagation();
    closeOption();
    INVISIBLE.classList.add("hidden");
    chatInter.openInterface()
});