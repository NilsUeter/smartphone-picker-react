<?php
    class PhoneModel {
        public $smartphoneID;
        public $marketID;
        public $asin;
        public $name;
        public $price;
        public $link;
        public $lastUpdated;

        // Constructor
        public function __construct($db_row) {
            $this->smartphoneID = (int)$db_row['SMARTPHONE_ID'];
            $this->marketID = $db_row['MARKET_ID'];
            $this->asin = $db_row['ASIN'];
            $this->name = $db_row['NAME'];
            $this->price = (int)$db_row['PRICE'];
            $this->link = $db_row['LINK'];
            $this->lastUpdated = strtotime($db_row['LAST_UPDATED']);
        }
    }
?>