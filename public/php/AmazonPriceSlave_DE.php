<?php
    if($_SERVER['QUERY_STRING'] != "EXECUTE"){
        echo "Nothing to see here <br>";
        exit();
    }

    ignore_user_abort(true);

    require_once "Logger.php";
    require_once "SmartphoneDataRequester.php";

    $phones = json_decode(file_get_contents("../data/smartphoneData.json"),TRUE);

    echo "Iterating through every Phone <br>";
    foreach ($phones as $key => $phone) {
        echo "Updating phone {$key} <br>";

        echo "Iterating through every DE phone type <br>";
        $smartphoneDataRequester = new SmartphoneDataRequester("webservices.amazon.de", "smartphonep08-21");
        foreach($phone["types"]["de"] as &$phoneType) {
            echo "Type name: " . $phoneType["name"] . " <br>";
            echo "Type asin: " . $phoneType["asin"] . " <br>";
            echo "Type old link: " . $phoneType["link"] . " <br>";
            echo "Type old price: " . $phoneType["price"] . " <br>";

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
        echo "Iterated through every DE phone type <br>";


        echo "Updated phone {$key} <br>";
    }
    echo "Iterated through every Phone <br>";
?>