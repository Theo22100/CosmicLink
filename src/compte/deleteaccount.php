<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}

// Vérifier que le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_SESSION['id'];


    $servername = "localhost";
    $username = "root";
    $password_db = "root";
    $dbname = "projet";


    $password = $_POST["password"];

    // Connexion à la base de données + Détection mot de passe
    try {
        $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        // Configuration des attributs de connexion
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $requete0 = $connexion->prepare("SELECT id,password FROM membre WHERE id = :id");
        $requete0->execute(array(':id' => $id));

        $result = $requete0->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "La suppression a échoué : " . $e->getMessage();
        echo "<br>";
    }

    if ($result && password_verify($password, $result['password'])) {
         try {
            // Supprimer les étoiles associées aux galaxies de l'univers
            $requeteEtoiles = "DELETE etoile FROM etoile 
                       INNER JOIN galaxie ON etoile.id_galaxie = galaxie.id_galaxie 
                       WHERE galaxie.id_univers IN (SELECT id_univers FROM univers WHERE id_membre = :id)";
            $stmtEtoiles = $connexion->prepare($requeteEtoiles);
            $stmtEtoiles->bindParam(':id', $id);
            $stmtEtoiles->execute();
        } catch (PDOException $e) {
            echo "La suppression des étoiles a échoué : " . $e->getMessage();
            echo "<br>";
        }

        // Supprimer les références dans la table "galaxie"
        try {
            // Supprimer les galaxies de l'univers
            $requeteGalaxies = "DELETE FROM galaxie 
                                WHERE id_univers IN (SELECT id_univers FROM univers WHERE id_membre = :id)";
            $stmtGalaxies = $connexion->prepare($requeteGalaxies);
            $stmtGalaxies->bindParam(':id', $id);
            $stmtGalaxies->execute();
        } catch (PDOException $e) {
            echo "La suppression des galaxies a échoué : " . $e->getMessage();
            echo "<br>";
        }




        // Supprimer les lignes dans la table "univers"
        try {
            $requeteUnivers = "DELETE FROM univers WHERE id_membre = :id";
            $stmtUnivers = $connexion->prepare($requeteUnivers);
            $stmtUnivers->bindParam(':id', $id);
            $stmtUnivers->execute();
        } catch (PDOException $e) {
            echo "La suppression Univers a échoué : " . $e->getMessage();
            echo "<br>";
        } 

        //Supprimer dans table Ami
        try {
            $requeteAmi = "DELETE FROM ami WHERE sender = :id OR receiver = :id";
            $stmtAmi = $connexion->prepare($requeteAmi);
            $stmtAmi->bindParam(':id', $id);
            $stmtAmi->execute();
        } catch (PDOException $e) {
            echo "La suppression Ami a échoué : " . $e->getMessage();
            echo "<br>";
        }

        //Supprimer dans table Chat
        try {
            $requeteChat = "DELETE FROM chat WHERE sender = :id OR receiver = :id";
            $stmtChat = $connexion->prepare($requeteChat);
            $stmtChat->bindParam(':id', $id);
            $stmtChat->execute();
        } catch (PDOException $e) {
            echo "La suppression Chat a échoué : " . $e->getMessage();
            echo "<br>";
        }

        // Supprimer la ligne dans la table "membre"
        try {
            $requeteMembre = "DELETE FROM membre WHERE id = :id";
            $stmtMembre = $connexion->prepare($requeteMembre);
            $stmtMembre->bindParam(':id', $id);
            $stmtMembre->execute();
        } catch (PDOException $e) {
            echo "La suppression Membre a échoué : " . $e->getMessage();
            echo "<br>";
        }


        

        //SUPPRIME LE REPERTOIRE PHOTO DE PROFIL

        $repertoire = '../../img/profil/' . $id;

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
        $connexion = null;
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