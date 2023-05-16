<?php
include("inc/top.php");
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}
?>
<div class="container-fluid px-4">
        <h1 class="mt-4">Mon Compte</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
            <li class="breadcrumb-item active">Mon Compte</li>
        </ol>
        <div class="card mb-4">
            <div class="card-body">
                                

                <?php
                    if ($_GET["message"]=="reussie"){
                            echo '<h2 style="color:green;">Ajout réussi</h2>';
                        }else if ($_GET["message"]=="echoue"){
                            echo '<h2 style="color:red;">Erreur dans l\'ajout !</h2>';
                        }
			    ?>


					<div class="register-top-grid">
						<h3>Vos informations</h3>
                        <br/>
                        <div>
                            <table border="0">
                                <tr>
                                    <td align="right"><b>Nom : </b></td>
                                    <td>
                                        <?php

                                        echo $_SESSION['nom'];

                                        ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"><b>Prénom : </b></td>
                                    <td>
                                        <?php

                                        echo $_SESSION['prenom'];

                                        ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"><b>Mail : </b></td>
                                    <td>
                                        
                                    <?php

                                        echo $_SESSION['mail'];

                                        ?>
                                    </td>

                                </tr>
                            </table>
                        </div>
                    </div>
                    <br/>
			</div>
        </div>
    </div>






<?php
include("inc/bottom.php");
?>