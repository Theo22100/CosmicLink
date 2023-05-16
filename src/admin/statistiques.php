<?php
include("inc/top.php");
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
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
                    <td> Non fait </td>
                </tr>
                <tr>
                    <td>Nombre de galaxies au total :&nbsp;</td>
                    <td> Non fait </td>
                <tr>
                <tr>
                    <td>Nombre d'étoiles au total :&nbsp;</td>
                    <td> Non fait </td>
                <tr>
            </table>
        </div>
    </div>
</div>