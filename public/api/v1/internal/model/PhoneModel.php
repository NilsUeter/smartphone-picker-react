<?php
    class PhoneModel implements JsonSerializable {
        private $id;
        private $storage;
        private $memory;
        private $types;

        // Constructor
        public function __construct($objectData) {
            $this->id = $objectData['MODEL_ID'];
            $this->storage = $objectData['STORAGE'];
            $this->memory = $objectData['MEMORY'];

            $this->types = array();
        }

        public static function withType($objectData, $type) {
            $instance = new self($objectData);
            $instance->addType($type);
            return $instance;
        }

        public function addType($type) {
            $this->types[] = $type;
        }

        public function getId() {
            return $this->id;
        }

        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>