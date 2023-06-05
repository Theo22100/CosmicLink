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
    }

    if ($result && password_verify($password, $result['password'])) {
         // Supprimer les références dans la table "galaxie"
        try {
            // Récupérer id_galaxie
            $requeteIdGalaxie = "SELECT id_galaxie FROM galaxie WHERE id_univers IN (SELECT id_univers FROM univers WHERE id = :id)";
            $stmtIdGalaxie = $connexion->prepare($requeteIdGalaxie);
            $stmtIdGalaxie->bindParam(':id', $id);
            $stmtIdGalaxie->execute();

            $row = $stmtIdGalaxie->fetch(PDO::FETCH_ASSOC);
            $id_galaxie = $row['id_galaxie'];
        } catch (PDOException $e) {
            echo "Recuperation Id galaxie échoué : " . $e->getMessage();
        }


        //Supprimer dans table Etoiles
        try {
            $requeteEtoile = "DELETE FROM etoile WHERE id_galaxie = :idgalaxie";
            $stmtEtoile = $connexion->prepare($requeteEtoile);
            $stmtEtoile->bindParam(':idgalaxie', $id_galaxie);
            $stmtEtoile->execute();
        } catch (PDOException $e) {
            echo "Suppression Etoiles a échoué : " . $e->getMessage();
        }

         // Supprimer les références dans la table "galaxie"
         try {
            // Récupérer id_univers
            $requeteGalaxie = "DELETE FROM galaxie WHERE id_univers IN (SELECT id_univers FROM univers WHERE id = :id)";
            $stmtGalaxie = $connexion->prepare($requeteGalaxie);
            $stmtGalaxie->bindParam(':id', $id);
            $stmtGalaxie->execute();
        } catch (PDOException $e) {
            echo "La suppression Galaxie a échoué : " . $e->getMessage();
        }




        // Supprimer les lignes dans la table "univers"
        try {
            $requeteUnivers = "DELETE FROM univers WHERE id = :id";
            $stmtUnivers = $connexion->prepare($requeteUnivers);
            $stmtUnivers->bindParam(':id', $id);
            $stmtUnivers->execute();
        } catch (PDOException $e) {
            echo "La suppression Univers a échoué : " . $e->getMessage();
        }

        //Supprimer dans table Ami
        try {
            $requeteAmi = "DELETE FROM ami WHERE id_membre1 = :id OR id_membre2 = :id";
            $stmtAmi = $connexion->prepare($requeteAmi);
            $stmtAmi->bindParam(':id', $id);
            $stmtAmi->execute();
        } catch (PDOException $e) {
            echo "La suppression Ami a échoué : " . $e->getMessage();
        }

        // Supprimer la ligne dans la table "membre"
        try {
            $requeteMembre = "DELETE FROM membre WHERE id = :id";
            $stmtMembre = $connexion->prepare($requeteMembre);
            $stmtMembre->bindParam(':id', $id);
            $stmtMembre->execute();
        } catch (PDOException $e) {
            echo "La suppression Membre a échoué : " . $e->getMessage();
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