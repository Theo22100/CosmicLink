<?php
session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
}

require 'connect.php';

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'add':
            addStar($handler, $user_id);
            break;
        case 'edit':
            echo 'about to edit';
            editStar($handler, $user_id);
            break;
        case 'move':
            moveStar($handler, $user_id);
            break;
        case 'delete':
            deleteStar($handler, $user_id);
            break;
        
        default:
            echo "default";
            break;
    }
} else if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getGalaxies':
            getGalaxies($handler, $user_id);
            break;
        default : break;
    }
}
/**
 * Adds a star to database, according to informations captured in Javascript
 */
function addStar($handler, $user_id)
{
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['size']) && isset($_POST['descr']) && isset($_POST['galaxy_name']) && isset($_POST['public'])) {
        $name = ($_POST['name']);
        $descr = ($_POST['descr']);
        $galaxy_name = ($_POST['galaxy_name']);

        $size = intval($_POST['size']);
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);

        $public = intval($_POST['public']);

        $galaxy_id = treatGalaxyName($handler, $galaxy_name, $user_id);



        try {

            $query = $handler->prepare("INSERT INTO etoile (nom,descr,cox,coy,taille,public,id_galaxie) VALUES (:nom,:descr,:x,:y,:size,:public,:galaxie_id)");
            $query->bindParam(':nom', $name);
            $query->bindParam(':descr', $descr);
            $query->bindParam(':x', $x);
            $query->bindParam(':y', $y);
            $query->bindParam(':size', $size);
            $query->bindParam(':public',$public);
            $query->bindParam(':galaxie_id', $galaxy_id);
            $query->execute();
        } catch (PDOException $e) {

            echo 'Echec Requête Insertion : ' . $e->getMessage();
        }
    }
}

function editStar($handler, $user_id){
    if (isset($_POST['old_name']) && isset($_POST['new_name']) && isset($_POST['size']) && isset($_POST['descr']) && isset($_POST['old_galaxy'])&& isset($_POST['new_galaxy'])  && isset($_POST['public'])) {
        $old_name = ($_POST['old_name']);
        $new_name = ($_POST['new_name']);
        $descr = ($_POST['descr']);
        $old_galaxy = ($_POST['old_galaxy']);
        $new_galaxy = ($_POST['new_galaxy']);
        $size = intval($_POST['size']);
        
        $public = intval($_POST['public']);

        $old_galaxy_id = treatGalaxyName($handler, $old_galaxy, $user_id);
        $new_galaxy_id = treatGalaxyName($handler, $new_galaxy, $user_id);

        try {
           
            $query = $handler->prepare("UPDATE etoile SET nom=:new_name, descr=:descr, taille=:size, public=:public, id_galaxie=:new_galaxy_id WHERE nom=:old_name AND id_galaxie=:old_galaxy_id");
            $query->bindParam(':new_name', $new_name);
            $query->bindParam(':old_name', $old_name);
            $query->bindParam(':descr', $descr);
            $query->bindParam(':size', $size);
            $query->bindParam(':old_galaxy_id', $old_galaxy_id);
            $query->bindParam(':new_galaxy_id', $new_galaxy_id);
            $query->bindParam(':public',$public);
            $query->execute();

        } catch (PDOException $e) {

            echo 'Echec Requête Insertion : ' . $e->getMessage();
        }
    }
}

function moveStar($handler, $user_id)
{
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['galaxy_name'])) {
        $name = ($_POST['name']);
        $galaxy_name = ($_POST['galaxy_name']);

        $y = intval($_POST['y']);
        $x = intval($_POST['x']);

        $galaxy_id = treatGalaxyName($handler, $galaxy_name, $user_id);

        try {

            $query = $handler->prepare("UPDATE etoile SET cox=:x,coy=:y WHERE nom=:nom AND id_galaxie=:galaxie_id");
            $query->bindParam(':x', $x);
            $query->bindParam(':y', $y);
            $query->bindParam(':nom', $name);
            $query->bindParam(':galaxie_id', $galaxy_id);
            $query->execute();
        } catch (PDOException $e) {
            echo 'Echec Requête : ' . $e->getMessage();
        }
    }
}
function deleteStar($handler, $user_id)
{
   
    if (isset($_POST['name']) && isset($_POST['galaxy_name'])) {
        $name = ($_POST['name']);
        $galaxy_name = ($_POST['galaxy_name']);

        $size = intval($_POST['size']);
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);

        $galaxy_id = treatGalaxyName($handler, $galaxy_name, $user_id);
    }

    try {

        $query = $handler->prepare("DELETE FROM etoile WHERE nom=:nom AND id_galaxie=:galaxy_id");
        $query->bindParam(':nom', $name);
        $query->bindParam(':galaxy_id', $galaxy_id);
        $query->execute();
    } catch (PDOException $e) {

        echo 'Echec Requête : ' . $e->getMessage();
    }
}

/**
 * Récupère les galaxies qui sont liées à l'utilisateur connecté et les envoie sur le javascript.
 */
function getGalaxies($handler, $user_id)
{

    try {
        $q = $handler->prepare(
            "SELECT galaxie_nom 
            FROM univers INNER JOIN galaxie 
            WHERE galaxie.id_univers = univers.id_univers  
            AND univers.id_membre=:id_membre"
        );

        $q->bindParam(':id_membre', $user_id);
        $q->execute();

        $galaxies = array();
        while ($row = $q->fetch(PDO::FETCH_ASSOC)) {
            if ($row['galaxie_nom'] == 'undefined') {
                $galaxies[] = '';
            } else {
                $galaxies[] =$row['galaxie_nom'];
            }
        }
        $galaxieJSON = json_encode($galaxies);
        echo $galaxieJSON;
    } catch (PDOException $e) {
        echo 'Echec Requête : ' . $e->getMessage();
    }
}

/**
 * @param handler : le gestionnaire de la database
 * @param galaxy_name : le nom de la galaxie à rechercher
 * @param user_id : l'id de l'utilisateur connecté
 * @return : id de la galaxie appartenant à l'utilisateur connecté
 */
function galaxyNameToId($handler, $galaxy_name, $user_id)
{
    try {
        //Récupération galaxy_id à partir de son nom
        $gQuery = $handler->prepare(
            "SELECT *
            FROM univers INNER JOIN galaxie 
            WHERE galaxie_nom=:galaxie_nom
            AND univers.id_membre=:id_membre
            AND univers.id_univers = galaxie.id_univers" //membres liées aux galaxies grâce à l'univers
        );

        $gQuery->bindParam(':galaxie_nom', $galaxy_name);
        $gQuery->bindParam(':id_membre', $user_id);
        $gQuery->execute();


        $row = $gQuery->fetch(PDO::FETCH_ASSOC);
        $galaxy_id = $row['id_galaxie'];
    } catch (PDOException $e) {
        echo 'Erreur requête :' . $e->getMessage();
    }

    return $galaxy_id;
}

function  treatGalaxyName($handler, $galaxy_name, $user_id)
{
     if ($galaxy_name == '') {
        $galaxy_name = "undefined"; //Aucune galaxie sélectionnée, elle ira dans undefined
    }
    $galaxy_name = strtolower($galaxy_name);
    return galaxyNameToId($handler, $galaxy_name, $user_id);
}
