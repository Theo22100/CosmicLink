

<?php
session_start();
if ($_SESSION['rang']!="0"){
    header('Location: ../login.php');//changer ici
}

$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["password"]==$_POST["confirm_password"]){
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


            $stmt = $conn -> prepare("
                                    UPDATE membre 
                                    SET password = '$password' 
                                    WHERE id = '$_SESSION[id]';'");
            





            $stmt->execute();

            

        }
        catch (PDOException $e){
            echo 'Echec Ajout: ' .$e->getMessage();
            header("Location: compte.php?message=mdpechoue");
        }
        header("Location: compte.php?message=mdpreussie");
    }else{
        header("Location: compte.php?message=mdp");
    }
   

}


$conn = null;

?>


