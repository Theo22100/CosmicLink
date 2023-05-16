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
        $id=$_SESSION['id'];

        $password= $_POST["password"]; 

        // Connexion à la base de données
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
            // Configuration des attributs de connexion
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "La connexion a échoué : " . $e->getMessage();
        }
        $requete0=$conn->prepare("SELECT id,password FROM membre WHERE id = :id");
        $requete0->execute(array(':id' => $id));

        $result = $requete0->fetch(PDO::FETCH_ASSOC);
        
        if ($result && password_verify($password, $result['password'])) {
            // Identifiant unique de l'utilisateur
            $id = $_SESSION['id'];

            // Requête SQL pour supprimer le compte utilisateur
            $requete1 = "DELETE FROM membre WHERE id = :id";

            // Préparation de la requête SQL
            $stmt = $conn->prepare($requete1);

            // Association de la valeur à la variable
            $stmt->bindParam(':id', $id);

            $stmt->execute();
            // Envoie une pop up pour prévenir du renvoie
            echo '<script>';
            echo 'alert("Le compte utilisateur a été supprimé avec succès. Vous allez être redirigé(e) vers la page de login.");';
            echo 'setTimeout(function(){ window.location.href = "deconnexion.php"; }, 500);';
            echo '</script>';
        }else{
            header("Location: compte.php?message=deletemdp");
        }

        // Fermeture de la connexion à la base de données
        $conn = null;
    }
?>