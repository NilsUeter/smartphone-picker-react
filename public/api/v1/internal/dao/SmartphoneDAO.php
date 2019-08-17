<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/Smartphone.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/PhoneModel.php');
    require_once($_SERVER['DOCUMENT_ROOT'] . 'v1/internal/model/ModelType.php');
    class SmartphoneDAO {
        private $pdo;

        function __construct($pdo) {
            $this->pdo = $pdo;
        }

        function getAll() {
            $smartphoneDbRows = $this->pdo->query("SELECT * FROM SMARTPHONE")->fetchAll();
            $stmtModels = $this->pdo->prepare("SELECT * FROM PHONE_MODEL WHERE SMARTPHONE_ID = ?");
            $stmtTypes = $this->pdo->prepare("SELECT * FROM MODEL_TYPE_VW WHERE PHONE_MODEL_ID = ?");        
            $smartphones = array();
            foreach ($smartphoneDbRows as $smartphoneDbRow) {
                $smartphone = new Smartphone($smartphoneDbRow);
                $stmtModels->bindValue(1, $smartphone->getId());
                $stmtModels->execute();
                $models = array();
                foreach ($stmtModels->fetchAll() as $modelDbRow) {
                    $phoneModel = new PhoneModel($modelDbRow);
                    $stmtTypes->bindValue(1, $phoneModel->getId());
                    $stmtTypes->execute();
                    $types = array();
                    foreach ($stmtTypes->fetchAll() as $typeDbRow) {
                        $types[] = new ModelType($typeDbRow);
                    }
                    $phoneModel->setTypes($types);
                    $models[] = $phoneModel; 
                }
                $smartphone->setModels($models);
                $smartphones[] = $smartphone;
            }
            return $smartphones;
        }
    }
?>