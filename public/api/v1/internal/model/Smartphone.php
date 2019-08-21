<?php
    class Smartphone implements JsonSerializable {
        private $id;
        private $name;
        private $brand;
        private $released;
        private $imageLink;
        private $design;
        private $display;
        private $length;
        private $width;
        private $cpu;
        private $updates;
        private $camera;
        private $battery;
        private $batterysize;
        private $sdSlot;
        private $simCards;
        private $notch;
        private $waterproof;
        private $headphoneJack;
        private $models;

        // Constructor
        function __construct($objectData) {
            $this->id = $objectData['ID'];
            $this->name = $objectData['NAME'];
            $this->brand = $objectData['BRAND'];
            $this->released = $objectData['RELEASED'];
            $this->imageLink = $objectData['IMAGE_LINK'];
            $this->design = $objectData['DESIGN'];
            $this->display = $objectData['DISPLAY'];
            $this->length = $objectData['LENGTH'];
            $this->width = $objectData['WIDTH'];
            $this->cpu = $objectData['CPU'];
            $this->updates = $objectData['UPDATES'];
            $this->camera = $objectData['CAMERA'];
            $this->battery = $objectData['BATTERY'];
            $this->batterysize = $objectData['BATTERYSIZE'];
            $this->sdSlot = $objectData['SD_SLOT'];
            $this->simCards = $objectData['SIM_CARDS'];
            $this->notch = $objectData['NOTCH'];
            $this->waterproof = $objectData['WATERPROOF'];
            $this->headphoneJack = $objectData['HEADPHONE_JACK'];

            $this->models = array();
        }

        public static function withModel($objectData, $model) {
            $instance = new self($objectData);
            $instance->addModel($model);
            return $instance;
        }

        public function addModel($model) {
            $this->models[] = $model;
        }

        public function getID() {
            return $this->id;
        }

        public function getModels() {
            return $this->models;
        }

        public function jsonSerialize() {
            return get_object_vars($this);
        }
    }
?>