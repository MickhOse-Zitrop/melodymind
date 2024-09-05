<?php
require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];

$sql = mysqli_query($link, "SELECT * FROM users WHERE email = '$email'");

if (!mysqli_fetch_assoc($sql)) {
    $result = 'sign-up';
} else {
    $result = 'sign-in';
}

$response[] = array("result" => $result);
echo json_encode($response);
