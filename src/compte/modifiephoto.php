<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}
$tailleMax = 2 * 1024 * 1024; // 2 Mo
var_dump($_FILES); // affiche les informations sur le fichier téléchargé


$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if ($_FILES['image']['size'] >= $tailleMax || $_FILES['image']['error'] !== UPLOAD_ERR_OK) { //Permet de renvoyer si soucis ou taille trop grande
        // Le fichier dépasse la taille maximale autorisée (2 Mo)
        // Gérer l'erreur ou afficher un message à l'utilisateur
        header("Location: compte.php?message=phototaille");

        exit();

    } else {

        $repertoire = '../../img/profil/' . $_SESSION['id'] . "/";
        if (!file_exists($repertoire)){
            mkdir($repertoire, 0777, true);
        }
        $fichiers = glob($repertoire . 'profile-pic.*');

        // Parcourir la liste des fichiers et les supprimer un par un (nettoie toutes les photos)
        foreach ($fichiers as $fichier) {
            if (is_file($fichier)) {
                unlink($fichier);
            }
        }

        //Ajoute la photo
        $tmpName = $_FILES['image']['tmp_name'];
        $name = $_FILES['image']['name'];
        
        
        list(,$type) =explode('.', $name);
        move_uploaded_file($tmpName, $repertoire . 'profile-pic.' . $type);
        header("Location: compte.php?message=modif"); // Modif réussi
    }
}

$connexion = null;

?>