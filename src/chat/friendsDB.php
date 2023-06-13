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
            case 'addFriend':
                echo json_encode(sendRequest($handler, $user_id));
                break;
            case 'removeFriend':
                deleteFriend($handler, $user_id);
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

function sendRequest($handler, $user_id) {
    if(isset($_POST['friend'])){

        $other_id = userToId($handler,$_POST['friend']);

        try {

        
        $sql = $handler->prepare("SELECT id_amitie, sender, receiver FROM ami WHERE (sender = :user_id AND receiver = :other_id) OR (sender = :other_id AND receiver = :user_id)");
        $sql->bindParam(':user_id',$user_id);
        $sql->bindParam(':other_id',$other_id);
        $sql->execute();

        }
        catch (PDOException $e){
            echo 'Echec Recherche : ' . $e->getMessage();
            return ['status' => 'SQL error'];
        }

        if($sql->rowCount() == 0) {
            try {
                $sql2 = $handler->prepare("INSERT INTO ami (sender,receiver) VALUES (:user_id,:other_id)");
                $sql2->bindParam(':user_id',$user_id);
                $sql2->bindParam(':other_id',$other_id);
                $sql2->execute();
    
                return ['status' => 'OK'];
            }

            catch (PDOException $e){
                echo 'Echec Insertion: ' . $e->getMessage();
                return ['status' => 'SQLError'];
            }
            
        }

        else if ($sql->rowCount() == 1) {
            $result = $sql->fetch(PDO::FETCH_ASSOC);
            $request_id = $result['id_amitie'];
            if ($result['sender'] == $user_id) { //l'utilisateur a déjà envoyé une requête, on ne fait rien
                return ['status' => 'alreadyRequest'];
            }
            else { // l'autre utilisateur a envoyé une requête, on accèpte la demande d'ami
                try{
                    $sql3 = $handler->prepare("UPDATE ami SET statut = 'A' WHERE id_amitie = :id");
                    $sql3->bindParam(':id',$request_id);
                    $sql3->execute();
    
                    return ['status' => 'OK'];

                }
                catch(PDOException $e){
                    echo 'Echec Modif : ' . $e->getMessage();
                    return ['status' => 'SQLError'];
                }
            }
            

        }
        return ['status' => 'error'];
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

                $pseudo_amis[$amiNom['id']] = ['pseudo' => $amiNom['pseudo'], 'img' => DBFunctions::getProfilePicFromUserId($amiNom['id'])];
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
