<?php
class Star
{
    private $star_id;
    private $star_name;
    private $galaxy_name;
    private $star_desc;
    private $star_size;
    private $star_x;
    private $star_y;

    private $public;

    private $arrayLink;

    private $member_id;

    function __construct($member_id, $star_id, $star_name, $galaxy_name, $star_desc, $star_size, $star_x, $star_y, $public)
    {
        $this->star_id = $star_id;
        $this->star_name = $star_name;
        $this->galaxy_name = $galaxy_name;
        $this->star_desc = $star_desc;
        $this->star_size = $star_size;
        $this->star_x = $star_x;
        $this->star_y = $star_y;
        $this->public = $public;

        $this->member_id = $member_id;

        $repertory = '../img/profil' . $this->member_id . '/' . $this->star_id;

        $this->arrayLink = array();
        if(file_exists($repertory)){
            // get list of all files in the repertory
            $files = glob($repertory . '/*');

            foreach($files as $file){
                $this->arrayLink[] = $file;
            }
        }

        echo json_encode($this->arrayLink);
    }

    function displayStar()
    {
        $displayed_galaxy_name = $this->galaxy_name;
        if($this->galaxy_name == 'undefined'){
            $displayed_galaxy_name = '';
        }
        
       
?>
        <script>
           addStarWithInfo(
                <?php echo json_encode($this->star_name); ?>,
                <?php echo json_encode($displayed_galaxy_name); ?>,
                <?php echo json_encode($this->star_desc); ?>,
                <?php echo $this->star_size; ?>,
                <?php echo $this->public; ?>,
                <?php echo $this->star_x; ?>,
                <?php echo $this->star_y; ?>,
                <?php echo json_encode($this->arrayLink); ?>
            );
        </script>


<?php

    }
}



?>