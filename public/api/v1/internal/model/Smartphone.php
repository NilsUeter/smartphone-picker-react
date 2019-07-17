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
            $this->id = (int)$db_row['ID'];
            $this->name = $db_row['NAME'];
            $this->brand = $db_row['BRAND'];
            $this->released = $db_row['RELEASED'];
            $this->design = (int)$db_row['DESIGN'];
            $this->display = (float)$db_row['DISPLAY'];
            $this->length = (int)$db_row['LENGTH'];
            $this->width = (int)$db_row['WIDTH'];
            $this->cpu = (int)$db_row['CPU'];
            $this->updates = (int)$db_row['UPDATES'];
            $this->camera = (int)$db_row['CAMERA'];
            $this->battery = (int)$db_row['BATTERY'];
            $this->batterysize = (int)$db_row['BATTERYSIZE'];
            $this->storage = (int)$db_row['STORAGE'];
            $this->memory = (int)$db_row['MEMORY'];
            $this->sdSlot = (int)$db_row['SD_SLOT'];
            $this->simCards = (int)$db_row['SIM_CARDS'];
            $this->notch = (int)$db_row['NOTCH'];
            $this->waterproof = (int)$db_row['WATERPROOF'];
            $this->headphoneJack = (int)$db_row['HEADPHONE_JACK'];
            $this->imageLink = $db_row['IMAGE_LINK'];

            $this->models = $phoneModels;
        }
    }
?>