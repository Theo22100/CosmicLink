<?php

    session_start();
    session_destroy();
    header("Location: ../login-inscription/login.php");

?>