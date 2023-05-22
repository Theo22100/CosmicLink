<?php 
if (isset($_POST['x']) && isset($_POST['y'])) {
    $x = intval($_POST['x']);
    $y = intval($_POST['y']);
}

$servername = "localhost";
$dbname = "projet";
$sqlusername = "root";
$sqlpassword = "root";

try {
    $handler = new PDO("mysql:host=$servername;dbname=$dbname", $sqlusername, $sqlpassword);
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $nom = 'test3';
    $descr = "test";
    $taille = 1;
    $id_galaxie = 2;

    //TODO Prepare statement 
    //TODO Récupérer valeurs réelles de nom, descr, taille, id_galaxie etc

    $query = $handler->query("INSERT INTO etoile (nom,descr,cox,coy,taille,id_galaxie) VALUES ('$nom','$descr','$x','$y','$taille','$id_galaxie')");


} catch (PDOException $e) {
    
   echo 'Echec Connexion : ' . $e->getMessage();
}