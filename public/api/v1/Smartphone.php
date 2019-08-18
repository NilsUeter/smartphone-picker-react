<?php
    // Check the HTTP method of the request
    header('Access-Control-Allow-Methods: GET');
    if($_SERVER['REQUEST_METHOD'] !== 'GET') {
        header('HTTP/1.1 405 Method not allowed Error');
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'Request rejected'));
        die;
    }

    //Retrieve Smartphone data, generate json and return
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/MySQLDBConnection.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/dao/SmartphoneDAO.php');
    $smartphoneDAO = new SmartphoneDAO(MySQLDBConnection::$pdo);
    $smartphones = $smartphoneDAO->getAll();
    header('HTTP/1.1 200 OK');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode($smartphones);
?>