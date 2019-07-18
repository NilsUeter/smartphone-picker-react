<?php
    //headers
    header('Access-Control-Allow-Methods: GET');
    header('Content-Type: application/json');
    // Check the HTTP method of the request
    if($_SERVER['REQUEST_METHOD'] !== 'GET') {
        header('HTTP/1.1 405 Method not allowed Error');
        die();
    }

    require_once('../internal/Authorizer.php');
    require_once('../internal/DbConnect.php');
    if(checkValidAuthentication($pdo, "CRONS")) {
        //Get all Amazon Items to update
        //TODO andere Märkte als DE
        $statement = $pdo->query("SELECT type.ID, type.ITEM_ID FROM MODEL_TYPE type LEFT JOIN PHONE_MODEL model ON type.PHONE_MODEL_ID = model.ID 
                                WHERE model.MARKET_ID = 'de' AND type.VENDOR = 'AMAZON'");
        $items = $statement->fetchAll();
        
        foreach($items as $item) {
            //TODO Batch Abfragen bauen und Logging für die APIS hier und generell
            echo "<br>" . $item['ITEM_ID'] . "<br/>";
        }
    }
?>