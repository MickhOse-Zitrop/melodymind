<?php
session_start();
require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];
$newEmail = $dData['newEmail'];
$language = $dData['language'];
$password = $dData['password'];
$password = md5($password);

$sql = mysqli_query($link, "SELECT * FROM users WHERE email = '$email' && password = '$password'");
if (!mysqli_fetch_assoc($sql)) {
    if ($language == 'en') {
        $result = "Incorrect password!";
    } else {
        $result = "Неверный пароль!";
    }
} else {
    $sql = "UPDATE `users` SET `email` = '$newEmail' WHERE `users`.`email` = '$email'";

    if ($connect->query($sql)) {
        $sql = mysqli_query($link, "SELECT * FROM `users` WHERE `users`.`email` = '$newEmail'");

        unset($_SESSION['user']);
        $user = mysqli_fetch_assoc($sql);
        $_SESSION['user'] = [true, $user['id'], $user['name'], $user['email'], $user['password'], $user['surname'], $user['displayName'], ($user['photo']), $user['location'], $user['bio'], $user['status'], $user['subscription'], $user['followers'], $user['plays'], $user['tracks'], $user['phoneNumber'], $user['2Auth'], $user['soundCloud'], $user['youtube'], $user['rutube'], $user['tiktok'], $user['twitch'], $user['wallet']];

        if ($language == 'en') {
            $result = "You've successfully changed email";
        } else {
            $result = "Вы успешно сменили эл. почту";
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
$response[] = array("result" => $result, "user" => $_SESSION['user']);
echo json_encode($response);
