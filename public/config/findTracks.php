<?php
require_once('connect.php');

$sql = mysqli_query($link, "SELECT * FROM tracks WHERE 1");
$tracks = mysqli_fetch_assoc($sql);

$result = [$tracks['id'], $tracks['title'], $tracks['idAuthor'], $tracks['price'], $tracks['photo'], $tracks['description']];

$response[] = array("result" => $result);
echo json_encode($response);
