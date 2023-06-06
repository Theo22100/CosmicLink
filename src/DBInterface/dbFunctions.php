<?php
class DBFunctions
{

    static function getFriends($handler, $user_id)
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

            $pseudo_amis = array();

            //si l'utilisateur a au moins un ami, on récupère leurs pseudos
            if ($requete1->rowCount() != 0) {
                $amis = array();
                while ($ami = $requete1->fetch(PDO::FETCH_ASSOC)) {
                    // On ajoute les id des autres utilisateurs dans un tableau
                    if ($ami['sender'] != $user_id) {
                        $amis[] = $ami['sender'];
                    } else {
                        $amis[] = $ami['receiver'];
                    }
                }
                // Concatène les id des amis pour les utiliser dans la requête suivante
                $ids_amis = implode(',', array_unique($amis));

                $requete2 = $handler->prepare(
                    "SELECT id, pseudo
                    FROM membre
                    WHERE id IN (:amis)"
                );
                $requete2->bindParam(':amis', $ids_amis);
                $requete2->execute();

                while ($amiNom = $requete2->fetch(PDO::FETCH_ASSOC)) {

                    $pseudo_amis[] = $amiNom['pseudo'];
                }
               
                
            }
            return $pseudo_amis;
        } catch (PDOException $e) {
            echo 'Échec lors de la récupération de la liste des amis : ' . $e->getMessage();
        }
    }
} //class end
