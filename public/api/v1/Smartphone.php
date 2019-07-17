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
    require_once('internal/DbConnect.php');
    require_once('internal/model/PhoneModel.php');
    require_once('internal/model/Smartphone.php');
    $result = $connection->query("SELECT * FROM SMARTPHONE");

    $smartphones = [];
    for($i = 0; $i < $result->num_rows; $i++) {
        $result->data_seek($i);
        $row = $result->fetch_assoc();
        $smartPhoneID = $row['ID'];
        $modelsResult = $connection->query("SELECT * FROM PHONE_MODEL WHERE SMARTPHONE_ID = $smartPhoneID");
        $models = [];
        for($j = 0; $j < $modelsResult->num_rows; $j++) {
            $modelsResult->data_seek($j);
            $modelRow = $modelsResult->fetch_assoc();
            $models[$j] = new PhoneModel($modelRow);
        }
        $smartphones[$i] = new Smartphone($row, $models);
    }
    print_r(json_encode($smartphones));
?>