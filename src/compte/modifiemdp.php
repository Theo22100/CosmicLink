<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}
//Mot de passe actuel
$oldpassword = $_POST["oldpassword"];
//Nouveau MDP
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);
//Recupère id de la session
$id = $_SESSION['id'];


//BDD
$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Connexion BDD
    try{
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e) {
        echo 'Echec Connexion BDD : ' . $e->getMessage();
    }

    // Voir si le MDP donné est le même que celui inscrit dans oldpassword
    try{
        $sql = $conn->prepare("SELECT password FROM membre WHERE id = :id");
        $sql->execute(array(':id' => $id));
        $result = $sql->fetch(PDO::FETCH_ASSOC);
    }catch (PDOException $e) {
            echo 'Echec Récupération Password : ' . $e->getMessage();
    }

    if (password_verify($oldpassword, $result['password'])) {

        try {


            //Changement MDP
            $stmt = $conn->prepare("
                                    UPDATE membre 
                                    SET password = '$password' 
                                    WHERE id = :id ;");






            $stmt->execute(array(':id' => $id));



        } catch (PDOException $e) {
            echo 'Echec MAJ : ' . $e->getMessage();
            header("Location: compte.php?message=mdpechoue");
        }
        header("Location: compte.php?message=mdpreussie");
    } else {
        
        header("Location: compte.php?message=mauvmdp");
    }
}
$conn = null;

?>