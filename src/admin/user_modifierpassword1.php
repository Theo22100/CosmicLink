

<?php
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}



$password = password_hash($_POST["password"], PASSWORD_DEFAULT);
$id_modif=$_GET["num"];



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
                                    SET password = '$password' 
                                    WHERE id = '$id_modif';'");
            



            $stmt->execute();

            

        }
        catch (PDOException $e){
            echo 'Modification Echec: ' .$e->getMessage();
            $url="user_modifier.php?message=modifechec&id=$id_modif";
            header("Location: $url");
        }
        $url= "user_modifier.php?message=modifreussie&id=$id_modif";
        header("Location: $url");
    }


$conn = null;

?>


