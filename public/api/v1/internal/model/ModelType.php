<?php
    class ModelType implements JsonSerializable {
        private $vendor;
        private $name;
        private $itemId;
        private $link;
        private $lastUpdated;
        private $price;

        // Constructor
        public function __construct($objectData) {
            $this->vendor = $objectData['VENDOR'];
            $this->name = $objectData['TYPE_NAME'];
            $this->itemId = $objectData['ITEM_ID'];
            $this->link = $objectData['LINK'];
            $this->lastUpdated = $objectData['LAST_UPDATED'];
            $this->price = $objectData['PRICE'];
        }

        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>