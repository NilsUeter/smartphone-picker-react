<?php
    function hasValidAuthentication($realm) {
        //TODO checken, ob es andere Möglichkeit gibt anstatt bei jedem call ein Logger Objekt zu erzeugen
        //ggf. ein Authorizer Objekt?
        require_once('Logger.php');
        $logger = new Logger("INTERNAL_Authorizer");
        $logger->logToFile('Authorization request for realm ' . $realm);
        if (isset($_SERVER['PHP_AUTH_USER'])) {
            require_once('MySQLDBConnection.php');
            $logger->logToFile('Trying to authorize as ' . $_SERVER['PHP_AUTH_USER']);
            $sql = "SELECT PW_SALTED_HASHED FROM USER WHERE NAME = ? AND REALM = ?";
            $statement = MySQLDBConnection::$pdo->prepare($sql);
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
        return FALSE;
    }
?>