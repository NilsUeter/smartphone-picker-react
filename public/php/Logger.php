<?php
  ignore_user_abort(true);
  set_time_limit(0);

  ini_set("log_errors", 1);
  ini_set("error_log", "../logs/php-error.log");

  function logToFile($logfile_name, $message) {
    $date_time = date("d.m.Y H:i:s");
    $logfile = "../logs/" . date("Ymd") . "_" . $logfile_name . ".txt";
    $message = array($date_time, $message);
    $line = implode(" ", $message);

    if (!file_exists("../logs/") && !is_dir("../logs/")) {
        mkdir("../logs/");
    }

    $file = fopen($logfile, "a");
    fputs($file, $line . PHP_EOL);
    fclose($file);
  }
?>