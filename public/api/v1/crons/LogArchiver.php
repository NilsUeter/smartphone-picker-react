<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/Logger.php');
    $logger = new Logger("CRON_LogArchiver");
    // Check the HTTP method of the request
    header('Access-Control-Allow-Methods: GET');
    if($_SERVER['REQUEST_METHOD'] !== 'GET') {
        $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' rejected');
        $logger->logToFile('405 Method not allowed Error');
        header('HTTP/1.1 405 Method not allowed Error');
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'Request rejected'));
        die;
    }

    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/Authorizer.php');
    if(!hasValidAuthentication("CRONS")) {
        $logger->logToFile('Failed to authorize, request cancelled');
        header('WWW-Authenticate: Basic realm="CRONS"');
        header('HTTP/1.1 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'Request blocked, authentification failed'));
        die;
    }

    ignore_user_abort(TRUE);
    set_time_limit(0);
    $logger->logToFile($_SERVER['REQUEST_METHOD'].' Request from '.$_SERVER['REMOTE_ADDR'].' accepted');
    $logger->logToFile('Useragent: '.$_SERVER['HTTP_USER_AGENT']);
    $logger->logToFile('Starting to zip Logs of last Week');

    //Create archive directory if not existing
    if (!file_exists($_SERVER['DOCUMENT_ROOT'] . 'v1/logs/archive')) {
        mkdir($_SERVER['DOCUMENT_ROOT'] . 'v1/logs/archive');
    }

    //Create a new zip file
    $zip = new ZipArchive();
    $filename = $_SERVER['DOCUMENT_ROOT'] . 'v1/logs/archive/' . date("Y") . '_week_' . (intval(date("W"))-1) . '_logs.zip';
    $zip->open($filename, ZipArchive::CREATE);

    $date_current = new DateTime();
    $date_current->setTimestamp(mktime(0,0,0));
    $date_before = new DateTime();
    $date_before->setTimestamp(mktime(0,0,0));
    $date_before->modify('-7 day');

    $fileSizeSum = 0;
    $dir = new DirectoryIterator($_SERVER['DOCUMENT_ROOT'] . 'v1/logs');
    $logfiles = [];
    foreach ($dir as $fileinfo) {
        //Dateien der letzten Woche oder größer als 20 Megabyte auswählen
        if (!$fileinfo->isDot() AND !$fileinfo->isDir() AND (($fileinfo->getMTime() >= $date_before->getTimestamp() AND $fileinfo->getMTime() < $date_current->getTimestamp()) OR $fileinfo->getSize() > 20000000)) {
            $zip->addFile($fileinfo->getPathName(), $fileinfo->getFileName());
            $fileSizeSum = $fileSizeSum + filesize($fileinfo->getPathName());
            //Solange die zip nocht nicht geclosed wurde sind die Dateien die in die zip sollen gelocked
            //und müssen daher nachträglich gelöscht werden und dafür zwischengespeichert werden
            $logfiles[] = $fileinfo->getFileName();
        }
    }

    $logger->logToFile('Number of logfiles: ' . $zip->numFiles);
    $logger->logToFile('File size Sum: ' . humanFilesize($fileSizeSum));
    $logger->logToFile('Status of the new zip file: ' . $zip->status);
    $ret = $zip->close();
    $logger->logToFile('Closed zipfile with result: ' . ($ret ? 'Success' : 'Failure'));
    $logger->logToFile('Zip filesize: ' . humanFilesize(filesize($filename)));
    $logger->logToFile('Logfiles');
    asort($logfiles);
    foreach ($logfiles as $i => $logfile) {
        $logger->logToFile($logfile);
        unlink($_SERVER['DOCUMENT_ROOT'] . 'v1/logs/' . $logfile);
    }
    $logger->logToFile('Deleted original log files after saving them in the archive zip');

    //Return successful status object
    $logger->logToFile('LogArchiver Request ended successfully');
    header('Content-Type: application/json');
    header('HTTP/1.1 200 OK');
    echo json_encode(array('status' => 'LogArchiver Request ended successfully'));

    //Take bytes as Input and return human readable sizes
    function humanFilesize($bytes, $decimals = 2) {
        $sz = 'BKMGTP';
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . " " . @$sz[$factor] . "B";
    }
?>