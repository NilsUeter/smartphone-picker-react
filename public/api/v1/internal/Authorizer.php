<?php
    function checkValidAuthentication($pdo, $realm) {
        //TODO checken, ob es andere Möglichkeit gibt anstatt bei jedem call ein Logger Objekt zu erzeugen
        //ggf. ein Authorizer Objekt?
        require_once('Logger.php');
        $logger = new Logger("INTERNAL_Authorizer");
        $logger->logToFile('Authorization request for realm ' . $realm);
        if (isset($_SERVER['PHP_AUTH_USER'])) {
            $logger->logToFile('Trying to authorize as ' . $_SERVER['PHP_AUTH_USER']);
            $sql = "SELECT PW_SALTED_HASHED FROM USER WHERE NAME = ? AND REALM = ?";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(1, $_SERVER['PHP_AUTH_USER']);
            $statement->bindValue(2, $realm);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            $statement = NULL;
            //PDO::FETCH_ASSOC gibt die nächste row als Arrays zurück oder FALSE bei Fehlschlag
            if(is_array($result)) {
                if (password_verify($_SERVER['PHP_AUTH_PW'], $result['PW_SALTED_HASHED'])) {
                    $logger->logToFile('Successfully authorized as ' . $_SERVER['PHP_AUTH_USER'] . ' for realm ' . $realm);
                    return TRUE;
                } 
            }
        }

        $logger->logToFile('401 Unauthorized, wrong credentials');
        header('WWW-Authenticate: Basic realm="' . $realm . '"');
        header('HTTP/1.0 401 Unauthorized');
        header('Content-Type: application/json');
        $user = array('status' => 'Request blocked, authentification failed');
        //Return object with status
        echo json_encode($user);
        return FALSE;
    }
?>