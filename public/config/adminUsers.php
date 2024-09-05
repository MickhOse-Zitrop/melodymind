<?php
session_start();
require_once('connect.php');

if ($_SESSION['user'][10] == 1) {
    $sql = mysqli_query($link, "SELECT * FROM users");

    if (mysqli_num_rows($sql) > 0) {
        $row = mysqli_fetch_array($sql);
        $result = array();
        do {
            array_push($result, $row);
        } while ($row = mysqli_fetch_array($sql));

        $response[] = array('result' => $result);
    } else {
        $response[] = 'Error';
    }
} else {
    $response[] = 'Иди отсюда';
}

echo json_encode($response);
