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

    function __construct($star_id, $star_name, $galaxy_name, $star_desc, $star_size, $star_x, $star_y)
    {
        $this->star_id = $star_id;
        $this->star_name = $star_name;
        $this->galaxy_name = $galaxy_name;
        $this->star_desc = $star_desc;
        $this->star_size = $star_size;
        $this->star_x = $star_x;
        $this->star_y = $star_y;
    }

    function displayStar()
    {
?>
        <script>
         

            addStarWithInfo(
                "<?php echo $this->star_name; ?>",
                "<?php echo $this->galaxy_name; ?>",
                "<?php echo $this->star_desc; ?>",
                <?php echo $this->star_size; ?>,
                <?php echo $this->star_x; ?>,
                <?php echo $this->star_y; ?>
            );
        </script>


<?php

    }
}



?>