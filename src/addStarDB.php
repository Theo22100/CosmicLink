<?php 
if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['size']) && isset($_POST['descr'])) {
    $name = ($_POST['name']);
    $descr = ($_POST['descr']);
    $size = intval($_POST['size']);
    $y = intval($_POST['y']);
    $x = intval($_POST['x']);
}

require 'connect.php';

try {
    $id_galaxie = 2;

    //TODO Prepare statement 
    //TODO Récupérer valeurs réelles de nom, descr, taille, id_galaxie etc

    $query = $handler->query("INSERT INTO etoile (nom,descr,cox,coy,taille,id_galaxie) VALUES ('$name','$descr','$x','$y','$size','$id_galaxie')");


} catch (PDOException $e) {
    
   echo 'Echec Requête : ' . $e->getMessage();
}
?>