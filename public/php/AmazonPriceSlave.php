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
        echo "<br>Updating phone {$keyPhone} <br>";

        logToFile("AmazonPriceSlave", "Iterating though every market the phone has available types");
        echo "Iterating though every market the phone has available types<br>";
        foreach(array_keys($phone["types"]) as &$market) {
            logToFile("AmazonPriceSlave", "Market name: {$market}");
            echo "<br>Market name: {$market}<br>";
            logToFile("AmazonPriceSlave", "endpoint " . $markets[$market]["endpoint"]);
            echo "endpoint " . $markets[$market]["endpoint"] . "<br>";
            logToFile("AmazonPriceSlave", "associateTag " . $markets[$market]["associateTag"]);
            echo "associateTag " . $markets[$market]["associateTag"] . "<br>";
            logToFile("AmazonPriceSlave", "Iterating through every {$market} phone type");
            echo "<br>Iterating through every {$market} phone type <br>";
            foreach($phone["types"][$market] as $keyType => $phoneType) {
                logToFile("AmazonPriceSlave", "Name: " . $phoneType["name"]);
                echo "<br>Name: " . $phoneType["name"] . " <br>";
                logToFile("AmazonPriceSlave", "Asin: " . $phoneType["asin"]);
                echo "Asin: " . $phoneType["asin"] . " <br>";
                logToFile("AmazonPriceSlave", "Old link: " . $phoneType["link"]);
                echo "Old link: " . $phoneType["link"] . " <br>";
                logToFile("AmazonPriceSlave", "Old price: " . $phoneType["price"]);
                echo "Old price: " . $phoneType["price"] . " <br>";
    
                $smartphoneData = $smartphoneDataRequesters[$market]->getSmartPhoneData($phoneType["asin"]);
                echo "Request Url: " . $smartphoneData[request_url] . " <br>";
                logToFile("AmazonPriceSlave", "Request Url: " . $smartphoneData[request_url]);
                if($smartphoneData["failed"] === TRUE) {
                    logToFile("AmazonPriceSlave", "Amazon blocked");
                    echo "Amazon blocked <br>";
                } else {
                    $phones[$keyPhone]["types"][$market][$keyType]["link"] = $smartphoneData["link"];
                    logToFile("AmazonPriceSlave", "New link: " . $smartphoneData["link"]);
                    echo "New link: " . $smartphoneData["link"] . "<br>";
                    $phones[$keyPhone]["types"][$market][$keyType]["price"] = $smartphoneData["price"];
                    logToFile("AmazonPriceSlave", "New price: " . $smartphoneData["price"]);
                    echo "New price: " . $smartphoneData["price"] . "<br>";
                }

                flush();
                ob_flush();
            }
            logToFile("AmazonPriceSlave", "Iterated through every {$market} phone type");
            echo "<br>Iterated through every {$market} phone type <br>";
        }
        logToFile("AmazonPriceSlave", "Iterated though every market the phone has available types");
        echo "Iterated though every market the phone has available types<br>";
        logToFile("AmazonPriceSlave", "Updated phone {$keyPhone}");
        echo "Updated phone {$keyPhone} <br>";
    }
    logToFile("AmazonPriceSlave", "Iterated through every Phone");
    echo "Iterated through every Phone <br>";

    file_put_contents("../data/smartphoneData.json", json_encode($phones));
    logToFile("AmazonPriceSlave", "Files should be updated");
    echo "Files should be updated <br>";
?>