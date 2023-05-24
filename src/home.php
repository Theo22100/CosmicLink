<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: login-inscription/login.php');
}

if (isset($_GET['x']) && isset($_GET['y'])) {
    $x = intval($_GET['x']);
    $y = intval($_GET['y']);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CosmicLink</title>


    <link rel="stylesheet" href="./chat/css/chat.css">
    <link rel="stylesheet" href="./chat/css/message.css">

    <link rel="stylesheet" href="addStarUI.css">
    <link rel="stylesheet" href="menu.css">
    <link rel="stylesheet" href="style_site.css">

</head>




<body id="background">

    <?php

    try {
        $servername = "localhost";
        $dbname = "projet";
        $sqlusername = "root";
        $sqlpassword = "root";

        $handler = new PDO("mysql:host=$servername;dbname=$dbname", $sqlusername, $sqlpassword);
        $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        //TODO si inscription (comment récupérer cette info ?): créer un nouvel univers
    } catch (PDOException $e) {
        echo 'Echec Connexion : ' . $e->getMessage();
    }


    ?>

    <div id="contextMenu" class="hidden">
        <div class="option" id="edit"> Edit</div>
        <div class="option" id="move"> Move</div>
        <div class="option" id="link"> Link</div>
        <div class="option" id="remove"> remove</div>
    </div>

    <div id="univers">
        <div id="origin"></div>
    </div>

    <div id="menu">
        <div class="dropUp options">
            <img id="editStarGalaxy" src="../img/crayon.png" class="options hidden">
            <div class="dropUp-content">
                <button class="dropUp-Option" onclick="openCreateStar(event)">Star</button>
                <button class="dropUp-Option" onclick="openCreateGalaxy(event)">Galaxy</button>
            </div>
        </div>
        <button class="options hidden" onclick="openChat(event)">Chat</button>
        <div class="dropUp options">
            <button class="options hidden">Mon Compte</button>
            <div class="dropUp-content">
                <button class="dropUp-Option" onclick="location.href='./compte/compte.php'">Settings</button>
                <button class="dropUp-Option" onclick="location.href='./compte/deconnexion.php'">Logout</button>
            </div>
        </div>
        <button class="options hidden" id="done">Done</button>
    </div>


    <?php

    include("addStar.php");
    include("addGalaxy.php");

    include("./chat/chat.php");
    include("./chat/message.php");

    ?>

    <div id="invisible" class="hidden"> </div>

    <script src="./js/home.js"></script>
    <script src="./js/star.js"></script>
    <script src="./js/StarClass.js"></script>

    <script src="./js/galaxy.js"></script>
    <script src="./chat/js/chat.js"></script>
    <script src="./chat/js/message.js"></script>
    <script src="./chat/js/connect.js"></script>
</body>

</html>