<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: login-inscription/login.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CosmicLink</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="style_site.css">


    <link rel="stylesheet" href="./chat/css/chat.css">
    <link rel="stylesheet" href="./chat/css/message.css">

    <link rel="stylesheet" href="addStarUI.css">
    <link rel="stylesheet" href="menu.css">
    <link rel="stylesheet" href="style_site.css">

</head>

<body id="background">

    <?php
    require 'connect.php';
    
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



    <div id="menu" >
        <div class= "dropUp options">
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

    <?php
    require 'connect.php';
    require './classes/universe.php';
    //TODO CODAGE EN DUR: récupérer id (session) et universe id (requête SQL)
    $u1 = new Universe(83,1);
       
    ?>
</body>

</html>