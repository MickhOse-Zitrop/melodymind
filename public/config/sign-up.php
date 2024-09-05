<?php

require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];
$password = $dData['password'];
$language = $dData['language'];
$id = rand(100000, 999999);

$id_sql = mysqli_query($link, "SELECT * FROM users WHERE id = '$id'");
while (mysqli_fetch_assoc($id_sql)) {
    $id = rand(100000, 999999);
}

$sql = mysqli_query($link, "SELECT * FROM users WHERE email = '$email'");
if (!mysqli_fetch_assoc($sql)) {
    $password = md5($password);
    $sql = "INSERT INTO users (id, email, password) VALUES ('$id', '$email', '$password')";

    if ($connect->query($sql)) {
        if ($language == 'en') {
            $result = "You've successfully registered";
        } else {
            $result = "Вы успешно зарегистрировались";
        }
        $login = true;
    } else {
        if ($language == 'en') {
            $result = "Registration error";
        } else {
            $result = "Ошибка регистрации";
        }
    }
} else {
    if ($language == 'en') {
        $result = "User already exists!";
    } else {
        $result = "Такой пользователь уже существует!";
    }
}

$link->close();
$response[] = array("result" => $result, "login" => $login);
echo json_encode($response);
