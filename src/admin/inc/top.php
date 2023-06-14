<!DOCTYPE html>
<?php
session_start();
?>
<html lang="fr">

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>CosmicLink Admin</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/css/style.css" rel="stylesheet" /> <!-- DataTables pour list user et admin -->
        <link href="css/styles.css" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="../../img/favicon.ico"> <!-- Icone -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="index.php">CosmicLink Admin</a>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    
                </div>
            </form>
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="moncompte.php">My Account</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="../home.php">Home CosmicLink</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="../compte/deconnexion.php">Log out</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        
        
        
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
            
            <!-- debut menu de navigation -->
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading"></div>
                            <a class="nav-link" href="index.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            
                            
                            
                            
                            <div class="sb-sidenav-menu-heading">Accounts</div>

                            <a class="nav-link" href="list_user.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                                Users
                            </a>
                           
                            <a class="nav-link" href="list_admins.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-user-secret"></i></div>
                                Admins
                            </a>
                            <div class="sb-sidenav-menu-heading">Statistics</div>
                            <a class="nav-link" href="statistiques.php">
                                <div class="sb-nav-link-icon"><i class="fas fa-newspaper"></i></div>
                                Statistics
                            </a>
                            

                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in :</div>
                        <?php

                            echo ($_SESSION['prenom']." ".$_SESSION['nom']);
                        ?>
                    </div>
                </nav>
                
                <!-- fin menu de navigation -->
            </div>
            <div id="layoutSidenav_content">
            