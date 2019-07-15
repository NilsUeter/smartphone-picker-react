<?php
    function db_connect() {
        // Define connection as a static variable, to avoid connecting more than once 
        static $connection;

        // Try and connect to the database, if a connection has not been established yet
        if(!isset($connection)) {
            // Load configuration as an array
            $config = parse_ini_file('config.ini'); 
            $connection = mysqli_connect($config['servername'],$config['username'],$config['password'],$config['dbname']);
        }

        // If connection was not successful, handle the error
        if($connection === false) {
            // Handle error - notify administrator, log to a file, show an error screen, etc.
            return mysqli_connect_error(); 
        }
        return $connection;
    }

    // Connect to the database
    $connection = db_connect();

    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
?>