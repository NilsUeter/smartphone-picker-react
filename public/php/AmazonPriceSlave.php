<?php
    if($_SERVER['QUERY_STRING'] != "EXECUTE"){
        echo "Nothing to see here <br>";
        exit();
    }

    ignore_user_abort(true);
    set_time_limit(0);
    ini_set("log_errors", 1);
    ini_set("error_log", "../logs/php-error.log");

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
    $counter = 0;
    foreach ($phones as $keyPhone => $phone) {
        logToFile("AmazonPriceSlave", "Updating phone {$keyPhone}");

        foreach(array_keys($phone["types"]) as &$market) {
            logToFile("AmazonPriceSlave", "Iterating through every {$market} phone type");

            foreach($phone["types"][$market] as $keyType => $phoneType) {

                if($counter < 40) {
                    logToFile("AmazonPriceSlave", "Last Updated: " . $phoneType["lastUpdated"]);
                    $dateLastUpdated = date_create_from_format("d.m.Y H:i:s", $phoneType["lastUpdated"]);
                    $dateUpdate = date_create();
                    date_modify($dateUpdate, '-3 hours');
                    logToFile("AmazonPriceSlave", "Update time (now-3H): " . date_format($dateUpdate, "d.m.Y H:i:s"));

                    if($dateLastUpdated < $dateUpdate) {
                        logToFile("AmazonPriceSlave", "Name: " . $phoneType["name"]);
                        logToFile("AmazonPriceSlave", "Asin: " . $phoneType["asin"]);
                        logToFile("AmazonPriceSlave", "Old link: " . $phoneType["link"]);
                        logToFile("AmazonPriceSlave", "Old price: " . $phoneType["price"]);

                        logToFile("AmazonPriceSlave", "Current request counter: {$counter}");
                        $smartphoneData = $smartphoneDataRequesters[$market]->getSmartPhoneData($phoneType["asin"]);
                        logToFile("AmazonPriceSlave", "Request Url: " . $smartphoneData[request_url]);
                        if($smartphoneData["failed"] === TRUE) {
                            logToFile("AmazonPriceSlave", "Amazon blocked");
                        } else {
                            $phones[$keyPhone]["types"][$market][$keyType]["link"] = $smartphoneData["link"];
                            logToFile("AmazonPriceSlave", "New link: " . $smartphoneData["link"]);
                            $phones[$keyPhone]["types"][$market][$keyType]["price"] = $smartphoneData["price"];
                            logToFile("AmazonPriceSlave", "New price: " . $smartphoneData["price"]);
                            $phones[$keyPhone]["types"][$market][$keyType]["lastUpdated"] = date_format(new DateTime(), "d.m.Y H:i:s");
                        }
                        $counter++;
                    } else {
                        echo "Ignoring a phone type in this update call, no 3 hours since last update of this type <br>";
                        logToFile("AmazonPriceSlave", "Ignoring this phone type in this update call, no 3 hours since last update");
                    }
                } else {
                    echo "Max request counter for one script call {$counter} reached, exiting <br>";
                    logToFile("AmazonPriceSlave", "Max request counter for one script call {$counter} reached, exiting");
                    file_put_contents("../data/smartphoneData.json", json_encode($phones));
                    logToFile("AmazonPriceSlave", "Updated data files");
                    echo "Updated data files <br>";
                    exit();
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