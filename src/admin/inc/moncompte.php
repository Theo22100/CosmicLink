<?php
include("inc/top.php");
session_start();
if ($_SESSION['CONNECTE']!='YES'){
    header('Location: http://localhost/Projet/manager/login.php');
}
echo "test";
?>

<?php
include("inc/bottom.php");
?>