<?php
  if($_SERVER['QUERY_STRING'] != "EXECUTE"){
    echo "Nothing to see here <br>";
    exit();
  }

  ignore_user_abort(true);
  set_time_limit(0);

  require_once "Logger.php";
  require_once "SmartphoneDataRequester.php";

  $json = json_decode(file_get_contents("../data/smartphones.json"),TRUE);

  $countries = array(
      array("de", "webservices.amazon.de", "smartphonep08-21"),
      array("com", "webservices.amazon.com", "smartphonep08-20" ),
  );

  $counter = array();
  for ($i=0; $i < count($json['smartphones']); $i++) {
    for ($x=0; $x < count($countries); $x++) {
      for ($e=0; $e <count($json['smartphones'][$i]['asin'][$countries[$x][0]]) ; $e++) {
          $counter[] = array($i, $countries[$x][0], $x, $e );
          $json['smartphones'][$i]['price'][$countries[$x][0]] = [];
          $json['smartphones'][$i]['amazon'][$countries[$x][0]] = [];
      }
    }
  }

 $smartphoneDataRequester = [];
   for ($i = 0; $i < count($countries); $i++) {
     $smartphoneDataRequester[] = new SmartphoneDataRequester($countries[$i][1], $countries[$i][2]);
   }

$loopCount = 0;
$x = 0;
while (count($counter) > 0 && $loopCount != 3) {
    logToFile("amazonSlave_de", "Smartphonenumber is: " . $counter[$x][0]);
    echo "Smartphonenumber is: . $x . <br>";
    if ($json['smartphones'][$counter[$x][0]]['asin'][$counter[$x][1]][$counter[$x][3]][1] != '') {
      logToFile("amazonSlave_de", "ASIN: " . $json['smartphones'][$counter[$x][0]]['asin'][$counter[$x][1]][$counter[$x][3]][1]);
      echo "ASIN: " . $json['smartphones'][$counter[$x][0]]['asin'][$counter[$x][1]][$counter[$x][3]][1] . "<br>";

      $smartphoneData = $smartphoneDataRequester[$counter[$x][2]]->getSmartPhoneData($json['smartphones'][$counter[$x][0]]['asin'][$counter[$x][1]][$counter[$x][3]][1]);
      if($smartphoneData[0] === TRUE) {
        logToFile("amazonSlave_de", "Amazon blocked Request with ASIN " . $json['smartphones'][$counter[$x][0]]['asin'][$counter[$x][1]][$counter[$x][3]][1]);
        echo "Amazon blocked <br>";
        $x++;
      } else {
        $json['smartphones'][$counter[$x][0]]['amazon'][$counter[$x][1]][] = array($smartphoneData[1]);
        $json['smartphones'][$counter[$x][0]]['price'][$counter[$x][1]][] = array($smartphoneData[2]);
        logToFile("amazonSlave_de", "New Price: " . $smartphoneData[2]);
        echo "New Price: " . $smartphoneData[2] . "<br>";
        echo "CountArray: " . count($counter) . "<br>";
        array_splice($counter, $x, 1); //Delete element when it was succesful
        echo "CountArray: " . count($counter) . "<br>";
      }
    }
    else {
      array_splice($counter, $x, 1); //Delete element when there is no asin
    }
    if($x === count($counter))
    {
      echo "Reset x to 0: " . "<br>";
      $x = 0;
      $loopCount++;
    }
}

  file_put_contents("../data/smartphones.json", json_encode($json));
  logToFile("amazonSlave_de", "Prices should be updated");
  echo "Files should be updated <br>";
?>
