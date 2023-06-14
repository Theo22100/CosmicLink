<?php
include("inc/top.php");
if (!isset($_SESSION['login']) || $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}
?>
<div class="container-fluid px-4">
    <h1 class="mt-4">My Account</h1>
    <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
        <li class="breadcrumb-item active">My Account</li>
    </ol>
    <div class="card mb-4">
        <div class="card-body">


            <div class="register-top-grid">
                <h3>Your information</h3>
                <br />
                <div>
                    <table border="0">
                        <tr>
                            <td align="right"><b>Name : </b></td>
                            <td>
                                <?php

                                echo $_SESSION['nom'];

                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td align="right"><b>Firstname : </b></td>
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
            <br />
        </div>
    </div>
</div>






<?php
include("inc/bottom.php");
?>