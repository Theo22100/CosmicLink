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

    <link rel="stylesheet" href="./chat/css/chat.css">
    <link rel="stylesheet" href="./chat/css/message.css">
    <link rel="stylesheet" href="./chat/css/connect.css">
    <link rel="stylesheet" href="./chat/css/friends.css">

    <link rel="stylesheet" href="./css/menu.css">
    <link rel="stylesheet" href="./css/style_site.css">


    <link rel="stylesheet" href="./css/global.css">
    <link rel="stylesheet" href="./css/addStar.css">
    <link rel="stylesheet" href="./css/popUp.css">

    <link rel="stylesheet" href="./error_galaxy/errorGalaxy.css">

</head>


<body id="background">

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
       
        <button class="options hidden" id="chatButton"><img  src="../img/chat.png" class="options hidden"></button>
        <div class="dropUp options">
            <button class="options hidden" id="userButton"><img  src="../img/compte.png" class="options hidden"></button>
            <div class="dropUp-content">
                <button class="dropUp-Option" onclick="location.href='./compte/compte.php'">Settings</button>
                <button class="dropUp-Option" onclick="location.href='./compte/deconnexion.php'">Logout</button>
            </div>
        </div>
        <button class="options hidden" id="done">Done</button>
    </div>

    <div id="invisible" class="hidden"> </div>

    
    <script src="./interfaces/InterfaceClass.js"></script>
    <script src="./interfaces/errorGalaxyInterface.js"></script>
    <script src="./interfaces/contextMenuInterface.js"></script>
    <script src="./js/deplacementEspace.js"></script>

    <script src="./interfaces/AddStarPageOneInterface.js"></script>
    <script src="./interfaces/AddStarPageSecondInterface.js"></script>
    <script src="./interfaces/AddStarPageThirdInterface.js"></script>

    <script src="./interfaces/AddGalaxyInterface.js"></script>

    <script src="./interfaces/popUpInfoInterface.js"></script>

    


    <script src="./interfaces/chatInterface.js"></script>
    <script src="./interfaces/friendsInterface.js"></script>
    <script src="./interfaces/connectInterface.js"></script>
    <script src="./interfaces/messageInterface.js"></script>
    
    <script src="./js/home.js"></script>
    
    <script src="./js/star.js"></script>
    <script src="./js/StarClass.js"></script>
    <script src="./js/GalaxyClass.js"></script>

    <script src="./js/galaxy.js"></script>

    

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