<?php
  // Wöchentlich per Cronjob aufrufen
  // Alle Dateien im /logs Verzeichnis durchgehen und prüfen, ob das letzte Änderungsdatum länger als 1 Woche her ist
  // identifizierte Datein unter /archive zippen und Orginal löschen

  if($_SERVER['QUERY_STRING'] != "EXECUTE"){
    echo "Nothing to see here <br>";
    exit();
  }

  ignore_user_abort(true);
  set_time_limit(100);

  require_once "Logger.php";

  logToFile("LogZipper", "Starting to zip Logs of last Week");

  //Create archive directory if not existing
  if (!file_exists('../logs/archive')) {
    mkdir('../logs/archive');
  }

  //Create a new zip file
  $zip = new ZipArchive();
  $filename = "../logs/archive/" . date("Y") . "_week_" . (intval(date("W"))-1) . "_logs.zip";
  $zip->open($filename, ZipArchive::CREATE);

  $date_current = new DateTime();
  $date_current->setTimestamp(mktime(0,0,0));
  logToFile("LogZipper", "Current date start time " . $date_current->format('d.m.Y H:i:s'));
  logToFile("LogZipper", "Current date timestamp " . $date_current->getTimestamp());

  $date_before = new DateTime();
  $date_before->setTimestamp(mktime(0,0,0));
  $date_before->modify('-7 day');
  logToFile("LogZipper", "Startdate start time of last week: " . $date_before->format('d.m.Y H:i:s'));
  logToFile("LogZipper", "Startdate timestamp: " . $date_before->getTimestamp());

  $fileSizeSum = 0;

  $dir = new DirectoryIterator('../logs');
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

  logToFile("LogZipper", "Number of logfiles: " . $zip->numFiles);
  logToFile("LogZipper", "File size Sum: " . humanFilesize($fileSizeSum));
  logToFile("LogZipper", "Status of the new zip file:" . $zip->status);

  $ret = $zip->close();
  logToFile("LogZipper", "Closed zipfile with result: " . ($ret ? "true" : "false"));
  logToFile("LogZipper", "Zip filesize: " . humanFilesize(filesize($filename)));

  logToFile("LogZipper", "Logfiles");
  asort($logfiles);
  foreach ($logfiles as $i => $logfile) {
    logToFile("LogZipper", $logfile);
    unlink('../logs/' . $logfile);
  }

  logToFile("LogZipper", "Deleted original log files after saving them in the archive zip");
  echo "<br>Deleted original log files after saving them in the archive zip<br>";

  //Take bytes as Input and return human readable sizes
  function humanFilesize($bytes, $decimals = 2) {
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . " " . @$sz[$factor] . "B";
  }
 ?>