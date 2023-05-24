<?php

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'add':
            addStar();
            break;

        case 'move':
            moveStar();
            break;
        default:
            break;
    }
}

/**
 * Adds a star to database, according to informations captured in Javascript
 */
function addStar()
{
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name']) && isset($_POST['size']) && isset($_POST['descr'])) {
        $name = ($_POST['name']);
        $descr = ($_POST['descr']);
        //TODO Récup galaxie sélectionnée
        $size = intval($_POST['size']);
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);
    }

    require 'connect.php';

    try {
        //TODO CODAGE EN DUR : Galaxie selon celle sélectionnée pour l'étoile
        $id_galaxie = 2;
        
        $query = $handler->prepare("INSERT INTO etoile (nom,descr,cox,coy,taille,id_galaxie) VALUES (:nom,:descr,:x,:y,:size,:galaxie_id)");
        $query->bindParam(':nom', $name);
        $query->bindParam(':descr', $name);
        $query->bindParam(':x', $x);
        $query->bindParam(':y', $y);
        $query->bindParam(':size', $size);
        $query->bindParam(':galaxie_id', $id_galaxie);
        $query->execute();
    } catch (PDOException $e) {

        echo 'Echec Requête : ' . $e->getMessage();
    }
}

function moveStar()
{
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['name'])) {
        $name = ($_POST['name']);
        $galaxy = 'test2'; //TODO CODAGE EN DUR :récup nom réel étoile
        $y = intval($_POST['y']);
        $x = intval($_POST['x']);
    }

    require 'connect.php';

    try {
        //Récupération id_galaxie à partir de son nom
        $gQuery = $handler->prepare("SELECT id_galaxie FROM galaxie WHERE galaxie_nom=:galaxie_nom");
        $gQuery->bindParam(':galaxie_nom', $galaxy);
        $gQuery->execute();


        $row = $gQuery->fetch(PDO::FETCH_ASSOC);
        $galaxy_id = $row['id_galaxie'];

        $query = $handler->prepare("UPDATE etoile SET cox=:x,coy=:y WHERE nom=:nom AND id_galaxie=:galaxie_id");
        $query->bindParam(':x', $x);
        $query->bindParam(':y', $y);
        $query->bindParam(':nom', $name);
        $query->bindParam(':galaxie_id', $galaxy_id);
        $query->execute();

        /*
        $sql = $handler->prepare("SELECT * FROM etoile WHERE id_galaxie = :id_galaxie");
                $sql->bindParam(':id_galaxie', $this->galaxy_id);
                $sql->execute();
                */

    } catch (PDOException $e) {
        echo 'Echec Requête : ' . $e->getMessage();
    }
    /*
    UPDATE table_name
SET column1=value, column2=value2,...
WHERE some_column=some_value  

*/
}
