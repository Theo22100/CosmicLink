<?php
include("inc/top.php");
if (!isset($_SESSION['login']) || $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}
$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";
?>

<!--  debut contenu -->
<html>
<head>
    <meta charset=”utf-8″>
</head>

<body>
    <main>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Dashboard</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-danger text-white mb-4">
                        <div class="card-body">Admins :
                            <!-- Requete pour avoir le nombre d'admins-->
                            <?php

                            try {
                                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



                                $sql = $conn->prepare("SELECT id FROM membre WHERE role = 'A';");



                                $sql->execute(array());




                                $num_of_rowsad = $sql->rowCount();
                            } catch (PDOException $e) {
                                echo 'Echec Connexion : ' . $e->getMessage();
                            }

                            echo $num_of_rowsad;

                            ?>
                            <!--  Fin requete admin -->
                        </div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="list_admins.php">Read more</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Users :

                            <!-- Requete pour avoir le nombre de Utilisateurs-->
                            <?php
                            try {
                                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
                                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                                $sql = $conn->prepare("SELECT id FROM membre;");
                                $sql->execute(array());

                                $num_of_users = $sql->rowCount();
                            } catch (PDOException $e) {
                                echo 'Echec Connexion : ' . $e->getMessage();
                            }

                            echo $num_of_users;
                            ?>
                            <!--  Fin requete Utilisateurs-->
                        </div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="list_user.php">Read more</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- fin contenu -->


    <?php
    include("inc/bottom.php");
    ?>
</body>

</html>