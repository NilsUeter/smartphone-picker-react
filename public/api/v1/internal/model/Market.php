<?php
    class Market {
        public $id;
        public $endpoint;
        public $associate_tag;

        // Constructor
        public function __construct($db_row) {
            $this->id = $db_row['ID'];
            $this->endpoint = $db_row['ENDPOINT'];
            $this->associate_tag = $db_row['ASSOCIATE_TAG'];
        }
    }
?>