<?php
    //headers
    header('Access-Control-Allow-Methods: GET, POST');
    //header('Content-Type: application/json');
    // get the HTTP method of the request
    $method = $_SERVER['REQUEST_METHOD'];
    if($method !== 'GET' && $method !== 'POST') {
        header('HTTP/1.1 405 Method not allowed Error');
        die();
    }

    require_once('dbConnect.php');
    require_once('../model/PhoneModel.php');

    switch($method){
        case 'GET':
            //Retrieve PhoneModel data, generate json and return
            $result = $connection->query("SELECT * FROM PHONE_MODEL");

            $phoneModels = [];
            for($i = 0; $i < $result->num_rows; $i++) {
                $result->data_seek($i);
                $row = $result->fetch_assoc();
                $phoneModels[$i] = new PhoneModel($row);
            }

            print_r(json_encode($phoneModels));
            break;
        case 'POST':
            //Retrieve PhoneModel json, generate Object, persist and return
            $phoneModel = json_decode(file_get_contents('php://input'), true);
            
            $sql = "SELECT SMARTPHONE_ID FROM PHONE_MODEL WHERE SMARTPHONE_ID = ? AND MARKET_ID = ? AND ASIN = ?";
            $statement = $connection->prepare($sql);
            $statement->bind_param('iss', $smartphoneId, $marketID, $asin);
            $smartphoneId= $phoneModel['smartphoneID'];
            $marketID = $phoneModel['marketID'];
            $asin = $phoneModel['asin'];
            $statement->execute();
            $result = $statement->get_result();
            if($result->num_rows > 0) {
                //PhoneModel existiert bereits
                $sql = "UPDATE PHONE_MODEL SET NAME = ?, PRICE = ?, LINK = ?, LAST_UPDATED = ? WHERE SMARTPHONE_ID = ? AND MARKET_ID = ? AND ASIN = ?";
                $statement = $connection->prepare($sql);
                $statement->bind_param('sississ', $name, $price, $link, $lastUpdated, $smartphoneId, $marketID, $asin);
            } else {
                //PhoneModel Eintrag muss erstellt werden
                $sql = "INSERT INTO PHONE_MODEL (SMARTPHONE_ID, MARKET_ID, ASIN, NAME, PRICE, LINK, LAST_UPDATED) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $statement = $connection->prepare($sql);
                $statement->bind_param('isssiss', $smartphoneId, $marketID, $asin, $name, $price, $link, $lastUpdated);
            }
            $name = $phoneModel['name'];
            $price = $phoneModel['price'];
            $link = $phoneModel['link'];
            $lastUpdated = date("Y-m-d H:i:s", $phoneModel['lastUpdated']);
            if(!$statement->execute()) {
                header('HTTP/1.1 500 Internal Server Error');
                die();
            }

            print_r(json_encode($phoneModel));
            break;
    }
?>