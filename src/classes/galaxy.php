<?php
    require 'star.php';
    class Galaxy{
        public $galaxy_id;
        public $galaxy_name;
        private $stars;

        function __construct($galaxy_id,$galaxy_name)
        {
            $this->galaxy_id= $galaxy_id;
            $this->galaxy_name= $galaxy_name;
            $this->fetchStars();
        }

        function getInfo(){
            echo $this->galaxy_id;
            echo $this->galaxy_name;
        }

        function getGalaxyId(){
            return $this->galaxy_id;
        }


        function fetchStars(){
            require 'connect.php';
           
            
            try {
                $sql = $handler->prepare("SELECT * FROM etoile WHERE id_galaxie = :id_galaxie");
                $sql->bindParam(':id_galaxie', $this->galaxy_id);
                $sql->execute();

            } catch (PDOException $e) {
                echo 'Echec requête : ' .  $e->getMessage();
            }

            $i = 0;
            while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
                $s = new Star($row['id_etoile'], $row['nom'], $this->galaxy_name, $row['descr'], $row['taille'],$row['cox'],$row['coy']);
                             
                $this->stars[$i] = $s;
                $s->displayStar();
                $i = $i + 1;
            }
           
            print_r($stars);
        }


    }



?>