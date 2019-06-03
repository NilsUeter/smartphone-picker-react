<?php
    class Smartphone {
        public $id;
        public $name;
        public $brand;
        public $released;
        public $design;
        public $display;
        public $length;
        public $width;
        public $cpu;
        public $updates;
        public $camera;
        public $battery;
        public $batterysize;
        public $storage;
        public $memory;
        public $sdSlot;
        public $simCards;
        public $notch;
        public $waterproof;
        public $headphoneJack;
        public $imageLink;
        public $models;

        // Constructor
        public function __construct($db_row, $phoneModels) {
            $this->id = $db_row['ID'];
            $this->name = $db_row['NAME'];
            $this->brand = $db_row['BRAND'];
            $this->released = $db_row['RELEASED'];
            $this->design = $db_row['DESIGN'];
            $this->display = $db_row['DISPLAY'];
            $this->length = $db_row['LENGTH'];
            $this->width = $db_row['WIDTH'];
            $this->cpu = $db_row['CPU'];
            $this->updates = $db_row['UPDATES'];
            $this->camera = $db_row['CAMERA'];
            $this->battery = $db_row['BATTERY'];
            $this->batterysize = $db_row['BATTERYSIZE'];
            $this->storage = $db_row['STORAGE'];
            $this->memory = $db_row['MEMORY'];
            $this->sdSlot = $db_row['SD_SLOT'];
            $this->simCards = $db_row['SIM_CARDS'];
            $this->notch = $db_row['NOTCH'];
            $this->waterproof = $db_row['WATERPROOF'];
            $this->headphoneJack = $db_row['HEADPHONE_JACK'];
            $this->imageLink = $db_row['IMAGE_LINK'];

            $this->models = $phoneModels;
        }
    }
?>