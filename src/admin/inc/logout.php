<?php

    session_start();
    session_destroy();
    header("Location: http://localhost/Projet/manager/index.php");

?>