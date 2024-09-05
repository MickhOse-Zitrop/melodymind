<?php

require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];
$password = $dData['password'];
$language = $dData['language'];

$sql = mysqli_query($link, "SELECT * FROM users WHERE email = '$email'");
if (!mysqli_fetch_assoc($sql)) {
    if ($language == 'en') {
        $result = "User doesn't exists!";
    } else {
        $result = "Пользователь не существует!";
    }
} else {
    $password = md5($password);
    $sql = "UPDATE `users` SET `password` = '$password' WHERE `users`.`email` = '$email'";

    if ($connect->query($sql)) {
        if ($language == 'en') {
            $result = "You've successfully changed password";
        } else {
            $result = "Вы успешно сменили пароль";
        }
    } else {
        if ($language == 'en') {
            $result = "Error";
        } else {
            $result = "Ошибка";
        }
    }
}

$link->close();
$response[] = array("result" => $result);
echo json_encode($response);
