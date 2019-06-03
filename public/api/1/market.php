<?php
    //headers
    header('Access-Control-Allow-Methods: GET');
    header('Content-Type: application/json');
    // get the HTTP method of the request
    $method = $_SERVER['REQUEST_METHOD'];
    if($method !== 'GET') {
        header('HTTP/1.1 405 Method not allowed Error');
        die();
    }

    //Retrieve Market data, generate json and return
    require_once('dbConnect.php');
    require_once('../model/Market.php');
    $result = $connection->query("SELECT * FROM MARKET");

    $markets = [];
    for($i = 0; $i < $result->num_rows; $i++) {
        $result->data_seek($i);
        $row = $result->fetch_assoc();
        $markets[$i] = new Market($row['ID'], $row['ENDPOINT'], $row['ASSOCIATE_TAG']);
    }

    print_r(json_encode($markets));
?>