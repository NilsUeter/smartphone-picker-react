<?php
    require_once('internal/Logger.php');
    $logger = new Logger("Auth");
    // Check the HTTP method of the request
    header('Access-Control-Allow-Methods: POST');
    // Check the HTTP method of the request
    if($_SERVER['REQUEST_METHOD'] !== 'POST') {
        $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' rejected');
        $logger->logToFile('405 Method not allowed Error');
        header('HTTP/1.1 405 Method not allowed Error');
        header('Content-Type: application/json');
        $status = array('status' => 'Request rejected');
        echo json_encode($status);
        die;
    }
    
    // Check Authentification
    require_once('internal/Authorizer.php');
    if(!hasValidAuthentication("AUTH")) {
        $logger->logToFile('Failed to authorize, request cancelled');
        header('WWW-Authenticate: Basic realm="AUTH"');
        header('HTTP/1.0 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'Request blocked, authentification failed'));
        die;
    }

    $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' accepted');
    $logger->logToFile('Useragent: '.$_SERVER['HTTP_USER_AGENT']);
    //Retrieve user data from request
    //TODO Input validation
    $userInput = json_decode(file_get_contents('php://input'), true);
    //Check if user is already existing
    $sql = "SELECT * FROM USER WHERE NAME = ?";
    require_once('internal/MySQLDBConnection.php');
    $statement = DbConnect::$pdo->prepare($sql);
    $statement->bindValue(1, $userInput['username']);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    //PDO::FETCH_ASSOC gibt die nächste row als Arrays zurück oder FALSE bei Fehlschlag   
    if(is_array($result)) {
        $logger->logToFile('Request rejected, user data already existing');
        header('HTTP/1.1 400 Bad Request');
        header('Content-Type: application/json');
        $user = array('username' => $userInput['username'], 'realm' => $userInput['realm'], 'status' => 'Creation unsuccessful, already existing');
        //Return user object with successfull status
        echo json_encode($user);
        die;
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
    $statement = DbConnect::$pdo->prepare($sql);
    $statement->bindValue(1, $userInput['username']);
    $statement->bindValue(2, $pwHash);
    $statement->bindValue(3, $userInput['realm']);
    $statement->execute();
    //Return user object with successfull status
    $logger->logToFile('User created, request ended successfully');
    header('HTTP/1.1 201 Created');
    header('Content-Type: application/json');
    $user = array('username' => $userInput['username'], 'realm' => $userInput['realm'], 'status' => 'Created successfully');
    echo json_encode($user);
?>