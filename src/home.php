<?php
session_start();
if (!isset($_SESSION['login'])) {
	header('Location: login-inscription/login.php');
}

if (isset($_GET['x'])&& isset($_GET['y'])){
    $x = intval($_GET['x']);
    $y = intval($_GET['y']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CosmicLink</title>
    <link rel="stylesheet" href="style_site.css">
    <link rel="stylesheet" href="addStarUI.css">
    <link rel="stylesheet" href="menu.css">
</head>




<body id="background">

    <?php
        echo "soup";
        echo $x;
        echo $y;

        try {
        $servername = "localhost";
        $dbname = "projet";
        $sqlusername = "root";
        $sqlpassword = "root";
        
        $handler = new PDO("mysql:host=$servername;dbname=$dbname",$sqlusername,$sqlpassword);
        $handler->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        
        //TODO si inscription (comment récupérer cette info ?): créer un nouvel univers
        }
        catch (PDOException $e){
            echo 'Echec Connexion : ' .$e->getMessage();
        }


    ?>

    <div id="star-option" class="hidden">
        <div class="option" id="edit" onclick="showEdit()"> Edit</div>
        <div class="option" id="move" onclick="moveStar()"> Move</div>
        <div class="option" id="link"> Link</div>
        <div class="option" id="remove" onclick="removeStar()"> remove</div>
    </div>

    <div id="galaxy-option" class="hidden">
        <div class="option" id="edit" onclick="showEditGalaxy()"> Edit</div>
        <div class="option" id="move" onclick="moveGalaxy()"> Move</div>
        <div class="option" id="remove" onclick="removeGalaxy()"> remove</div>
    </div>

    <div id="univers" onclick="hideOption()">
        <div id="origin"></div>
    </div>



    <div class="ui hidden" id="ui">
        <svg class="icon" xlmns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" role="img"
             onclick="closeStarGui()">

            <rect x="3" y="5" width="18" height="16" fill="white"></rect>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5051 0.135254C14.9528 0.135152 17.3455 0.860879 19.3807 2.22066C21.416 3.58044 23.0022 5.51321 23.939 7.77453C24.8757 10.0359 25.1209 12.5242 24.6434 14.9248C24.166 17.3255 22.9873 19.5306 21.2566 21.2614C19.5259 22.9922 17.3207 24.1709 14.9201 24.6485C12.5195 25.126 10.0311 24.881 7.76979 23.9443C5.50843 23.0076 3.57561 21.4214 2.21576 19.3862C0.855913 17.3511 0.130107 14.9583 0.130127 12.5107C0.130141 9.22858 1.43392 6.08092 3.75467 3.76009C6.07542 1.43926 9.22304 0.135377 12.5051 0.135254V0.135254ZM7.13525 16.4156C6.9463 16.6101 6.84148 16.8711 6.84346 17.1423C6.84544 17.4135 6.95406 17.6729 7.14583 17.8647C7.3376 18.0564 7.59711 18.1649 7.86827 18.1668C8.13943 18.1687 8.40044 18.0638 8.59488 17.8748L12.4997 13.9699L16.4103 17.8805C16.6047 18.0698 16.8659 18.1749 17.1372 18.1731C17.4085 18.1712 17.6682 18.0626 17.8601 17.8707C18.0519 17.6788 18.1605 17.4191 18.1623 17.1478C18.164 16.8765 18.0589 16.6153 17.8695 16.421L13.9592 12.5106L17.8847 8.58516C18.072 8.39039 18.1754 8.12994 18.1727 7.85976C18.1701 7.58958 18.0616 7.33122 17.8705 7.14017C17.6795 6.94911 17.4211 6.8406 17.1509 6.83794C16.8808 6.83529 16.6203 6.93869 16.4255 7.12594L12.4997 11.051L8.57998 7.13125C8.38644 6.93769 8.12393 6.82894 7.8502 6.82892C7.57647 6.82891 7.31394 6.93763 7.12038 7.13118C6.92681 7.32472 6.81806 7.58724 6.81804 7.86097C6.81803 8.13469 6.92675 8.39722 7.1203 8.59078L11.0402 12.5106L7.13525 16.4156Z" fill="#979797"></path>
        </svg>
        <div class="create" id="starMenu">
            <div>
                <p> ADD STAR</p>
            </div>
            <label for="starName">Star Name:</label>
            <input type="text" name="starName" id="starName" placeholder="Name of your star">
            <label for="starDesc">Description</label>
            <textarea name="starDesc" id="starDesc" rows="4" cols="50" placeholder="Description of your star"></textarea>
            <button onclick="star()">Done</button>
        </div>
    </div>

    <div class="ui hidden" id="galaxyUi">
        <svg class="icon" xlmns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" role="img"
             onclick="closeGalaxyGui()">

            <rect x="3" y="5" width="18" height="16" fill="white"></rect>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5051 0.135254C14.9528 0.135152 17.3455 0.860879 19.3807 2.22066C21.416 3.58044 23.0022 5.51321 23.939 7.77453C24.8757 10.0359 25.1209 12.5242 24.6434 14.9248C24.166 17.3255 22.9873 19.5306 21.2566 21.2614C19.5259 22.9922 17.3207 24.1709 14.9201 24.6485C12.5195 25.126 10.0311 24.881 7.76979 23.9443C5.50843 23.0076 3.57561 21.4214 2.21576 19.3862C0.855913 17.3511 0.130107 14.9583 0.130127 12.5107C0.130141 9.22858 1.43392 6.08092 3.75467 3.76009C6.07542 1.43926 9.22304 0.135377 12.5051 0.135254V0.135254ZM7.13525 16.4156C6.9463 16.6101 6.84148 16.8711 6.84346 17.1423C6.84544 17.4135 6.95406 17.6729 7.14583 17.8647C7.3376 18.0564 7.59711 18.1649 7.86827 18.1668C8.13943 18.1687 8.40044 18.0638 8.59488 17.8748L12.4997 13.9699L16.4103 17.8805C16.6047 18.0698 16.8659 18.1749 17.1372 18.1731C17.4085 18.1712 17.6682 18.0626 17.8601 17.8707C18.0519 17.6788 18.1605 17.4191 18.1623 17.1478C18.164 16.8765 18.0589 16.6153 17.8695 16.421L13.9592 12.5106L17.8847 8.58516C18.072 8.39039 18.1754 8.12994 18.1727 7.85976C18.1701 7.58958 18.0616 7.33122 17.8705 7.14017C17.6795 6.94911 17.4211 6.8406 17.1509 6.83794C16.8808 6.83529 16.6203 6.93869 16.4255 7.12594L12.4997 11.051L8.57998 7.13125C8.38644 6.93769 8.12393 6.82894 7.8502 6.82892C7.57647 6.82891 7.31394 6.93763 7.12038 7.13118C6.92681 7.32472 6.81806 7.58724 6.81804 7.86097C6.81803 8.13469 6.92675 8.39722 7.1203 8.59078L11.0402 12.5106L7.13525 16.4156Z" fill="#979797"></path>
        </svg>
        <div class="create" id="galaxyMenu">
            <div>
             <p> ADD GALAXY</p>
            </div>
            <label for="galaxyName">Galaxy Name:</label>
            <input type="text" name="galaxyName" id="galaxyName">
            <label for="galaxyDesc">Description</label>
            <textarea name="galaxyDesc" id="galaxyDesc" rows="4" cols="50"></textarea>
            <button onclick="galaxy()">Done</button>
        </div>
    </div>


    <div id="menu" onclick="showOption()">
        <!-- <button class="options" id="circle" onclick="showOption()" > </button> -->
        <div class= "dropUp">
            <img id="editStarGalaxy" src="../img/crayon.png" class="options hidden">
            <!-- <button class="options hidden" > test</button> -->
            <div class="dropUp-content">
                <button class="dropUp-Option" onclick="openStarGui()">Star</button>
                <button class="dropUp-Option" onclick="openGalaxyGui()">Galaxy</button>
            </div>
        </div>
        <button class= "options hidden" onclick="">Chat</button>
        <div class= "dropUp">
            <button class="options hidden">Mon Compte</button>
            <div class="dropUp-content">
                <button class="dropUp-Option" onclick="location.href='./compte/compte.php'">Modifier</button>
                <button class="dropUp-Option" onclick="location.href='./compte/deconnexion.php'">Deconnexion</button>
            </div>
        </div>
        <button class= "options hidden" id="done" onclick="confirm()">Done</button>
    </div>










    <script src="./js/home.js"></script>
    <script src="./js/star.js"></script>
    <script src="./js/galaxy.js"></script>
</body>
</html>