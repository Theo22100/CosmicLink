<?php
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}



$serveur = "localhost";
$login = "root";
$pass = "root";
$dbname = "projet";
if($_SESSION['id']!=$_GET["id"]){ //Ne pas s'effacer 
    
    try {
        $connexion = new PDO("mysql:host=$serveur;dbname=$dbname", $login, $pass);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $requetedel = "DELETE FROM `membre` WHERE id= :id";



        //Prepare la déclaration DELETE
        $tempo = $connexion->prepare($requetedel);

        $id = $_GET['id'];

        //Lie la variable $id avec :id
        $tempo->bindValue(':id', $id);


        $resultat = $tempo->execute();


    } catch (PDOException $e) {
        echo 'Echec Effacer: ' . $e->getMessage();
        header("Location: list_user.php?message=supechoue");
    }
    
    
}else{
    header("Location: list_user.php?message=supadmin");
}

$connexion = null;

?>