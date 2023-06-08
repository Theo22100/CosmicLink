<?php
session_start();
require './dbFunctions.php';
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
    require '../connect.php';

    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'acceptFriend':
                acceptFriend($handler, $user_id);
                break;

            default:
                echo "default";
                break;
        }
    } else if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getFriends':

                $result = DBFunctions::getFriends($handler, $user_id);
                echo json_encode($result);
                break;

            case 'getRequests':
                $result = getWaiting($handler, $user_id);
                echo json_encode($result);
                break;

            default:
                break;
        }
    }
}


function getFriends($handler, $user_id)
{

    try {
        $requete1 = $handler->prepare(
            "SELECT sender, receiver
        FROM ami
        WHERE (sender = :id OR receiver = :id)
        AND statut = 'A';"
        );

        $requete1->bindParam(':id', $user_id);
        $requete1->execute();

        $amis = array();
        while ($ami = $requete1->fetch(PDO::FETCH_ASSOC)) {
            // On ajoute les id des autres utilisateurs dans un tableau
            if ($ami['sender'] != $user_id) {
                $amis[] = $ami['sender'];
            } else {
                $amis[] = $ami['receiver'];
            }
        }

        $ids_amis = implode(',', array_unique($amis));
        $requete2 = $handler->prepare(
            "SELECT id, pseudo
        FROM membre
        WHERE id IN ($ids_amis);" //TODO ? bind ?
        );

        // Concatène les id des amis pour les utiliser dans la requête suivante
        
        //$requete1->bindParam(':amis', $ids_amis);
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

function getWaiting($handler, $user_id)
{
    try {
        //On sélectionne les demandes d'ami dont l'utilisateur est le récipient
        $requete1 = $handler->prepare(
            "SELECT sender, receiver
            FROM ami
            WHERE (receiver = :id)
            AND statut = 'E';"
        );

        $requete1->bindParam(':id', $user_id);
        $requete1->execute();



        if ($requete1->rowCount() > 0) {
            $amis = array();
            while ($ami = $requete1->fetch(PDO::FETCH_ASSOC)) {
                $amis[] = $ami['sender'];
            }

            $requete2 = $handler->prepare(
                "SELECT id, pseudo FROM membre WHERE id IN (:amis)"
            );

            // Concatène les id des amis pour les utiliser dans la requête suivante
            $ids_amis = implode(',', array_unique($amis));
            $requete2->bindParam(':amis', $ids_amis);
            $requete2->execute();

            $pseudo_amis = array();
            while ($amiNom = $requete2->fetch(PDO::FETCH_ASSOC)) {

                $pseudo_amis[] = $amiNom['pseudo'];
            }

            return $pseudo_amis;
        }
        return [];
    } catch (PDOException $e) {
        echo 'Échec lors de la récupération de la liste des amis en attente : ' . $e->getMessage();
    }
}

function acceptFriend($handler, $user_id)
{
    if (isset($_POST['friend_user'])) {

        try {
            $friend_user =  $_POST['friend_user'];
            $idami = userToId($handler, $friend_user);

            $requete1 = $handler->prepare(
                "UPDATE ami 
                SET statut = 'A'  
                WHERE (sender = :idami AND receiver = :idperso)"
            );

            $requete1->bindParam(':idami', $idami);
            $requete1->bindParam(':idperso', $user_id);

            $requete1->execute();
        } catch (PDOException $e) {
            echo 'Échec Ajout Ami : ' . $e->getMessage();
            //Erreur 
        }
    }
}

function userToId($handler, $username)
{
    try {
        $q = $handler->prepare("SELECT id FROM membre WHERE pseudo=:username");
        $q->bindParam(':username', $username);
        $q->execute();
        $user_id = $q->fetch(PDO::FETCH_ASSOC)['id'];
    } catch (PDOException $e) {
        'Echec :  ' . $e->getMessage();
    }
    return $user_id;
}

function deleteFriend($handler, $user_id)
{
    if (isset($_POST['friend_user'])) {

        try {
            $friend_user =  $_POST['friend_user'];
            $idami = userToId($handler, $friend_user);

            $requete1 = $handler->prepare(
                "DELETE FROM ami  
                WHERE (sender = :idami AND receiver = :idperso) 
                 OR    (sender = :idperso AND receiver = :idami) "
            );

            $requete1->bindParam(':idami', $idami);
            $requete1->bindParam(':idperso', $user_id);
            $requete1->execute();
        } catch (PDOException $e) {
            echo 'Échec Delete Ami : ' . $e->getMessage();
            //Erreur 
        }
    }
    $handler = null;
}
