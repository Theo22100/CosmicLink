<?php

session_start();
if (isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
}
try {
    require '../../connect.php';
}   
catch (PDOException $e){
    echo 'Echec : ' . $e->getMessage();
}


if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'add':
            $result = addStar($handler, $user_id);
            echo json_encode($result);
            break;
        case 'edit':
            $result = editStar($handler, $user_id);
            echo json_encode($result);
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
} 
else if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getGalaxies':            
            $result = getGalaxies($handler, $user_id);
            $galaxieJSON = json_encode($result);
            echo $galaxieJSON;
            break;

        default : break;
    }
}
/**
 * Adds a star to database, according to informations captured in Javascript
 */
function addStar($handler, $user_id)
{
    $arrayResponse = array();
    $arrayResponse['status'] = "failed";

    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['size']) && isset($_POST['descr']) && isset($_POST['galaxy_name']) && isset($_POST['public']) && isset($_POST['arrayLink'])) {
        
        $name = ($_POST['name']);
        $descr = ($_POST['descr']);
        $galaxy_name = ($_POST['galaxy_name']);

        $size = intval($_POST['size']);
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);

        $public = intval($_POST['public']);

        $galaxy_id = treatGalaxyName($handler, $galaxy_name, $user_id);


        $imageLinkArray = json_decode(stripslashes($_POST['arrayLink']));

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

            //creating a folder for the star to input images in
            $starID = $handler->lastInsertId();
            $arrayResponse['starID'] = $starID;

            $directoryPath = '../../../img/profil/' . $user_id . "/" . $starID;
            $jsPath = '../img/profil/' . $user_id . "/" . $starID;
            if(!file_exists(($directoryPath))){
                mkdir($directoryPath, 0777, true);
            }

            $i = 0;
            $dataresult = array();
            foreach($imageLinkArray as $imageLink){
                if(is_file($imageLink)){
                    $dataresult[] = $imageLink;
                }
                else{ //need to recreate the image based on the data
                    list($type, $imageLink) = explode(';', $imageLink);
                    list(, $imageLink)      = explode(',', $imageLink);
                    list(,$type) =explode('/', $type);

                    $dataresult[] = $jsPath . "/" . $i . "." . $type;

                    $bindata = base64_decode($imageLink);

                    $newImg = fopen($directoryPath . "/" . $i . "." . $type, "w");
                    
                    //writing the image data
                    fwrite($newImg, $bindata);

                    fclose($newImg);
                }
                $i++;
            }

            $arrayResponse['status'] = "success";
            $arrayResponse['data'] = $dataresult;

            return $arrayResponse;

        } catch (PDOException $e) {
            $arrayResponse['data'] = $e->getMessage();
            return $arrayResponse;
        }
    }
    return $arrayResponse;
}

function editStar($handler, $user_id){
    $arrayResponse = array();
    $arrayResponse['status'] = "failed";

    if (isset($_POST['new_name']) && isset($_POST['size']) && isset($_POST['descr']) && isset($_POST['new_galaxy'])  && isset($_POST['public']) && isset($_POST['arrayLink']) && isset($_POST['starID']) ) {
        $new_name = ($_POST['new_name']);
        $descr = ($_POST['descr']);

        $new_galaxy = ($_POST['new_galaxy']);
        $size = intval($_POST['size']);
        
        $public = intval($_POST['public']);

        $new_galaxy_id = treatGalaxyName($handler, $new_galaxy, $user_id);

        
        $imageLinkArray = json_decode(stripslashes($_POST['arrayLink']));
        $starID = intval($_POST['starID']);

        try {
           
            $query = $handler->prepare("UPDATE etoile SET nom=:new_name, descr=:descr, taille=:size, public=:public, id_galaxie=:new_galaxy_id WHERE id_etoile=:id ");
            $query->bindParam(':new_name', $new_name);
            $query->bindParam(':descr', $descr);
            $query->bindParam(':size', $size);
            $query->bindParam(':new_galaxy_id', $new_galaxy_id);
            $query->bindParam(':public',$public);
            $query->bindParam(':id', $starID);
            $query->execute();

            //creating a folder for the star to input images in

            $directoryPath = '../../../img/profil/' . $user_id . "/" . $starID;
            $jsPath = '../img/profil/' . $user_id . "/" . $starID;

            if(!file_exists(($directoryPath))){
                mkdir($directoryPath, 0777, true);
            }
            array_map('unlink', glob("$directoryPath/*.*"));

            foreach(glob("$directoryPath/*.*") as $file){
                $file2 = substr($file, 3); //remove the first ../
                foreach ($imageLinkArray as $imageLink) {
                    if($imageLink == $file2){
                        unlink($file);
                    }
                }
            }

            $i = 0;
            $dataresult = array();
            $debugArray = array();
            foreach($imageLinkArray as $imageLink){
                $debugArray[]= file_exists( "../" .$imageLink);
                if(file_exists("../" . $imageLink)){ 
                    list(, $fileName) = explode('../../img/profil/' . $user_id . "/" . $starID . "/", "../" . $imageLink);
                    list($fileName, $type)      = explode('.', $fileName);
                    
                    $debugArray[] = "type de fichier: " . $type;
                    
                    $debugArray[] = "Nom de fichier: " . $fileName;
                    if($fileName != $i){
                        rename($imageLink, $directoryPath . "/" . $i . "." . $type);
                        $dataresult[] = $jsPath . "/" . $i . "." . $type;
                    }
                }
                else{ //need to recreate the image based on the data
                    list($type, $imageLink) = explode(';', $imageLink);
                    list(, $imageLink)      = explode(',', $imageLink);
                    list(,$type) =explode('/', $type);

                    $bindata = base64_decode($imageLink);
                    
                    $dataresult[] = $jsPath . "/" . $i . "." . $type;
                    $newImg = fopen($directoryPath . "/" . $i . "." . $type, "w");
                    
                    //writing the image data
                    fwrite($newImg, $bindata);

                    fclose($newImg);
                }
                $i++;
            }

            $arrayResponse['status'] = "success";
            $arrayResponse['data'] = $dataresult;
            $arrayResponse['debug'] = $debugArray;

            return $arrayResponse;

        } catch (PDOException $e) {
            $arrayResponse['data'] = $e->getMessage();
            return $arrayResponse;
        }
    }
    $arrayResponse['data'] = "pas assez d'argument donner";
    return $arrayResponse;
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
   
    if (isset($_POST['starID'])) {
        $starID = intval($_POST['starID']);
    }

    try {

        $query = $handler->prepare("DELETE FROM etoile WHERE id_etoile=:id");
        $query->bindParam(':id', $starID);
        $query->execute();


        $directoryPath = '../../img/profil/' . $user_id . "/" . $starID;
        if(file_exists(($directoryPath))){

            array_map('unlink', glob("$directoryPath/*.*"));
            rmdir($directoryPath);
        }

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
        return $galaxies;
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



/**
 * @param handler : le gestionnaire de la database
 * @param star_name : le nom de la galaxie à rechercher
 * @param user_id : l'id de l'utilisateur connecté
 * @return : id de la galaxie appartenant à l'utilisateur connecté
 */
function starNameToId($handler, $star_name, $user_id)
{
    try {
        //Récupération galaxy_id à partir de son nom
        $gQuery = $handler->prepare(
            "SELECT *
            FROM univers INNER JOIN (galaxie
            INNER JOIN etoile)  
            WHERE nom=:nom
            AND univers.id_membre=:id_membre
            AND galaxie.id_galaxie =etoile.id_galaxie
            AND univers.id_univers = galaxie.id_univers" //membres liées aux galaxies grâce à l'univers
        );

        $gQuery->bindParam(':nom', $star_name);
        $gQuery->bindParam(':id_membre', $user_id);
        $gQuery->execute();


        $row = $gQuery->fetch(PDO::FETCH_ASSOC);
        $star_id = $row['id_etoile'];
    } catch (PDOException $e) {
        echo 'Erreur requête :' . $e->getMessage();
    }

    return $star_id;
}
