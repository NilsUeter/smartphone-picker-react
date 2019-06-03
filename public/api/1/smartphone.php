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

    //Retrieve Smartphone data, generate json and return
    require_once('dbConnect.php');
?>