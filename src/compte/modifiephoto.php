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
        //echo "<br> Taille : ".$_FILES['image']['size']."<br>";
        
        try {
            $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo 'Echec Compte Connexion BDD : ' . $e->getMessage();
            echo '<br>';
        }

        try {
            $image = $_POST["image"];
            $_SESSION['image'] = $_FILES['image']['name'];
            $stmt = $connexion->prepare("
                                    UPDATE membre 
                                    SET image = :img 
                                    WHERE id = :id ;");


            $stmt->bindParam(':img', $_FILES['image']['name']);
            $stmt->bindParam(':id', $_SESSION['id']);
            $stmt->execute();



        } catch (PDOException $e) {
            echo 'Echec Ajout: ' . $e->getMessage();
            echo '<br>';
            header("Location: compte.php?message=photoechoue");
        }
        //Supprime l'ancienne photo


        $repertoire = '../../img/profil/' . $_SESSION['id'];

        // Récupérer la liste des fichiers dans le répertoire
        $fichiers = glob($repertoire . '/*');

        // Parcourir la liste des fichiers et les supprimer un par un (nettoie toutes les photos)
        foreach ($fichiers as $fichier) {
            if (is_file($fichier)) {
                unlink($fichier);
            }
        }



        //Ajoute la photo
        $tmpName = $_FILES['image']['tmp_name'];
        $name = $_FILES['image']['name'];
        move_uploaded_file($tmpName, '../../img/profil/' . $_SESSION['id'] . '/' . $name);
        header("Location: compte.php?message=photoreussi");

    }
}

$connexion = null;

?>