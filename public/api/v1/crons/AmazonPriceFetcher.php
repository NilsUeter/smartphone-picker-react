<?php
    require_once('../internal/Logger.php');
    $logger = new Logger("CRON_AmazonPriceFetcher");
    // Check the HTTP method of the request
    header('Access-Control-Allow-Methods: GET');
    if($_SERVER['REQUEST_METHOD'] !== 'GET') {
        $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' rejected');
        header('HTTP/1.1 405 Method not allowed Error');
        header('Content-Type: application/json');
        $status = array('status' => 'Request rejected');
        echo json_encode($status);
        die();
    }

    $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' accepted');
    $logger->logToFile('Useragent: '.$_SERVER['HTTP_USER_AGENT']);
    require_once('../internal/Authorizer.php');
    require_once('../internal/DbConnect.php');
    if(checkValidAuthentication($pdo, "CRONS")) {
        //Get all Amazon Items to update
        //TODO andere Amazon Märkte, aktuell hardcode DE und nur AmazonDataRequester für DE,
        //Alle Amazon Vendoren abfragen, für jeden einen Requester und dann für alle ModelTypes jedes Vendors alle ASIN`s abfragen
        $statement = $pdo->query("SELECT ID, ITEM_ID FROM MODEL_TYPE WHERE VENDOR_ID = 'AMAZON_DE'");
        $items = $statement->fetchAll();
        
        //Counter to get a maximum of 10 ASINS for each batch request
        $i = 0;
        $dataRequester = new AmazonDataRequester("AMAZON_DE", $pdo);
        foreach($items as $key => $item) {
            $itemIDs[$i] = $item['ITEM_ID'];
            /*If the last or the 10th item_id (index 0-9) has been added to the array do the request and reset item_id array for the next one
            After the evalutaion of the if $i++ inecrements the variable for the case when if returns false and the next item_id should be added */
            if($key === array_key_last($items) || $i++ === 9) {
                $result = $dataRequester->batchRequest($itemIDs);
                //Check for failed request
                if($result !== FALSE) {
                    $xmlResult = new SimpleXMLElement($result);
                    //Check if the successful request was valid
                    if($xmlResult->Items->Request->IsValid->__toString() === "True") {
                        //Parse the xml and get relevant data
                        //Add the data of each Item to the corresponding $items entry fetched from the database before
                        //Because the data of the db is ID keyed and the data from Amazon ASIN keyed we need to search for the array entry with the right ID,
                        //get the key and use that key to store all the data
                        foreach ($xmlResult->Items->Item as $XMLItem) {
                            $key = array_search($XMLItem->ASIN->__toString(), array_column($items, 'ITEM_ID'));
                            //Link to to Amazon detail page
                            $items[$key]['LINK'] = $XMLItem->DetailPageURL->__toString();
                            //Amazon delivers amounts without decimal separator, so we need to divide with 100
                            //e. g. 180,99€ comes as 18099 and 18099/100 = 180,99
                            if($XMLItem->OfferSummary->LowestNewPrice->Amount !== NULL) {
                                $amazonPriceString = $XMLItem->OfferSummary->LowestNewPrice->Amount->__toString();
                                $items[$key]['PRICE'] = (floatval($amazonPriceString)/100);
                            } else {
                                //Element LowestNewPrice not existing, setting default value
                                //TODO Considered to be changed
                                $items[$key]['PRICE'] = 0.00;
                            }
                         }
                    } else {
                        $logger->logToFile('Request to Amazon PA-APO was not valid');
                    }
                } else {
                    $logger->logToFile('Request to Amazon PA-API failed');
                }
                unset($itemIDs);
                $i = 0;
            }
        }

        //Persist fetched data into the database
        //The run though the array above only really executes every 10 items becuase of the batch request logic, now we need to execute everytime
        $sqlProps = "UPDATE MODEL_TYPE SET LINK = ?, LAST_UPDATED = CURRENT_TIMESTAMP() WHERE ID = ?";
        $statementProps = $pdo->prepare($sqlProps);
        $sqlPrice = "INSERT INTO MODEL_TYPE_PRICE (MODEL_TYPE_ID, PRICE, TIMESTAMP) VALUES (?, ?, CURRENT_TIMESTAMP())";
        $statementPrice = $pdo->prepare($sqlPrice);
        $pdo->beginTransaction();
        foreach($items as $item) {
            //Upate MODEL_TYPE sepcific properties
            $statementProps->bindValue(1, $item['LINK']);
            $statementProps->bindValue(2, $item['ID']);
            $statementProps->execute();
            //Insert current MODEL_TYPE prices to price history
            $statementPrice->bindValue(1, $item['ID']);
            $statementPrice->bindValue(2, $item['PRICE']);
            $statementPrice->execute();
        }
        $pdo->commit();

        //Return successful status object
        $logger->logToFile('Persisted fetched prices in the database, request ended successfully');
        header('Content-Type: application/json');
        header('HTTP/1.1 200 OK');
        $status = array('status' => 'Successfully fetched and persisted current Amazon prices');
        echo json_encode($status);
    } else {
        $logger->logToFile('Authentification failed, request aborted');
    }

    //TODO externalisieren falls woanders benötigt
    class AmazonDataRequester {
        private $endpoint;
        private $uri;
        private $secret_key;
        private $params;

        function __construct($amazonVendorID, $pdo) {
            $statement = $pdo->query("SELECT ENDPOINT, SECRET_KEY, ASSOCIATE_TAG, ACCESS_KEY FROM VENDOR WHERE ID = '$amazonVendorID'");
            $amazonVendor = $statement->fetch();
            //these are the fix properties of every request
            $this->endpoint = $amazonVendor['ENDPOINT'];
            $this->uri = "/onca/xml";
            $this->secret_key = $amazonVendor['SECRET_KEY'];
            $this->params = array(
              "Service" => "AWSECommerceService",
              "Operation" => "ItemLookup",
              "AssociateTag" => $amazonVendor['ASSOCIATE_TAG'],
              "AWSAccessKeyId" => $amazonVendor['ACCESS_KEY'],
              "IdType" => "ASIN",
              //'OfferSummary' for smallest price of the item with "New" condition
              //'Small' for the DetailPageURL
              "ResponseGroup" => "OfferSummary, Small"
            );
        }

        // Request smartphone Data from up to 10 ASIN's at a time
        public function batchRequest($asinList) {
            //Convert ASIN list to 1 comma seperated ASIN list and set it in the request params
            $this->params['ItemId'] = join(",", $asinList);
            //Set current timestamp
            $this->params['Timestamp'] = gmdate('Y-m-d\TH:i:s\Z');
            //Sort the parameters by key
            ksort($this->params);
            //Combine param keys and values to 1 url encoded query parameter and join them all to 1 query string
            $pairs = array();
            foreach ($this->params as $key => $value) {
                array_push($pairs, rawurlencode($key)."=".rawurlencode($value));
            }
            //Generate the canonical query (sorted and url encoded)
            $canonical_query_string = join("&", $pairs);
            //Generate the string to be signed
            //What is needed for the correct signature and how it has to be formatted: https://docs.aws.amazon.com/AWSECommerceService/latest/DG/HMACSignatures.html
            $string_to_sign = "GET\n".$this->endpoint."\n".$this->uri."\n".$canonical_query_string;
            //Generate the signature required by the Product Advertising API
            $signature = base64_encode(hash_hmac("sha256", $string_to_sign, $this->secret_key, true));
            // Generate the signed request URL
            //TODO loggen
            $request_url = 'https://'.$this->endpoint.$this->uri.'?'.$canonical_query_string.'&Signature='.rawurlencode($signature);
            //execute request and return result (FALSE if failed, XML with data when successful)
            //file_get_contents can timeout only resulting in an E_WARNING. To catch it and prevent further dmg adjust error handler
            //just for this call and if the timeout is catched return FALSE
            //https://stackoverflow.com/questions/1241728/can-i-try-catch-a-warning
            set_error_handler(function ($err_severity, $err_msg, $err_file, $err_line, array $err_context) {
                throw new ErrorException( $err_msg, 0, $err_severity, $err_file, $err_line );
            }, E_WARNING);
            try {
                return file_get_contents($request_url);
            } catch (Exception $e) {
                $this->sErrorMsg = $e->getMessage();
                return FALSE;
            }
            restore_error_handler();
        }
    }
?>