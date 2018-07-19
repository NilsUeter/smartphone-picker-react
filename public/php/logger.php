<<?php
  function logToFile($file_prefix, $message) {
    $date_time = date("d.m.Y H:i:s");
    $logfile = "logs/" . $file_prefix . date("d.m.Y_H") . " Uhr.txt";
    $message = array($date_time, $message);
    $line = implode(" ", $message);

    if (!file_exists("logs/") && !is_dir("logs/")) {
        mkdir("logs/");
    }

    $file = fopen($logfile, "a");
    fputs($file, $line . PHP_EOL);
    fclose($file);
  }
?>
