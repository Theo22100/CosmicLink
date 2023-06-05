<?php
session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
    require '../connect.php';

    if (isset($_POST['action'])) {
        switch ($_POST['action']) {


            default:
                echo "default";
                break;
        }
    } else if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getFriends':
                $result = getFriends($handler, $user_id);
                echo json_encode($result);
                break;

            case 'getWaiting':


            default:
                break;
        }
    }
}


function getFriends($handler, $user_id)
{

    try {
        $requete1 = $handler->prepare(
            "SELECT id_membre1, id_membre2
        FROM ami
        WHERE (id_membre1 = :id OR id_membre2 = :id)
        AND statut = 'A';"
        );

        $requete1->bindParam(':id', $user_id);
        $requete1->execute();

        $amis = array();
        while ($ami = $requete1->fetch(PDO::FETCH_ASSOC)) {
            // On ajoute les id d'amis dans un tableau
            if ($ami['id_membre1' != $user_id]) {
                $amis[] = $ami['id_membre1'];
            } else {
                $amis[] = $ami['id_membre2'];
            }
        }


        $requete2 = $handler->prepare(
            "SELECT id, pseudo
        FROM membre
        WHERE id IN (:amis);"
        );

        // Concatène les id des amis pour les utiliser dans la requête suivante
        $ids_amis = implode(',', $amis);
        $requete1->bindParam(':amis', $ids_amis);
        $requete2->execute();

        $pseudo_amis = array();
        while ($amiNom = $requete2->fetch(PDO::FETCH_ASSOC)) {
            /*
        if ($amiNom['id'] != $user_id) {
            // Affiche les pseudos des amis, en excluant celui de l'utilisateur actuel
            echo $amiNom['pseudo'] . "               <a href='ami_supprimer.php?id=".$amiNom['id']."> SUPPRIMER </a>" ;
        }
        */
            $pseudo_amis[] = $amiNom;
        }

        return $pseudo_amis;
    } catch (PDOException $e) {
        echo 'Échec lors de la récupération de la liste des amis : ' . $e->getMessage();
    }
}
