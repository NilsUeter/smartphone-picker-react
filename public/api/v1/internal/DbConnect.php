<?php
    static $pdo;

    function connect() {
        if(!isset($pdo)) {
            // Load configuration as an array
            $config = parse_ini_file('config.ini');
            $db_server = $config['servername'];
            $db_name = $config['dbname'];
            $dsn = "mysql:host=$db_server;dbname=$db_name;charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            try {
                return new PDO($dsn, $config['username'], $config['password'], $options);
            } catch (\PDOException $e) {
                print "Error!: " . $e->getMessage() . "<br/>";
                die();
            }
        }
    }
    $pdo = connect();
?>