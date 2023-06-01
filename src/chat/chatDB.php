<?php
require '../classes/user.php';
session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];

    require '../connect.php';

    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'getContacts':
                getContacts($handler, $user_id);
                break;
            case 'sendMsg':
                sendMsg($handler, $user_id);
                break;
            case 'getMsg':
                $array = getMsg($handler, $user_id, $other_id);
                //echo json_encode($array);
                break;
            case 'deleteMsg':
                deleteMsg($handler, $user_id);
                break;
            default:
                echo "default";
                break;
        }
    }
}

function getContacts($handler, $user_id)
{
    $q = $handler->prepare("SELECT id, pseudo FROM membre WHERE id!=:id");
    $q->bindParam(':id', $user_id);
    $q->execute();
    $contacts = array();
    while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
        $contacts[] = array($row['pseudo'], getLastMsg($handler, $user_id, $row['id']));
    }
    echo json_encode($contacts);
}

function sendMsg($handler, $user_id)
{
}
function getLastMsg($handler, $user_id, $other_id)
{
    $allMsg = getMsg($handler, $user_id, $other_id);
    $lastMsgArray = end($allMsg);
    $lastMsg = $lastMsgArray['content'];
    return $lastMsg;
}

function getMsg($handler, $user_id, $other_id)
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
    //return $q->rowCount();
    } catch (PDOException $e) {
        'Echec : ' . $e->getMessage();
    }
    $allMsg = array();
    while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
        $sender = '';
        if ($sender == $user_id) {
            $sender = 'me';
        }
        else {
            $sender = idToUsername($handler,$other_id);
        }
        $allMsg[] = array('sender'=>$sender,'content'=>$row['content'],'timestamp'=>$row['timesent'],'status'=>$row['status']);
    }
    return $allMsg;
}

function deleteMsg($handler, $user)
{
}

function idToUsername($handler,$user_id){
    try {
        $q = $handler->prepare("SELECT pseudo FROM membre WHERE id=:user_id");
        $q->bindParam(':user_id',$user_id);
        $q->execute();
        $username = $q->fetch(PDO::FETCH_ASSOC)['pseudo'];
    }
    catch (PDOException $e){
            'Echec :  ' . $e->getMessage();
    }
    return $username;
}