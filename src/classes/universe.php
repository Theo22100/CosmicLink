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
        }


        public function fetchGalaxies($viewOnly)
        {
            require 'connect.php';
            try {
                $sql = $handler->prepare("SELECT * FROM galaxie WHERE id_univers = :id_univers");
                $sql->bindParam(':id_univers', $this->universe_id);
                $sql->execute();
            } catch (PDOException $e) {
                echo 'Echec requête : ' .  $e->getMessage();
            }

            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
                if ($row['public'] || !$viewOnly) {
                    $g = new Galaxy($this->member_id, $row['id_galaxie'],$row['galaxie_nom'],$row['descr'],$row['cox'],$row['coy'], $row['public']);
                    $g->fetchStars($viewOnly);
                    
                    $this->galaxies[] = $g;
                    $g->displayGalaxy();
                }
            }
        }


        function getGalaxies()
        {
            return $this->galaxies;
        }
    }

    ?>