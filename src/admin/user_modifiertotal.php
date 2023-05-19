<?php
session_start();
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
    header('Location: ../login-inscription/login.php');
}
$prenom = $_POST["prenom"];
$nom = $_POST["nom"];
$mail = $_POST["mail"];
$role = $_POST["role"];
$id_modif = $_GET["num"];
$error_message="";


$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
////////////////////////////////////////////////////////////////////
//                   CONNEXION A LA BDD                     ////////
////////////////////////////////////////////////////////////////////
    try { //Mise en place de plusieurs connexion pour pouvoir faire le changement sinon cela skip certains changements
        $conn0 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db); //NOM
        $conn0->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn1 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db); //PRENOM
        $conn1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn2 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db); //MAIL
        $conn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn3 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db); //ROLE
        $conn3->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Non connexion BDD : ' . $e->getMessage();
        $url = "user_modifier.php?message=modifechec&id=$id_modif";
        header("Location: $url");
        exit();
    }
////////////////////////////////////////////////////////////////////
//                              NOM                         ////////
////////////////////////////////////////////////////////////////////
    if (!empty($nom)) {
        try {
            $requetenom = $conn0->prepare("
                                            UPDATE membre 
                                            SET nom = '$nom' 
                                            WHERE id = '$id_modif';'");
            $requetenom->execute();
        } catch (PDOException $e) {
            echo 'Modification Echec Nom: ' . $e->getMessage();
            $url = "user_modifier.php?message=modifechec&id=$id_modif";
            header("Location: $url");
            exit();
        }
    }
}
////////////////////////////////////////////////////////////////////
//                               PRENOM                     ////////
////////////////////////////////////////////////////////////////////
if (!empty($prenom)) {
    try {
        $requeteprenom = $conn1->prepare("
                                        UPDATE membre 
                                        SET prenom = '$prenom' 
                                        WHERE id = '$id_modif';'");
        $requeteprenom->execute();
    } catch (PDOException $e) {
        echo 'Modification Echec Prenom: ' . $e->getMessage();
        $url = "user_modifier.php?message=modifechec&id=$id_modif";
        header("Location: $url");
    }
}
////////////////////////////////////////////////////////////////////
//                               MAIL                       ////////
////////////////////////////////////////////////////////////////////
if (!empty($mail)) {
    try { //Vérification du mail si non disponible dans la BDD
        $requetecomptemail = "SELECT COUNT(mail) FROM membre WHERE mail =:mail GROUP BY mail";

        // Préparer la requête SQL
        $calcul = $conn2->prepare($requetecomptemail);

        // Exécuter la requête SQL en passant la valeur du paramètre nommé (:mail) à partir de $_POST
        $calcul->execute(array(':mail' => $_POST['mail']));

        // Récupérer le résultat de la requête avec fetchColumn()
        $compteMail = $calcul->fetchColumn();
    } catch (PDOException $e) {
        echo 'Echec Compte Changement Mail : ' . $e->getMessage();
        echo '<br>';
    }
    if ($compteMail == 0) {
        try {
            $requetemail = $conn2->prepare("
                                    UPDATE membre 
                                    SET mail = '$mail' 
                                    WHERE id = '$id_modif';'");
            $requetemail->execute();
        } catch (PDOException $e) { //Modification Echec
            echo 'Modification Echec: ' . $e->getMessage();
            $url = "user_modifier.php?message=modifechec&id=$id_modif";
            header("Location: $url");
        } //Reussite
    } else { //Mail deja existant
        $url = "user_modifier.php?message=modifmailexist&id=$id_modif";
        header("Location: $url");
    }
}
////////////////////////////////////////////////////////////////////
//                               ROLE                       ////////
////////////////////////////////////////////////////////////////////
if (!empty($role)) {
    if($_SESSION['id']!=$_GET["num"]){ //Recherche s'il veut éditer son propre role
        try {
            $requeterole = $conn3->prepare("
                                        UPDATE membre 
                                        SET role = '$role' 
                                        WHERE id = '$id_modif';'");
            $requeterole->execute();
        } catch (PDOException $e) {
            echo 'Modification Echec: ' . $e->getMessage();
            $url = "user_modifier.php?message=modifechec&id=$id_modif";
            header("Location: $url");
        }
    }else{
        $error_message="erreur";
    }
}

//Modif réussie
if (!empty($error_message)) {
    $url = "user_modifier.php?message=modifadmin&id=$id_modif";
    header("Location: $url");
} else {
    $url = "user_modifier.php?message=modifreussie&id=$id_modif";
    header("Location: $url");
}


$conn = $conn1 = $conn2 = $conn3 = null;

?>