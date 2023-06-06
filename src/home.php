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
    <link rel="stylesheet" href="./chat/css/connect.css">

    <link rel="stylesheet" href="menu.css">
    <link rel="stylesheet" href="style_site.css">


    <link rel="stylesheet" href="global.css">
    <link rel="stylesheet" href="./css/addStar.css">
    <link rel="stylesheet" href="./css/popUp.css">

</head>


<body id="background">

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

    include("./chat/chat.php");
    include("./chat/message.php");
    include("./chat/connect.php")

        ?>

    <div id="invisible" class="hidden"> </div>


    <script src="./interfaces/InterfaceClass.js"></script>
    <script src="./interfaces/AddStarPageOneInterface.js"></script>
    <script src="./interfaces/AddStarPageSecondInterface.js"></script>
    <script src="./interfaces/AddStarPageThirdInterface.js"></script>

    <script src="./interfaces/AddGalaxyInterface.js"></script>

    <script src="./interfaces/popUpInfoInterface.js"></script>

    <script src="./js/home.js"></script>
    <script src="./js/star.js"></script>
    <script src="./js/StarClass.js"></script>
    <script src="./js/GalaxyClass.js"></script>

    <script src="./js/galaxy.js"></script>
    <script src="./chat/js/chat.js"></script>
    <script src="./chat/js/message.js"></script>
    <script src="./chat/js/connect.js"></script>



    <?php
    require 'connect.php';
    require './classes/universe.php';
    $user_id = $_SESSION['id'];
    $universe_id;

    try {
        //Recherche de l'univers pour ce membre
        $sql = $handler->prepare("SELECT id_univers FROM univers WHERE id_membre=:id_membre");
        $sql->bindParam(':id_membre', $user_id);
        $sql->execute();

        $row = $sql->fetch(PDO::FETCH_ASSOC);
        $universe_id = $row['id_univers'];
    } catch (PDOException $e) {
        echo 'Echec : ' . $e->getMessage();
    }
    $u1 = new Universe($user_id, $universe_id);
    $u1->fetchGalaxies(false);

    ?>
</body>

</html>