<?php
    function checkValidAuthentication($pdo, $realm) {
        if (!isset($_SERVER['PHP_AUTH_USER'])) {
            header('WWW-Authenticate: Basic realm="' . $realm . '"');
            header('HTTP/1.0 401 Unauthorized');
            $user = array('status' => 'Request blocked, authentification needed');
            //Return object with status
            echo json_encode($user);
            die();
        } else {       
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
                    return TRUE;
                } 
            }
        }

        header('WWW-Authenticate: Basic realm="' . $realm . '"');
        header('HTTP/1.0 401 Unauthorized');
        $user = array('status' => 'Request blocked, authentification failed');
        //Return object with status
        echo json_encode($user);
        return FALSE;
    }
?>