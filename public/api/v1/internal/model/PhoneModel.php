<?php
    class PhoneModel implements JsonSerializable {
        private $id;
        private $storage;
        private $memory;
        private $types;

        // Constructor
        public function __construct($objectData) {
            $this->id = $objectData['ID'];
            $this->storage = $objectData['STORAGE'];
            $this->memory = $objectData['MEMORY'];
        }

        public function setTypes($types) {
            $this->types = $types;
        }

        public function getId() {
            return $this->id;
        }

        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>