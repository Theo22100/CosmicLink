<?php
include("inc/top.php");
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}

?>
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Users List</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
            <li class="breadcrumb-item active"><a href="list_user.php">Users</a></li>
            <li class="breadcrumb-item active">Modify</li>
        </ol>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                Users / Modify
            </div>
            <div class="card-body">

                <?php


                if (isset($_GET['message'])) {
                    if ($_GET["message"] == "modifreussie") {
                        echo '<p style="color:green;">The change has been made!</p>';
                    } else if ($_GET["message"] == "modifechoue") {
                        echo '<p style="color:red;">Modification has not been carried out!</p>';
                    } else if ($_GET["message"] == "modifmailexist") {
                        echo '<p style="color:red;">Error: Mail already in the Database!</p>';
                    } else if ($_GET["message"] == "modifadmin") {
                        echo '<p style="color:red;">Error: You cannot edit your own Admin role!</p>';
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
                                                    <b>Firstname</b>
                                                </td>
                                                <td width ='30px'> </td>
                                                <td>
                                                    <b>Name</b>
                                                </td>
                                                <td width ='30px'> </td>
                                                <td>
                                                    <b>Mail</b>
                                                </td>
                                                <td width ='30px'> </td>
                                                <td>
                                                    <b>Role</b>
                                                </td>
                                            </tr>";
                    echo "</thead>";
                    echo "<tbody><tr>";

                    foreach ($conn->query($stmt) as $row) {
                        echo "<td>" . $row['prenom'] . "</td>";
                        echo "<td width ='30px'> </td>";
                        echo "<td>" . $row['nom'] . "</td>";
                        echo "<td width ='30px'> </td>";
                        echo "<td>" . $row['mail'] . "</td>";
                        echo "<td width ='30px'> </td>";
                        echo "<td>";
                        if ($row['role'] == 'U') {
                            echo "User";
                        } elseif ($row['role'] == 'A') {
                            echo "Admin";
                        } else {
                            echo "ERROR";
                        }
                        echo "</td>";





                        echo "<tr>
        <td> 
            <form method='POST' action='user_modifiertotal.php?num=$idmodif'>
                <input type='text' name='prenom' id='prenom'><br>
        </td>
        
        <td width ='30px'> </td>

        <td> 
                <input type='text' name='nom' id='nom'><br>
        </td>
        
        <td width ='30px'> </td>
 
        <td> 
            <input type='email' name='mail' id='mail'><br>
        </td>

        <td width ='30px'> </td>

        <td> 
            <select id='role' name='role'>
                <option value='' selected>Choose</option>
                <option value='A'>Admin</option>
                <option value='U'>User</option>
            </select>
        </td>

        <td <td width ='30px'> </td>

        <td > 
            <input type='submit' name='changer' value='Change'> 
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