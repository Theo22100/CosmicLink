<?php

$compteMail = $comptePseudo = "";
$membre = $galaxie = $univers = $pseudo = $prenom = $datenaissance = $dateinscription = $nom = $mail = $password = "";

$servername = "localhost";
$username = "root";
$password_db = "root";
$dbname = "projet";

///////////////////////////////////////////////////////////////////
//
//              TESTS POUR SAVOIR LE NB DE COMPTE AVEC LE
//              MEME MAIL
//
//
////////////////////////////////////////////////////////////////////

try {
    $connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //Univers
    $connexion2 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
    $connexion2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //Galaxie
    $connexion3 = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
    $connexion3->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $requete0 = "SELECT COUNT(mail) FROM membre WHERE mail =:mail GROUP BY mail";

    // Préparer la requête SQL
    $statement = $connexion->prepare($requete0);

    // Exécuter la requête SQL en passant la valeur du paramètre nommé (:mail) à partir de $_POST
    $statement->execute(array(':mail' => $_POST['mail']));

    // Récupérer le résultat de la requête avec fetchColumn()
    $compteMail = $statement->fetchColumn();





} catch (PDOException $e) {
    echo 'Echec Compte Mail : ' . $e->getMessage();
    echo '<br>';
}

///////////////////////////////////////////////////////////////////
//
//              TESTS POUR SAVOIR LE NB DE COMPTE AVEC LE
//              MEME PSEUDO
//
//
////////////////////////////////////////////////////////////////////

try {
    $requete1 = $connexion->prepare("SELECT COUNT(*) FROM membre WHERE pseudo = :pseudo GROUP BY pseudo");
    $requete1->bindParam(':pseudo', $_POST['pseudo']);
    $requete1->execute();
    $comptePseudo = $requete1->fetchColumn();




} catch (PDOException $e) {
    echo 'Echec Compte pseudo: ' . $e->getMessage();
    echo '<br>';
}


///////////////////////////////////////////////////////////////////
//
//              INSCRIPTION EN COURS AVEC TESTS
//
//
//
////////////////////////////////////////////////////////////////////

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["password"] == $_POST["confirm_password"]) {

        if ($compteMail != 0) { #mail présent
            header("Location: sinscrire.php?message=mail");
            //echo "compteMail = ".$compteMail."<br>"; 
        } else {
            if ($comptePseudo != 0) { //Déjà pseudo présent
                header("Location: sinscrire.php?message=pseudo");
                //echo "comptePseudo = ".$compteMail."<br>"; 
            } else {
                try {

                    $requete2 = $connexion->prepare("INSERT INTO membre (pseudo,prenom,nom,datenaissance,dateinscription,mail,password,login) VALUES (:pseudo, :prenom, :nom, :datenaissance, :dateinscription, :mail ,:password, :login)");


                    $pseudo = clean($_POST["pseudo"]);
                    $prenom = clean($_POST["prenom"]);
                    $nom = clean($_POST["nom"]);
                    $datenaissance = $_POST["datenaissance"];
                    $dateinscription = date('Y-m-d');
                    $mail = $_POST["mail"];
                    $email = filter_var($mail, FILTER_SANITIZE_EMAIL); //takes away impossible char

                    // Validate e-mail
                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        header("Location: sinscrire.php?message=mailinvalide");
                    } 
                    $login = "0";

                    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

                    //Bind
                    //$requete2->bindParam(':id', $membre);
                    $requete2->bindParam(':pseudo', $pseudo);
                    $requete2->bindParam(':prenom', $prenom);
                    $requete2->bindParam(':nom', $nom);
                    $requete2->bindParam(':datenaissance', $datenaissance);
                    $requete2->bindParam(':dateinscription', $dateinscription);
                    $requete2->bindParam(':mail', $mail);
                    $requete2->bindParam(':password', $password);
                    $requete2->bindParam(':login', $login);


                    $requete2->execute();


                    //ID pour la réutiliser
                    $membre = $connexion->lastInsertId();


                    // Insérer l'ID de univers dans une autre table "univers" avec la clé étrangère du membre
                    $requete3 = $connexion2->prepare("INSERT INTO univers (id_membre) VALUES (:id)");
                    //Bind
                    $requete3->bindParam(':id', $membre);


                    //Recupère l'id membre et créer aussi le répertoire pour les photos 

                    // Créer un répertoire pour l'utilisateur
                    $directoryPath = '../../img/profil/' . $membre; // Spécifiez le chemin complet où vous souhaitez créer le répertoire

                    if (!file_exists($directoryPath)) {
                        // Vérifier si le répertoire n'existe pas déjà
                        mkdir($directoryPath, 0777, true);
                    }





                    //fait la requete id_univers
                    $requete3->execute();




                    //ID pour la réutiliser


                    $cox = $coy = 0;
                    $public = 1;
                    $nomgalaxie = "undefined";
                    $descr = "";
                    $univers = $connexion2->lastInsertId();

                    // Insérer l'ID de galaxie dans une table "galaxie" avec la clé étrangère de univers
                    $requete4 = $connexion3->prepare("INSERT INTO galaxie (galaxie_nom, descr, cox, coy, public, id_univers) VALUES (:nom, :descr, :cox, :coy, :public, :id_univers)");
                    //Bind
                    //$requete4->bindParam(':id_galaxie', $galaxie);
                    $requete4->bindParam(':nom', $nomgalaxie);
                    $requete4->bindParam(':descr', $descr);
                    $requete4->bindParam(':cox', $cox);
                    $requete4->bindParam(':coy', $coy);
                    $requete4->bindParam(':public', $public);
                    $requete4->bindParam(':id_univers', $univers);
                    $requete4->execute();






                } catch (PDOException $e) {
                    echo 'Echec Ajout: ' . $e->getMessage();
                    echo '<br>';
                    header("Location: sinscrire.php?message=echoue");
                }
                header("Location: sinscrire.php?message=reussie");
            }
        }
    } else {
        header("Location: sinscrire.php?message=mdp");
    }
}


function clean($userInput)
{
    $userInput = trim($userInput); //Enleve les espace
    $userInput = stripslashes($userInput);
    $userInput = htmlspecialchars($userInput);
    return $userInput;
}
$connexion = $connexion2 = $connexion3 = null;


?>