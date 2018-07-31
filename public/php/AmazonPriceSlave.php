<?php
    if($_SERVER['QUERY_STRING'] != "EXECUTE"){
        echo "Nothing to see here <br>";
        exit();
    }

    ignore_user_abort(true);
    set_time_limit(0);
    ini_set("log_errors", 1);
    ini_set("error_log", "../logs/php-error.log");
    ini_set('max_execution_time','200M'); 
    ini_set('max_input_time','200M');

    require_once "Logger.php";
    require_once "SmartphoneDataRequester.php";

    $phones = json_decode(file_get_contents("../data/smartphoneData.json"),TRUE);
    $markets = json_decode(file_get_contents("../data/markets.json"),TRUE);
    $smartphoneDataRequesters = [];
    foreach(array_keys($markets) as &$market) {
        $smartphoneDataRequesters[$market] = new SmartphoneDataRequester($markets[$market]["endpoint"], $markets[$market]["associateTag"]);
    }

    logToFile("AmazonPriceSlave", "Iterating through every Phone");
    echo "Iterating through every Phone <br>";
    foreach ($phones as $keyPhone => $phone) {
        logToFile("AmazonPriceSlave", "Updating phone {$keyPhone}");
        logToFile("AmazonPriceSlave", "Iterating though every market the phone has available types");

        foreach(array_keys($phone["types"]) as &$market) {
            logToFile("AmazonPriceSlave", "Market name: {$market}");
            logToFile("AmazonPriceSlave", "Endpoint " . $markets[$market]["endpoint"]);
            logToFile("AmazonPriceSlave", "AssociateTag " . $markets[$market]["associateTag"]);
            logToFile("AmazonPriceSlave", "Iterating through every {$market} phone type");

            foreach($phone["types"][$market] as $keyType => $phoneType) {
                logToFile("AmazonPriceSlave", "Name: " . $phoneType["name"]);
                logToFile("AmazonPriceSlave", "Asin: " . $phoneType["asin"]);
                logToFile("AmazonPriceSlave", "Old link: " . $phoneType["link"]);
                logToFile("AmazonPriceSlave", "Old price: " . $phoneType["price"]);
    
                $smartphoneData = $smartphoneDataRequesters[$market]->getSmartPhoneData($phoneType["asin"]);
                logToFile("AmazonPriceSlave", "Request Url: " . $smartphoneData[request_url]);
                if($smartphoneData["failed"] === TRUE) {
                    logToFile("AmazonPriceSlave", "Amazon blocked");
                } else {
                    $phones[$keyPhone]["types"][$market][$keyType]["link"] = $smartphoneData["link"];
                    logToFile("AmazonPriceSlave", "New link: " . $smartphoneData["link"]);
                    $phones[$keyPhone]["types"][$market][$keyType]["price"] = $smartphoneData["price"];
                    logToFile("AmazonPriceSlave", "New price: " . $smartphoneData["price"]);
                }
            }
            logToFile("AmazonPriceSlave", "Iterated through every {$market} phone type");
        }
        logToFile("AmazonPriceSlave", "Iterated though every market the phone has available types");
        logToFile("AmazonPriceSlave", "Updated phone {$keyPhone}");
        echo "Updated phone {$keyPhone} <br>";
    }
    logToFile("AmazonPriceSlave", "Iterated through every Phone");
    echo "Iterated through every Phone <br>";

    file_put_contents("../data/smartphoneData.json", json_encode($phones));
    logToFile("AmazonPriceSlave", "Files should be updated");
    echo "Files should be updated <br>";
?>