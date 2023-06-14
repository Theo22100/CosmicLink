<?php
    include("inc/top.php");
    if (!isset($_SESSION['login']) || $_SESSION['role'] != "A") {
        header('Location: ../login-inscription/login.php');
    }
    
?>
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Admins List</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
            <li class="breadcrumb-item active">Admins</li>
        </ol>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                Admins Database
            </div>
            <div class="card-body">

                <?php
                if (isset($_GET['message'])) {
                    if ($_GET["message"] == "supechoue") {
                        echo '<p style="color:red;">Error : The deletion could not be carried out!</p>';
                    } else if ($_GET["message"] == "supreussie") {
                        echo '<p style="color:green;">The deletion has been made!</p>';
                    } else if ($_GET["message"] == "supadmin") {
                        echo '<p style="color:red;">Error: You cannot delete yourself!</p>';
                    }
                }

                $serveur = "localhost";
                $login = "root";
                $pass = "root";
                $dbname = "projet";

                try {
                    $connexion = new PDO("mysql:host=$serveur;dbname=$dbname", $login, $pass);
                    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $requete1 =  "SELECT id,nom,prenom,mail,role FROM membre WHERE role = 'A'";


                    echo "<table table class='table' id='simple'>";
                    echo "<thead>";
                    echo "  <tr>
                                                <td>
                                                    <b>ID</b>
                                                </td>
                                                <td>
                                                    <b>Name</b>
                                                </td>
                                                <td>
                                                    <b>Firstname</b>
                                                </td>
                                                <td>
                                                    <b>Mail</b>
                                                </td>
                                                <td>
                                                    <b>Role</b>
                                                </td>
                                                <td>
                                                    <b>Delete Admin</b>
                                                </td>
                                            </tr>";
                    echo "</thead>";
                    echo "<tbody><tr>";

                    foreach ($connexion->query($requete1) as $row) {
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td>" . $row['nom'] . "</td>";
                        echo "<td>" . $row['prenom'] . "</td>";
                        echo "<td>" . $row['mail'] . "</td>";
                        echo "<td>";
                        if ($row['role'] == 'U') {
                            echo "ERROR : User";
                        } elseif ($row['role'] == 'A') {
                            echo "Admin";
                        } else {
                            echo "ERROR";
                        }
                        echo "</td>";
                        echo '<td style="text-align:center"><a href="admin_supprimer.php?num=' . $row['id'] . '"><img src="images/croix.png" alt="Efface"/></a></td></tr>';
                    }
                    echo "</tbody>";
                    echo "</table>";
                } catch (PDOException $e) {
                    echo 'Echec : ' . $e->getMessage();
                }
                $connexion = null;
                ?>
            </div>
        </div>
    </div>

</main>

<!-- fin contenu -->


<?php
include("inc/bottom.php");
?>