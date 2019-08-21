<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/Smartphone.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/PhoneModel.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/ModelType.php');
    class SmartphoneDAO {
        private $pdo;

        function __construct($pdo) {
            $this->pdo = $pdo;
        }

        function getAllDetailed() {
            $smartphoneDbRows = $this->pdo->query("SELECT * FROM SMARTPHONE_DETAILED");
            $smartphones = array();
            while($smartphoneDbRow = $smartphoneDbRows->fetch()) {
                //Wenn erstes Element oder nicht gleiches Smartphone wie in der DB row davor neues Phone+Model+Type einfügen
                if(empty($smartphones) || end($smartphones)->getId() != $smartphoneDbRow['ID']) {
                    $smartphones[] = Smartphone::withModel(array_slice($smartphoneDbRow, 9), 
                                        PhoneModel::withType(array_slice($smartphoneDbRow, 6, 3), 
                                        new ModelType(array_slice($smartphoneDbRow, 0, 6))));
                    continue;
                }
                /*Ist gleiche Smartphone ID wie in der DB row davor
                Wenn gleiches Model, dann nur neuen Typ ans Model, sonst neues Model + Typ ans Phone*/
                if(end(end($smartphones)->getModels())->getId() == $smartphoneDbRow['MODEL_ID']) {
                    end(end($smartphones)->getModels())->addType(new ModelType(array_slice($smartphoneDbRow, 0, 6)));
                } else {
                    end($smartphones)->addModel(PhoneModel::withType(array_slice($smartphoneDbRow, 6, 3), 
                                                new ModelType(array_slice($smartphoneDbRow, 0, 6))));
                }
            }
            return $smartphones;
        }
    }
?>