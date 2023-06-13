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
    <link rel="stylesheet" href="./global/css/menu.css">
    <link rel="stylesheet" href="./global/css/style_site.css">
    <link rel="stylesheet" href="./global//css/global.css">
    <link rel="stylesheet" href="./univers/css/popUp.css">

</head>

<body id="background">


    <div id="univers">
        <div id="origin"></div>
    </div>



    <div id="menu" style="display: flex; justify-content: center;">
        <button class="options hidden" onclick="location.href='./home.php'">Back to Galaxy</button>
    </div>


    <div id="invisible" class="hidden"> </div>


    <script src="./global/js/InterfaceClass.js"></script>
    <script src="./univers/galaxy/errorGalaxyInterface.js"></script>
    <script src="./univers/contextMenuInterface.js"></script>
    <script src="./univers/deplacementEspace.js"></script>

    <script src="./univers/popUpInfoInterface.js"></script>

    
    <script src="./global/js/visit.js"></script>

    <script src="./univers/star/star.js"></script>
    <script src="./univers/star/StarClass.js"></script>
    <script src="./univers/galaxy/GalaxyClass.js"></script>
    <script src="./univers/galaxy/galaxy.js"></script>



    <?php
    require 'connect.php';
    require './univers/classes/universe.php';
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