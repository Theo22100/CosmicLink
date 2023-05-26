<?php
session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
}

require 'connect.php';

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'add':
            addGalaxy($handler, $user_id);
            break;
        case 'edit':
            editGalaxy($handler, $user_id);
            break;
        case 'move':
            //moveGalaxy($handler, $user_id);
            break;
        case 'delete':
            //deleteGalaxy($handler, $user_id);
            break;

        default:
            echo "default";
            break;
    }
}

/**
 * Adds a star to database, according to informations captured in Javascript
 */
function addGalaxy($handler, $user_id)
{
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['descr'])) {
        $name = strtolower($_POST['name']);
        if ($name == '') $name = NULL;

        $descr = ($_POST['descr']);
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);
        $universe_id = userToUniversId($handler,$user_id);
        
        try {

            $query = $handler->prepare("INSERT INTO galaxie (galaxie_nom,descr,cox,coy,id_univers) VALUES (:nom,:descr,:x,:y,:univers_id)");
            $query->bindParam(':nom', $name);
            $query->bindParam(':descr', $descr);
            $query->bindParam(':x', $x);
            $query->bindParam(':y', $y);
            $query->bindParam(':univers_id', $universe_id);
            $query->execute();
        } catch (PDOException $e) {

            echo 'Echec Requête Insertion : ' . $e->getMessage();
        }
        
    }
}

function editGalaxy($handler, $user_id)
{
    echo "in here";
    if (isset($_POST['old_name']) && isset($_POST['new_name']) && isset($_POST['descr']) ) {
        $old_name = treatGalaxyName($handler,$_POST['old_name']);
        $new_name = treatGalaxyName($handler,$_POST['new_name']);
        $descr = ($_POST['descr']);
       
        $universe_id = userToUniversId($handler,$user_id);
        try {
           
            $query = $handler->prepare("UPDATE galaxie SET galaxie_nom=:new_name, descr=:descr WHERE galaxie_nom=:old_name AND id_univers=:id_univers");
            $query->bindParam(':new_name', $new_name);
            $query->bindParam(':old_name', $old_name);
            $query->bindParam(':descr', $descr);
            $query->bindParam(':id_univers', $universe_id);
            $query->execute();

        } catch (PDOException $e) {

            echo 'Echec Requête Insertion : ' . $e->getMessage();
        }
    }
}

function moveGalaxy($handler, $user_id)
{
    
}
function deleteGalaxy($handler, $user_id)
{
    
}


/**
 * @param handler : le gestionnaire de la database
 * @param user_id : l'id de l'utilisateur connecté
 * @return : id de l'univers appartenant à l'utilisateur connecté
 */
function userToUniversId($handler, $user_id)
{
    try {
        $gQuery = $handler->prepare(
            "SELECT id_univers
            FROM univers
            WHERE id_membre=:id_membre"
        );

        $gQuery->bindParam(':id_membre', $user_id);
        $gQuery->execute();


        $row = $gQuery->fetch(PDO::FETCH_ASSOC);
        $universe_id = $row['id_univers'];
    } catch (PDOException $e) {
        echo 'Erreur requête :' . $e->getMessage();
    }

    return $universe_id;
}



function  treatGalaxyName($handler, $galaxy_name)
{
    if ($galaxy_name == "") {
        $galaxy_name = "undefined"; //Aucune galaxie sélectionnée, elle ira dans undefined
    }
    $galaxy_name = strtolower($galaxy_name);
    return $galaxy_name;
}
