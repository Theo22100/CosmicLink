<?php
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}
$id_modif=$_GET["num"];

$servername = "localhost";
$login = "root";
$password_db = "root";
$dbname = "projet";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $login, $password_db);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $stmt = $conn->prepare("
                                UPDATE membre 
                                SET role = 'U' 
                                WHERE id = '$id_modif';'
                            ");

    $stmt->execute();


} catch (PDOException $e) {
    echo 'Echec Effacer: ' . $e->getMessage();
    header("Location: list_admins.php?message=supechoue");
}
header("Location: list_admins.php?message=supreussie");

?>