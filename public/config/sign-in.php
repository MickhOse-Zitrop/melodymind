<?php
session_start();
require_once('connect.php');

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$email = $dData['email'];
$password = md5($dData['password']);
$language = $dData['language'];

$sql = mysqli_query($link, "SELECT * FROM users WHERE email = '$email' && password = '$password'");

if (mysqli_num_rows($sql) > 0) {
    $user = mysqli_fetch_assoc($sql);
    $_SESSION['user'] = [true, $user['id'], $user['name'], $user['email'], $user['password'], $user['surname'], $user['displayName'], ($user['photo']), $user['location'], $user['bio'], $user['status'], $user['subscription'], $user['followers'], $user['plays'], $user['tracks'], $user['phoneNumber'], $user['2Auth'], $user['soundCloud'], $user['youtube'], $user['rutube'], $user['tiktok'], $user['twitch'], $user['wallet']];
    if ($language == 'en') {
        $result = "You successfully logged in. Redirecting...";
    } else {
        $result = "Вы успешно вошли. Перенаправляем...";
    }
    $login = true;
} else {
    if ($language == 'en') {
        $result = "Incorrect email or password";
    } else {
        $result = "Неверный адрес эл. почты или пароль";
    }
}

$response[] = array("result" => $result, "login" => $login);
echo json_encode($response);
