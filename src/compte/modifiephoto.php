<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}

var_dump($_FILES); // affiche les informations sur le fichier téléchargé


$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_FILES['image']['size'] > 2 * 1024 * 1024) { 
        // Le fichier dépasse la taille maximale autorisée (2 Mo)
        // Gérer l'erreur ou afficher un message à l'utilisateur
        header("Location: compte.php?message=phototaille");
        exit;

    } else {
        try {
            $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo 'Echec Compte Connexion BDD : ' . $e->getMessage();
            echo '<br>';
        }
        
        try {
            $image = $_POST["image"];
            $_SESSION['image'] = $image; //NE PAS OUBLIER POUR LE LOGIN DE RAJOUTER SESSION IMAGE
            $stmt = $connexion->prepare("
                                    UPDATE membre 
                                    SET image = :img 
                                    WHERE id = '$_SESSION[id]';'");


            $stmt->bindParam(':img', $_FILES['image']['name']);
            $stmt->execute();



        } catch (PDOException $e) {
            echo 'Echec Ajout: ' . $e->getMessage();
            echo '<br>';
            header("Location: compte.php?message=photoechoue");
        }
        $tmpName = $_FILES['image']['tmp_name'];
        $name = $_FILES['image']['name'];
        move_uploaded_file($tmpName, '../../img/profil/' . $_SESSION['id'] . '/' . $name);
        header("Location: compte.php?message=photoreussi");

    }
}

$connexion = null;

?>