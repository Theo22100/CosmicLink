

<?php
session_start();
if ($_SESSION['rang']!="0"){
    header('Location: ../login.php'); //changer location
}

$nom = $_POST["nom"];
$_SESSION['nom']=$nom;

$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


            $stmt = $conn -> prepare("
                                    UPDATE membre 
                                    SET nom = '$nom' 
                                    WHERE id = '$_SESSION[id]';'");





            $stmt->execute();

            

        }
        catch (PDOException $e){
            echo 'Echec Ajout: ' .$e->getMessage();
             header("Location: compte.php?message=nomechoue");
        }
        header("Location: compte.php?message=nomreussi");
}


$conn = null;

?>


