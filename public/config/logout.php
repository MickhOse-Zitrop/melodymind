<?php
session_start();

unset($_SESSION['user']);

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$lang = $dData['language'];

if ($lang == 'en') {
    $result = "You logged out";
} else {
    $result = "Вы вышли из аккаунта";
}

$response[] = array("result" => $result, "login" => false);
echo json_encode($response);
