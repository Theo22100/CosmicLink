<?php
include("inc/top.php");
session_start();
if (!isset($_SESSION['login']) || $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}

?>
<div class="container-fluid px-4">
    <h1 class="mt-4">Statistiques</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
        <li class="breadcrumb-item active">Statistiques</li>
    </ol>
    <div class="card mb-4">
        <div class="card-body">
            <table border='1'>
                <tr>
                    <td>Nombre d'utilisateurs au total :&nbsp;</td>
                    <?php
                    try { //Connexion BDD
                        $servername = "localhost";
                        $username = "root";
                        $password_db = "root";
                        $dbname = "projet";
                        
                        $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
                        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    } catch (PDOException $e) {
                        echo 'Echec Connexion : ' . $e->getMessage();
                    }

                    try { //Calcul utilisateur
                        $requete_util = $connexion->prepare("SELECT count(*) FROM membre");

                        $requete_util->execute();

                        $nbutil = $requete_util->fetchColumn();
                        echo "<td> " . $nbutil . "</td>";
                    } catch (PDOException $e) {
                        echo 'Echec Calcul Utilisateur : ' . $e->getMessage();
                    }

                    ?>


                </tr>
                <tr>
                    <td>Nombre de galaxies au total :&nbsp;</td>
                    <?php
                    try { //Calcul galaxie
                        $requete_util = $connexion->prepare("SELECT count(*) FROM galaxie");

                        $requete_util->execute();

                        $nbgal = $requete_util->fetchColumn();
                        echo "<td> " . $nbgal . "</td>";
                    } catch (PDOException $e) {
                        echo 'Echec Calcul Galaxie : ' . $e->getMessage();
                    }
                    ?>
                <tr>
                <tr>
                    <td>Nombre d'étoiles au total :&nbsp;</td>
                    <td> Non fait </td>
                <tr>
            </table>
        </div>
    </div>
</div>