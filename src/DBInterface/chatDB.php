<?php
require './dbFunctions.php';
session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];

    require '../connect.php';

    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'getContacts':
                $result = getContacts($handler, $user_id);
                echo json_encode($result);
                break;

            case 'getSuggestions':
                $result = getSuggestions($handler, $user_id); //TODO algo de compatibilité
                echo json_encode($result);
                break;

            case 'sendMsg':
                sendMsg($handler, $user_id);
                break;
            case 'getMsg':
                if (isset($_POST['contactUsername'])) {
                    $result = getMsg($handler, $user_id, userToId($handler, $_POST['contactUsername']), true);
                    echo json_encode($result);
                }

                break;
            default:
                echo "default";
                break;
        }
    }
}

function getSuggestions($handler, $user_id){
    $all_users = getAllUsers($handler,$user_id);
    $friends = DBFunctions::getFriends($handler,$user_id);
    $result = array_values(array_diff($all_users,$friends));
    return $result;
}

function getAllUsers($handler, $user_id)
{
    $q = $handler->prepare("SELECT pseudo FROM membre WHERE id!=:id");
    $q->bindParam(':id', $user_id);
    $q->execute();

    $contacts = array();
    while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
        $contacts[] =$row['pseudo'];
    }
    return $contacts;
}

function getContacts($handler, $user_id)
{
    $q = $handler->prepare("SELECT sender, receiver FROM chat WHERE sender=:id OR receiver=:id");
    $q->bindParam(':id', $user_id);
    $q->execute();

    $contacts = array();
    while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
        if ($row['sender'] != $user_id) {
            $contacts[] = $row['sender'];
        } else {
            $contacts[] = $row['receiver'];
        }
    }
    //id de tous les utilisateurs avec qui l'utilisateur courant a échangé des messages
    $contacts = array_unique($contacts);

    $lastMessages = array();
    foreach ($contacts as $other_id) {
        $result = getLastMsg($handler, $user_id, $other_id);
        $lastMsg = $result[0];
        $nbUnread = $result[1];
        $lastMessages[] = array(idToUsername($handler, $other_id), $lastMsg, $nbUnread);
    }


    return $lastMessages;
}

function sendMsg($handler, $user_id)
{

    if (isset($_POST['contactUsername']) && isset($_POST['msgTxt'])) {
        try {
            $other_id = userToId($handler, $_POST['contactUsername']);
            $msgTxt = $_POST['msgTxt'];

            $q = $handler->prepare("INSERT INTO chat(sender,receiver,content) VALUES (:sender,:receiver,:content)");
            $q->bindParam(':sender', $user_id);
            $q->bindParam(':receiver', $other_id);
            $q->bindParam(':content', $msgTxt);
            $q->execute();
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }
}
function getLastMsg($handler, $user_id, $other_id)
{
    $result = getMsg($handler, $user_id, $other_id, false);
    $allMsg = $result[0];
    $unread = $result[1];
    $lastMsgArray = end($allMsg);
    $lastMsg = $lastMsgArray['content'];
    return array($lastMsg, $unread);
}

function getMsg($handler, $user_id, $other_id, $opened)
{
    try {
        $q = $handler->prepare(
            "SELECT id_chat, sender, receiver, timesent, content, status FROM chat 
        WHERE (sender=:user_id AND receiver=:other_id)
         OR (sender=:other_id AND receiver=:user_id) 
        ORDER BY id_chat ASC"
        );
        $q->bindParam('user_id', $user_id);
        $q->bindParam('other_id', $other_id);
        $q->execute();
    } catch (PDOException $e) {
        'Echec : ' . $e->getMessage();
    }

    $unread = 0;
    $allMsg = array();
    while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
        if ($row['sender'] != $user_id && $row['status'] == 0) {
            $unread++;
        }
        $sender = '';
        if ($row['sender'] == $user_id) {
            $sender = 'me';
        } else {
            $sender = idToUsername($handler, $other_id);
        }
        $allMsg[] = array('sender' => $sender, 'content' => $row['content'], 'timestamp' => $row['timesent'], 'status' => $row['status']);
    }

    if ($opened) { //Mettre les messages non-lus en lus
        try {
            $q = $handler->prepare(
                "UPDATE chat SET status='1'  
            WHERE (sender=:other_id AND receiver=:user_id)"
            );
            $q->bindParam('user_id', $user_id);
            $q->bindParam('other_id', $other_id);
            $q->execute();
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }
    return array($allMsg, $unread);
}


function idToUsername($handler, $user_id)
{
    try {
        $q = $handler->prepare("SELECT pseudo FROM membre WHERE id=:user_id");
        $q->bindParam(':user_id', $user_id);
        $q->execute();
        $username = $q->fetch(PDO::FETCH_ASSOC)['pseudo'];
    } catch (PDOException $e) {
        'Echec :  ' . $e->getMessage();
    }
    return $username;
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
