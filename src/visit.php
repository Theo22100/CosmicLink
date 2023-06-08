<?php
if(isset($_GET['visit_id'])) {
    $visit_id = $_GET['visit_id'];
}
else {
    header('Location: ./home.php');
}
  
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CosmicLink</title>

    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="menu.css">
    <link rel="stylesheet" href="style_site.css">
    <link rel="stylesheet" href="global.css">
    <link rel="stylesheet" href="./css/popUp.css">

</head>

<body id="background">


    <div id="univers">
        <div id="origin"></div>
    </div>



    <div id="menu" style="display: flex; justify-content: center;">
        <button class="options hidden" onclick="location.href='./home.php'">Back to Galaxy</button>
    </div>


    <div id="invisible" class="hidden"> </div>


    <script src="./js/deplacementEspace.js"></script>

    <script src="./interfaces/InterfaceClass.js"></script>
    <script src="./interfaces/popUpInfoInterface.js"></script>

    
    <script src="./js/visit.js"></script>

    <script src="./js/star.js"></script>
    <script src="./js/StarClass.js"></script>
    <script src="./js/GalaxyClass.js"></script>
    <script src="./js/galaxy.js"></script>



    <?php
    require 'connect.php';
    require './classes/universe.php';
    $universe_id;
    $public = 0;

    try {
        //Recherche de l'univers pour ce membre
        $sql = $handler->prepare("SELECT univers.id_univers, univers.public FROM univers INNER JOIN membre WHERE membre.pseudo=:pseudo AND univers.id_membre=membre.id");
        $sql->bindParam(':pseudo', $visit_id);
        $sql->execute();

       
    } catch (PDOException $e) {
        echo 'Echec : ' . $e->getMessage();
    }
    try {
        if ($sql->rowCount() == 0) {
            throw new Exception("Universe doesn't exist");
        } else {
            $row = $sql->fetch(PDO::FETCH_ASSOC);
            $universe_id = $row['id_univers'];
            $public = $row['public'];
        }


        if ($public == 1) {
            $u1 = new Universe($visit_id, $universe_id);            
            $u1->fetchGalaxies(true);
        } else {
            echo '<h1 style="color:white;>This universe is private</h1>';
        }
    }
    catch (Exception $e){

    }
   

    ?>
</body>

</html>