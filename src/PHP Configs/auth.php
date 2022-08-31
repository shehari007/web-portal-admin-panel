<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
//error_reporting(E_ERROR | E_PARSE);
include 'config_db.php';
//echo $_POST["action"];

if ($_POST["action"] == "register") {
    $sql = 'INSERT INTO users (username, email, password) values ("' . $_POST["username"] . '","' . $_POST["email"] . '","' . $_POST["password"] . '")';
    $result = $conn->query($sql);
    $jsonArray  = $result;
}

if ($_POST["action"] == "login") {
    
    $sql = 'SELECT id from users where email= "' . $_POST["email"] . '" AND password= "' . $_POST["password"] . '"';
    $result = $conn->query($sql);
    $jsonArray  = $result->num_rows;
}

if ($_POST["action"] == "list") {
    $sql = "SELECT  username, password, email FROM users";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {
            $alls[] = $row;
        }
        $jsonArray = $alls;
    } else {
        echo "0 results";
    }
    $conn->close();
}

echo json_encode($jsonArray);
