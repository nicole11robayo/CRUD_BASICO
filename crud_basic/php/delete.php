<?php
include 'config.php';

if (isset ($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "DELETE FROM usuarios WHERE id='$id'";

    if($conn->query($sql) === TRUE){
        echo "Registro eliminado";
    }else{
        echo "Error: " . $conn->error;
    }
}
?>