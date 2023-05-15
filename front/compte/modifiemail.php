

<?php
session_start();
if ($_SESSION['rang']!="0"){
    header('Location: ../login.php');//changer ici
}

$compteMail = "";


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
    if ($compteMail==0){
        try {
            $mail = $_POST["mail"];
            $_SESSION['mail']=$mail;
            $stmt = $conn -> prepare("
                                    UPDATE membre 
                                    SET mail = '$mail' 
                                    WHERE id = '$_SESSION[id]';'");

            $stmt->execute();

            

        }
        catch (PDOException $e){
            echo 'Echec Ajout: ' .$e->getMessage();
            header("Location: compte.php?message=mailechoue");
        }
        header("Location: compte.php?message=mailreussi");
    }else{
         #Mail déjà existant
        header("Location: compte.php?message=mail");
    }
}


$conn = null;

?>


