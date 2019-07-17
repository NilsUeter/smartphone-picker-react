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
    require_once('internal/Authorizer.php');
    require_once('internal/DbConnect.php');
    if(checkValidAuthentication($pdo, "AUTH")) {
        //Retrieve user data from request
        $userInput = json_decode(file_get_contents('php://input'), true);
        //Check if user is already existing
        $sql = "SELECT * FROM USER WHERE NAME = ?";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(1, $userInput['username']);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        //PDO::FETCH_ASSOC gibt die nächste row als Arrays zurück oder FALSE bei Fehlschlag   
        if(is_array($result)) {
            header('HTTP/1.1 400 Bad Request');
            $user = array('username' => $userInput['username'], 'realm' => $userInput['realm'], 'status' => 'Creation unsuccessful, already existing');
            //Return user object with successfull status
            echo json_encode($user);
            die();
        }

        /*  
        Verschlüsselt den String mit einem starken Einwegalgorythmus und den oben definierten Options.
        PASSWORD_DEFAULT verweist auf den stärksten Algo in der einegsetzten PHP Version
        20190716 ist dies BCRYPT
        Dieses kann sich in der Zukunft ändern, ist jedoch kein Problem, da algo und die Options im Hash mit gespeichert werden,
        sodass password_verify() auch mit älteren oder Hashes unterschiedlicher algos umgehen kann
        */
        $options = [
            //TODO finalen Cost Wert definieren
            'cost' => 10,
        ];
        $pwHash = password_hash($userInput['password'], PASSWORD_DEFAULT, $options);
        //Persist user
        $sql = "INSERT INTO USER (NAME, PW_SALTED_HASHED, REALM) VALUES (?, ?, ?)";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(1, $userInput['username']);
        $statement->bindValue(2, $pwHash);
        $statement->bindValue(3, $userInput['realm']);
        $statement->execute();
        //Return user object with successfull status
        $user = array('username' => $userInput['username'], 'realm' => $userInput['realm'], 'status' => 'Created successfully');
        header('HTTP/1.1 201 Created');
        echo json_encode($user);
    }
?>