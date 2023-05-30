<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location: ../login-inscription/login.php');
}
//Declaration variable
$erreur = true;
$pseudo = $_POST['ami'];

$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Test pour ne pas qu'il s'ajoute lui même
    if ($_SESSION['pseudo'] == $pseudo) {
        header("Location: compte.php?message=ami");
        exit();
    }


    // CONNEXION BDD
    try {
        $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Connexion BDD : ' . $e->getMessage();
        header("Location: compte.php?message=bdd");
    }


    //RECUPERER ID UTILISATEUR
    try {


        $requete_id = $connexion->prepare("SELECT id FROM membre WHERE pseudo = :pseudo");

        $requete_id->bindParam(':pseudo', $pseudo);

        $requete_id->execute();

        $id_util = $requete_id->fetchColumn();

        if (empty($id_util)) {
            header("Location: compte.php?message=idintroubable");
            exit();
        }


    } catch (PDOException $e) {
        echo 'Recuperer ID utilisateur : ' . $e->getMessage();
        header("Location: compte.php?message=idutil");
    }

    //TESTER S'IL Y A UNE DEMANDE EN ATTENTE OU DEJA AMI
    try {
        $requete_attente = $connexion->prepare("
        SELECT statut FROM ami 
        WHERE (id_membre1 = :idm1 OR id_membre1 = :idm2) 
        AND (id_membre2 = :idm2 OR id_membre2 = :idm1)");

        $requete_attente->bindParam(':idm1', $id_util); //get
        $requete_attente->bindParam(':idm2', $_SESSION['id']);

        $requete_attente->execute();

        $statut = $requete_attente->fetchColumn();

        echo "Statut : ".$statut."<br>";




    } catch (PDOException $e) {
        echo 'Recherche ami : ' . $e->getMessage();
        header("Location: compte.php?message=erreurami");
    }

    //Test du statut
    if (!empty($statut)) {
        if ($statut == "E") {//En attente
            echo "en attente <br>";
            header("Location: compte.php?message=amiattente");
        } else if ($statut == "A") {//Deja ami
            echo "ajouté déjà <br>";
           header("Location: compte.php?message=amideja");
        }
    } else {
        
        echo "vide <br>";
        
        //Si $statut vide alors il fait la demande
        //REQUETE AMI

        try {
            $idmembre = $_SESSION['id'];
            $requeteami = $connexion->prepare("INSERT INTO ami (id_membre1,id_membre2) VALUES (:id_membre1, :id_membre2)");

            $requeteami->bindParam(':id_membre1', $idmembre);
            $requeteami->bindParam(':id_membre2', $id_util);

            $requeteami->execute();
            $erreur = false;

        } catch (PDOException $e) {
            echo 'Ajout Ami : ' . $e->getMessage();
            header("Location: compte.php?message=erreurami");

        }
    }
    if (!$erreur) {//Renvoie vers la page si succès
        header("Location: compte.php?message=ajoutami");
    }
}


$connexion = null;

?>