<?php
$password = $_POST['password'];
$mail = $_POST['mail'];

$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Utilisez la requête préparée pour éviter les attaques par injection SQL
        $sql = $conn->prepare("SELECT id, pseudo, prenom, nom, datenaissance, dateinscription, mail, password, rang FROM membre WHERE mail = :mail");
        $sql->execute(array(':mail' => $mail));

        $result = $sql->fetch(PDO::FETCH_ASSOC);
        
        if ($result && password_verify($password, $result['password'])) {
            // La requête n'est pas vide et le mot de passe est correct
            $donnees = $result['id'];
            $donneespseudo = $result['pseudo'];
            $donneesprenom = $result['prenom'];
            $donneesnom = $result['nom'];
            $donneesdateinscription = $result['dateinscription'];
            $donneesdatenaissance = $result['datenaissance'];
            $donneesmail = $result['mail'];
            $donneesrang = $result['rang'];

            session_start();
            $_SESSION['id'] = $donnees;
            $_SESSION['prenom'] = $donneesprenom;
            $_SESSION['nom'] = $donneesnom;
            $_SESSION['pseudo'] = $donneespseudo;
            $_SESSION['datenaissance'] = $donneesdatenaissance;
            $_SESSION['dateinscription'] = $donneesdateinscription;
            $_SESSION['mail'] = $donneesmail;
            $_SESSION['rang'] = $donneesrang;
            header("Location: home.php");
        } else {
            // La requête est vide ou le mot de passe est incorrect
            header("Location: login.php?message=echoue");
        }
    }
    catch (PDOException $e){
        echo 'Echec Connexion : ' .$e->getMessage();
    }
}
?>