<?php
    //headers
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json');
    // Check the HTTP method of the request
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('HTTP/1.1 405 Method not allowed Error');
        die();
    }
    // Check Authentification
    require_once('internal/authorizer.php');
    if(checkValidAuthentication("AUTH")) {
        //Retrieve password from request, generate hash and return
        $pwInput = json_decode(file_get_contents('php://input'), true);
        $options = [
            //TODO finalen Cost Wert definieren
            'cost' => 10,
        ];
        /*  
        Verschlüsselt den String mit einem starken Einwegalgorythmus und den oben definierten Options.
        PASSWORD_DEFAULT verweist auf den stärksten Algo in der einegsetzten PHP Version
        20190716 ist dies BCRYPT
        Dieses kann sich in der Zukunft ändern, ist jedoch kein Problem, da algo und die Options im Hash mit gespeoichert werden,
        sodass password_verify() auch mit älteren oder Hashes unterschiedlicher algos umgehen kann
        */
        //echo (json_encode(password_hash($pwInput['password'], PASSWORD_DEFAULT, $options)));
        $pwHash = array('passwordHashed' => password_hash($pwInput['password'], PASSWORD_DEFAULT, $options));
        echo json_encode($pwHash);
        //print_r();
    }
?>