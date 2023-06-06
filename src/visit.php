<?php
if(isset($_GET['visit_id'])) {
    $visit_id = intval($_GET['visit_id']);
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

</head>

<body id="background">


    <div id="univers">
        <div id="origin"></div>
    </div>



    <div id="menu">
        <button class="options hidden" onclick="location.href='./home.php'">Back to Galaxy</button>
        <button class="options hidden" id="done">Done</button>
    </div>


    <div id="invisible" class="hidden"> </div>

    <script src="./js/home.js"></script>
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
        $sql = $handler->prepare("SELECT id_univers, public FROM univers WHERE id_membre=:id_membre");
        $sql->bindParam(':id_membre', $visit_id);
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
            echo '<h1>This universe is private</h1>';
        }
    }
    catch (Exception $e){

    }
   

    ?>
</body>

</html>