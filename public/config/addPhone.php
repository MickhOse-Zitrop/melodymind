<?php

require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$id = $dData['id'];
$phone = (int)$dData['phone'];
$language = $dData['language'];

$sql = mysqli_query($link, "SELECT * FROM users WHERE id = '$id'");
if (!mysqli_fetch_assoc($sql)) {
    if ($language == 'en') {
        $result = "User doesn't exists!";
    } else {
        $result = "Пользователь не существует!";
    }
} else {
    $sql = "UPDATE `users` SET `phoneNumber` = '$phone' WHERE `users`.`id` = '$id'";

    if ($connect->query($sql)) {
        if ($language == 'en') {
            $result = "You've successfully added your phone number";
        } else {
            $result = "Вы успешно добавили номер телефона";
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
