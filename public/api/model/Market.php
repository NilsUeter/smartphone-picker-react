<?php
    class Market {
        public $id;
        public $endpoint;
        public $associate_tag;

        // Constructor
        public function __construct($id, $endpoint, $associate_tag) {
            $this->id = $id;
            $this->endpoint = $endpoint;
            $this->associate_tag = $associate_tag;
        }
    }
?>