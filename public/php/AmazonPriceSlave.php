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

    echo "Iterating through every Phone <br>";
    foreach ($phones as $key => $phone) {
        echo "<br>Updating phone {$key} <br>";

        echo "Iterating though every market the phone has available types<br>";
        foreach(array_keys($phone["types"]) as &$market) {
            echo "<br>Market name: {$market}<br>";
            echo "endpoint " . $markets[$market]["endpoint"] . "<br>";
            echo "associateTag " . $markets[$market]["associateTag"] . "<br>";

            $smartphoneDataRequester = new SmartphoneDataRequester($markets[$market]["endpoint"], $markets[$market]["associateTag"]);

            echo "<br>Iterating through every {$market} phone type <br>";
            foreach($phone["types"][$market] as &$phoneType) {
                echo "<br>Name: " . $phoneType["name"] . " <br>";
                echo "Asin: " . $phoneType["asin"] . " <br>";
                echo "Old link: " . $phoneType["link"] . " <br>";
                echo "Old price: " . $phoneType["price"] . " <br>";
    
                $smartphoneData = $smartphoneDataRequester->getSmartPhoneData($phoneType["asin"]);
                if($smartphoneData[0] === TRUE) {
                    echo "Amazon blocked <br>";
    
                } else {
                    $phoneType["link"] = $smartphoneData[1];
                    echo "New link: " . $smartphoneData[1] . "<br>";
                    $phoneType["price"] = $smartphoneData[2];
                    echo "New price: " . $smartphoneData[2] . "<br>";
                }
            }
            echo "<br>Iterated through every {$market} phone type <br>";
        }
        echo "Iterated though every market the phone has available types<br>";
        echo "Updated phone {$key} <br>";
    }
    echo "Iterated through every Phone <br>";
?>