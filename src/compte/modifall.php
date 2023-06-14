<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}

$prenom = $_POST["prenom"];
$nom = $_POST["nom"];
$mail = $_POST["mail"];
$email = filter_var($mail, FILTER_SANITIZE_EMAIL); //takes away impossible char
// Validate e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: compte.php?message=mailechoue');
}

$id_modif = $_SESSION['id'];
$error_message = "";


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
    } catch (PDOException $e) {
        echo 'Non connexion BDD : ' . $e->getMessage();
        header("Location: compte.php?message=modifechec");
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
            $_SESSION['nom'] = $nom;
        } catch (PDOException $e) {
            echo 'Modification Echec Nom: ' . $e->getMessage();
            header("Location: compte.php?message=nomechoue");
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
        $_SESSION['prenom'] = $prenom;
    } catch (PDOException $e) {
        echo 'Modification Echec Prenom: ' . $e->getMessage();
        header("Location: compte.php?message=prenomechoue");
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
        exit();
    }
    if ($compteMail == 0) {
        try {
            $requetemail = $conn2->prepare("
                                    UPDATE membre 
                                    SET mail = '$mail' 
                                    WHERE id = '$id_modif';'");
            $requetemail->execute();

            $_SESSION['mail'] = $mail;
        } catch (PDOException $e) { //Modification Echec
            echo 'Modification Echec: ' . $e->getMessage();
            header("Location: compte.php?message=mailechoue");
            exit();
        } //Reussite
    } else { //Mail deja existant
        header("Location: compte.php?message=mail");
        exit();
    }
}
$conn0 = $conn1 = $conn2 = $conn3 = null;

header("Location: compte.php?message=modif"); // Modif réussi


?>