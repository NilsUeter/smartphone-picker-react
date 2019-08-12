<?php
    ini_set("log_errors", 1);
    ini_set("error_log", "../logs/php-error.log");

    class Logger {
        private $logPath;
        private $fileName;

        function __construct($fileName) {
            //Place logs under the current version of the API
            $this->logPath = __DIR__ . "/../logs/";
            $this->fileName = $fileName;
            if (!file_exists($this->logPath) && !is_dir($this->logPath)) {
                mkdir($this->logPath);
            }
        }

        function logToFile($message) {
            $date_time = date("d.m.Y H:i:s");
            $logfile = $this->logPath . date("Ymd") . "_" . $this->fileName . ".txt";
            $message = array($date_time, $message);
            $line = implode(" ", $message);
            $file = fopen($logfile, "a");
            fputs($file, $line . PHP_EOL);
            fclose($file);
        }
    }
?>