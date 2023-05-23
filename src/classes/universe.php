    <?php

    include 'galaxy.php';

    class Universe
    {
        private $member_id;
        private $universe_id;
        private $galaxies;

        function __construct($member_id, $universe_id)
        {
            $this->member_id = $member_id;
            $this->universe_id = $universe_id;
            $this->fetchGalaxies();
        }

        
        private function fetchGalaxies()
        {
            require 'connect.php';
            try {
                $sql = $handler->prepare("SELECT id_galaxie,galaxie_nom FROM galaxie WHERE id_univers = :id_univers");
                $sql->bindParam(':id_univers', $this->universe_id);
                $sql->execute();

                
            } catch (PDOException $e) {
                echo 'Echec requête : ' .  $e->getMessage();
            }
            
            $i = 0;
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
                $g = new Galaxy($row['id_galaxie'],$row['galaxie_nom']);
                
                $g->fetchStars();
                

                $this->galaxies[$i] = $g;

                $i = $i + 1;
            }
        }


        function getGalaxies(){
            return $this->galaxies;
        }

        
    }

    ?>