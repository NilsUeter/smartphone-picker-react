<?php
    function checkValidAuthentication($realm) {
        if (!isset($_SERVER['PHP_AUTH_USER'])) {
            header('WWW-Authenticate: Basic realm="' . $realm . '"');
            header('HTTP/1.0 401 Unauthorized');
            echo 'Authentification needed';
            die();
        } else {          
            require_once('dbConnect.php');
            $sql = "SELECT PW_SALTED_HASHED FROM USER WHERE NAME = ? AND REALM = ?";
            $statement = $connection->prepare($sql);
            $statement->bind_param('ss', $_SERVER['PHP_AUTH_USER'], $realm);
            $statement->execute();
            $result = $statement->get_result();
            
            if($result->num_rows > 0) {
                $result->data_seek(0);
                $resultRow = $result->fetch_assoc();
                if (password_verify($_SERVER['PHP_AUTH_PW'], $resultRow['PW_SALTED_HASHED'])) {
                    return TRUE;
                } 
            } 
        }

        header('WWW-Authenticate: Basic realm="' . $realm . '"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Authentification failed for this endpoint';
        return FALSE;
    }
?>