<?php
    function validateLogin($userName, $pwHash) {
        require_once('dbConnect.php');
        $sql = "SELECT PW_SALTED_HASHED FROM USER WHERE NAME = ?";
        $statement = $connection->prepare($sql);
        $statement->bind_param('s', $userName);
        $statement->execute();
        $result = $statement->get_result();
        
        if($result->num_rows > 0) {
            $result->data_seek(0);
            $resultRow = $result->fetch_assoc();
            if (password_verify($pwHash, $resultRow['PW_SALTED_HASHED'])) {
                return TRUE;
            } 
        } 

        return FALSE;
    }
?>