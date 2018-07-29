<?php
    if($_SERVER['QUERY_STRING'] != "EXECUTE"){
        echo "Nothing to see here <br>";
        exit();
    }

    ignore_user_abort(true);

    require_once "Logger.php";
    require_once "SmartphoneDataRequester.php";

    $phones = json_decode(file_get_contents("../data/smartphoneData.json"),TRUE);
    $markets = json_decode(file_get_contents("../data/markets.json"),TRUE);

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

            $smartphoneDataRequester = new SmartphoneDataRequester($markets[$market]["endpoint"], $markets[$market]["associateTag"]);

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
    
                $smartphoneData = $smartphoneDataRequester->getSmartPhoneData($phoneType["asin"]);
                if($smartphoneData[0] === TRUE) {
                    logToFile("AmazonPriceSlave", "Amazon blocked");
                    echo "Amazon blocked <br>";
    
                } else {
                    $phones[$keyPhone]["types"][$market][$keyType]["link"] = $smartphoneData[1];
                    logToFile("AmazonPriceSlave", "New link: " . $smartphoneData[1]);
                    echo "New link: " . $smartphoneData[1] . "<br>";
                    $phones[$keyPhone]["types"][$market][$keyType]["price"] = $smartphoneData[2];
                    logToFile("AmazonPriceSlave", "New price: " . $smartphoneData[2]);
                    echo "New price: " . $smartphoneData[2] . "<br>";
                }
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