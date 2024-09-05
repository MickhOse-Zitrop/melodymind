<?php

session_start();

if ($_SESSION['user']) {
    $response[] = $_SESSION['user'];
} else $response[] = null;
echo json_encode($response);
