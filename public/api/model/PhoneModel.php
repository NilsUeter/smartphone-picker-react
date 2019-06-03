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
        public function __construct($smartphoneID, $marketID, $asin, $name, $price, $link, $lastUpdated) {
            $this->smartphoneID = $smartphoneID;
            $this->marketID = $marketID;
            $this->asin = $asin;
            $this->name = $name;
            $this->price = $price;
            $this->link = $link;
            $this->lastUpdated = $lastUpdated;
        }
    }
?>