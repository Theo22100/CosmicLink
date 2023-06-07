<?php
    include("inc/top.php");
    session_start();
    if (!isset($_SESSION['login']) || $_SESSION['role'] != "A") {
        header('Location: ../login-inscription/login.php');
    }
    
?>
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Liste des Utilisateurs</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
            <li class="breadcrumb-item active"><a href="list_user.php">Utilisateurs</a></li>
            <li class="breadcrumb-item active">Modifier</li>
        </ol>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                Utilisateurs / Modification
            </div>
            <div class="card-body">

                <?php


                if (isset($_GET['message'])) {
                    if ($_GET["message"] == "modifreussie") {
                        echo '<p style="color:green;">La Modification a été effectué !</p>';
                    } else if ($_GET["message"] == "modifechoue") {
                        echo '<p style="color:red;">La Modification n\'a pas été effectué !</p>';
                    } else if ($_GET["message"] == "modifmailexist") {
                        echo '<p style="color:red;">Erreur : Mail déjà existant dans la Database !</p>';
                    } else if ($_GET["message"] == "modifadmin") {
                        echo '<p style="color:red;">Erreur : Vous ne pouvez pas éditer votre propre rôle Admin !</p>';
                    }
                }

                //modifadmin
                $serveur = "localhost";
                $login = "root";
                $pass = "root";
                $dbname = "projet";

                $idmodif = $_GET['id'];

                try {
                    $conn = new PDO("mysql:host=$serveur;dbname=$dbname", $login, $pass);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $stmt = "SELECT prenom,nom,mail,role FROM membre WHERE id= $idmodif";


                    echo "<table id='datatablesSimple'>";
                    echo "<thead>";
                    echo "  <tr>
                                                <td>
                                                    <b>Prénom</b>
                                                </td>
                                                <td>
                                                    <b>Nom</b>
                                                </td>
                                                <td>
                                                    <b>Mail</b>
                                                </td>
                                                <td>
                                                    <b>Rôle</b>
                                                </td>
                                            </tr>";
                    echo "</thead>";
                    echo "<tbody><tr>";

                    foreach ($conn->query($stmt) as $row) {
                        echo "<td>" . $row['prenom'] . "</td>";
                        echo "<td>" . $row['nom'] . "</td>";
                        echo "<td>" . $row['mail'] . "</td>";
                        echo "<td>";
                        if ($row['role'] == 'U') {
                            echo "Utilisateur";
                        } elseif ($row['role'] == 'A') {
                            echo "Admin";
                        } else {
                            echo "Erreur";
                        }
                        echo "</td>";





                        echo "<tr>
        <td> 
            <form method='POST' action='user_modifiertotal.php?num=$idmodif'>
                <input type='text' name='prenom' id='prenom'><br>
        </td>
        <td> 
            <input type='text' name='nom' id='nom'><br>
        </td>
        <td> 
            <input type='email' name='mail' id='mail'><br>
        </td>
        <td> 
            <select id='role' name='role'>
                <option value='' selected>Choisir</option>
                <option value='A'>Admin</option>
                <option value='U'>Utilisateur</option>
            </select>
        </td>
        <td> 
            <input type='submit' name='changer' value='Changer'> 
            </form>
        </td>
    </tr>";
                    }
                    echo "</tbody>";
                    echo "</table>";
                } catch (PDOException $e) {
                    echo 'Echec : ' . $e->getMessage();
                }
                ?>
            </div>
        </div>
    </div>
</main>

<!-- fin contenu -->


<?php
include("inc/bottom.php");
?>