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
  echo "br>Starting to zip Logs of last Week<br>";

  //Create archive directory if not existing
  if (!file_exists('logs/archive')) {
    mkdir('logs/archive');
  }

  //Create a new zip file
  $zip = new ZipArchive();
  $filename = "logs/archive/" . date("Y") . "_week_" . (intval(date("W"))-1) . "_logs.zip";
  $zip->open($filename, ZipArchive::CREATE);

  $date_current = new DateTime();
  $date_current->setTimestamp(mktime(0,0,0));
  logToFile("LogZipper", "Current date start time " . $date_current->format('d.m.Y H:i:s'));
  echo "<br>Current date start time" . $date_current->format('d.m.Y H:i:s') . "<br>";
  logToFile("LogZipper", "Current date timestamp " . $date_current->getTimestamp());
  echo "Current date timestamp " . $date_current->getTimestamp() . "<br>";

  $date_before = new DateTime();
  $date_before->setTimestamp(mktime(0,0,0));
  $date_before->modify('-7 day');
  logToFile("LogZipper", "Startdate start time of last week: " . $date_before->format('d.m.Y H:i:s'));
  echo "<br>Startdate start time of last week: " . $date_before->format('d.m.Y H:i:s') . "<br>";
  logToFile("LogZipper", "Startdate timestamp: " . $date_before->getTimestamp());
  echo "Startdate timestamp: " . $date_before->getTimestamp() . "<br>";

  $fileSizeSum = 0;

  $dir = new DirectoryIterator('logs');
  $logfiles = [];
  foreach ($dir as $fileinfo) {
    if (!$fileinfo->isDot() AND !$fileinfo->isDir() AND $fileinfo->getMTime() >= $date_before->getTimestamp() AND $fileinfo->getMTime() < $date_current->getTimestamp()) {
        $zip->addFile($fileinfo->getPathName(), $fileinfo->getFileName());
        $fileSizeSum = $fileSizeSum + filesize($fileinfo->getPathName());
        //Solange die zip nocht nicht geclosed wurde sind die Dateien die in die zip sollen gelocked
        //und müssen daher nachträglich gelöscht werden und dafür zwischengespeichert werden
        $logfiles[] = $fileinfo->getFileName();
    }
  }

  logToFile("LogZipper", "Number of logfiles: " . $zip->numFiles);
  echo "<br>Number of logfiles: " . $zip->numFiles . "<br>";
  logToFile("LogZipper", "File size Sum: " . humanFilesize($fileSizeSum));
  echo "<br>File size Sum: " . humanFilesize($fileSizeSum) . "<br>";
  logToFile("LogZipper", "Status of the new zip file:" . $zip->status);
  echo "Status of the new zip file:" . $zip->status . "<br>";

  $ret = $zip->close();
  logToFile("LogZipper", "Closed zipfile with result: " . ($ret ? "true" : "false"));
  echo "Closed zipfile with result: " . ($ret ? "true" : "false") . "<br>";
  logToFile("LogZipper", "Zip filesize: " . humanFilesize(filesize($filename)));
  echo "<br>Zip filesize: " . humanFilesize(filesize($filename)) . "<br>";

  logToFile("LogZipper", "Logfiles");
  echo "<br>Logfiles<br>";
  asort($logfiles);
  foreach ($logfiles as $i => $logfile) {
    logToFile("LogZipper", $logfile);
    echo $logfile . "<br>";
    unlink('logs/' . $logfile);
  }

  logToFile("LogZipper", "Deleted original log files after saving them in the archive zip");
  echo "<br>Deleted original log files after saving them in the archive zip<br>";

  //Take bytes as Input and return human readable sizes
  function humanFilesize($bytes, $decimals = 2) {
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
  }
 ?>