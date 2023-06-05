<?php
require 'star.php';
class Galaxy
{
    public $galaxy_id;
    public $galaxy_name;
    public $galaxy_desc;
    public $galaxy_x;
    public $galaxy_y;
    public $galaxy_public;

    private $stars;

    private $member_id;

    function __construct($member_id, $galaxy_id, $galaxy_name, $galaxy_desc, $galaxy_x, $galaxy_y, $galaxy_public)
    {
        $this->galaxy_id = $galaxy_id;
        $this->galaxy_name = $galaxy_name;
        $this->galaxy_desc = $galaxy_desc;
        $this->galaxy_x = $galaxy_x;
        $this->galaxy_y = $galaxy_y;
        $this->galaxy_public = $galaxy_public;
        
        $this->member_id = $member_id;
    }

    function getInfo()
    {
        echo $this->galaxy_id;
        echo $this->galaxy_name;
    }

    function getGalaxyId()
    {
        return $this->galaxy_id;
    }


    function fetchStars($viewOnly)
    {
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

            if ($row['public'] || !$viewOnly) {
                $s = new Star($this->member_id, $row['id_etoile'], $row['nom'], $this->galaxy_name, $row['descr'], $row['taille'], $row['cox'], $row['coy'], $row['public']);

                $this->stars[$i] = $s;
                $s->displayStar();
                $i = $i + 1;
            }
        }

        print_r($stars);
    }

    function displayGalaxy()
    {
        $displayed_galaxy_name = $this->galaxy_name;
        if ($this->galaxy_name != 'undefined') {


?>
            <script>
                addGalaxyWithInfo(
                    <?php echo json_encode($displayed_galaxy_name); ?>,
                    <?php echo json_encode($this->galaxy_desc); ?>,
                    <?php echo $this->galaxy_public; ?>,
                    <?php echo $this->galaxy_x; ?>,
                    <?php echo $this->galaxy_y; ?>
                );
            </script>


<?php
        }
    }
}



?>