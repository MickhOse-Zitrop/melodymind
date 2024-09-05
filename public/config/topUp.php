<?php
session_start();
require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$id = (int)$dData['id'];
$sum = (int)$dData['sum'];
$language = $dData['language'];

$sql = mysqli_query($link, "SELECT * FROM users WHERE id = '$id'");
if (!mysqli_fetch_assoc($sql)) {
    if ($language == 'en') {
        $result = "User doesn't exists!";
    } else {
        $result = "Пользователь не существует!";
    }
} else {
    $sql = "UPDATE `users` SET `wallet` = '$sum' WHERE `users`.`id` = '$id'";

    if ($connect->query($sql)) {
        $sql = mysqli_query($link, "SELECT * FROM `users` WHERE `users`.`id` = '$id'");

        unset($_SESSION['user']);
        $user = mysqli_fetch_assoc($sql);
        $_SESSION['user'] = [true, $user['id'], $user['name'], $user['email'], $user['password'], $user['surname'], $user['displayName'], ($user['photo']), $user['location'], $user['bio'], $user['status'], $user['subscription'], $user['followers'], $user['plays'], $user['tracks'], $user['phoneNumber'], $user['2Auth'], $user['soundCloud'], $user['youtube'], $user['rutube'], $user['tiktok'], $user['twitch'], $user['wallet']];

        if ($language == 'en') {
            $result = "You successfully replenished";
        } else {
            $result = "Вы успешно пополнили";
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