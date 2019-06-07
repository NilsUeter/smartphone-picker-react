<?php
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header('WWW-Authenticate: Basic realm="updateAmazonPrices"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Authentification needed';
        die();
    } else {
        require_once('../internal/authorizer.php');
        if(!validateLogin($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'])) {
            header('WWW-Authenticate: Basic realm="updateAmazonPrices"');
            header('HTTP/1.0 401 Unauthorized');
            echo 'Authentification failed';
        die();
        } else {
            echo "Successfully authorzied";
        }
    }
?>