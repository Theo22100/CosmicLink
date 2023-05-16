

<?php
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}



$id_modif=$_GET["num"];
$mail=$_POST['mail'];



$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        $requete0 = "SELECT COUNT(mail) FROM membre WHERE mail =:mail GROUP BY mail";
    
        // Préparer la requête SQL
        $statement = $conn->prepare($requete0);
    
        // Exécuter la requête SQL en passant la valeur du paramètre nommé (:mail) à partir de $_POST
        $statement->execute(array(':mail' => $_POST['mail']));
    
        // Récupérer le résultat de la requête avec fetchColumn()
        $compteMail = $statement->fetchColumn(); 
    } catch (PDOException $e) {
        echo 'Echec Compte Changement Mail : ' . $e->getMessage();
        echo '<br>';
    }
    if ($compteMail == 0) {

        try {
            $stmt = $conn -> prepare("
                                    UPDATE membre 
                                    SET mail = '$mail' 
                                    WHERE id = '$id_modif';'");
            $stmt->execute();

            

        }
        catch (PDOException $e){ //Modification Echec
            echo 'Modification Echec: ' .$e->getMessage();
            $url="user_modifier.php?message=modifechec&id=$id_modif";
            header("Location: $url");
        }//Reussite
        $url= "user_modifier.php?message=modifreussie&id=$id_modif";
        header("Location: $url");
    }else{ //Mail deja existant
        $url= "user_modifier.php?message=modifmailexist&id=$id_modif";
        header("Location: $url");
    }
}


$conn = null;

?>


