
const chatInter = new pageChat();
const friendsInter = new pageFriends();
const connectInter = new pageConnect();
const messInter = new pageMessage();

const firstPageInterface =  new firstPageAddStar();
const secondPageInterface =  new secondPageAddStar();
const thirdPageInterface =  new thirdPageAddStar();

const popUpPage = new popUpInfo();

const galaxyPageInterface =  new pageAddGalaxy();


const chatButton = document.getElementById("chatButton");

chatButton.addEventListener("click", (event) => {
    event.stopImmediatePropagation();
    closeOption();
    chatInter.openInterface()
});
