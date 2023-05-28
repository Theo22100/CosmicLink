<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}

// Vérifier que le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password_db = "root";
    $dbname = "projet";
    $id = $_SESSION['id'];

    $password = $_POST["password"];

    // Connexion à la base de données
    try {
        $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        // Configuration des attributs de connexion
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $requete0 = $connexion->prepare("SELECT id,password FROM membre WHERE id = :id");
        $requete0->execute(array(':id' => $id));

        $result = $requete0->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "La suppression a échoué : " . $e->getMessage();
    }

    if ($result && password_verify($password, $result['password'])) {
        // Identifiant unique de l'utilisateur
        // Supprimer les références dans la table "galaxie"
        try {
            $requete1 = "DELETE FROM galaxie WHERE id_univers IN (SELECT id_univers FROM univers WHERE id = :id)";
            $stmt1 = $connexion->prepare($requete1);
            $stmt1->bindParam(':id', $id);
            $stmt1->execute();
        } catch (PDOException $e) {
            echo "La suppression Galaxie a échoué : " . $e->getMessage();
        }

        // Supprimer les lignes dans la table "univers"
        try {
            $requete2 = "DELETE FROM univers WHERE id = :id";
            $stmt2 = $connexion->prepare($requete2);
            $stmt2->bindParam(':id', $id);
            $stmt2->execute();
        } catch (PDOException $e) {
            echo "La suppression Univers a échoué : " . $e->getMessage();
        }

        // Supprimer la ligne dans la table "membre"
        try {
            $requete3 = "DELETE FROM membre WHERE id = :id";
            $stmt3 = $connexion->prepare($requete3);
            $stmt3->bindParam(':id', $id);
            $stmt3->execute();
        } catch (PDOException $e) {
            echo "La suppression Membre a échoué : " . $e->getMessage();
        }

        //SUPPRIME LE REPERTOIRE PHOTO DE PROFIL

        $repertoire = '../img/profil/' . $id;

        // Récupérer la liste des fichiers dans le répertoire
        $fichiers = glob($repertoire . '/*');

        // Parcourir la liste des fichiers et les supprimer un par un
        foreach ($fichiers as $fichier) {
            if (is_file($fichier)) {
                unlink($fichier);
            }
        }

        // Supprimer le répertoire s'il est vide
        if (count(glob($repertoire . '/*')) === 0) {
            rmdir($repertoire);
        }

        // Envoie une pop up pour prévenir du renvoie

        echo '<script>';
        echo 'alert("Le compte utilisateur a été supprimé avec succès. Vous allez être redirigé(e) vers la page de login.");';
        echo 'setTimeout(function(){ window.location.href = "deconnexion.php"; }, 500);';
        echo '</script>';


    } else {
        header("Location: compte.php?message=deletemdp");
    }

    // Fermeture de la connexion à la base de données
    $connexion = null;
}
?>