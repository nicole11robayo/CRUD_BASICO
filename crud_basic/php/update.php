<?php
include 'config.php';

if (isset ($_POST['id']) && isset($_POST['nombre']) && isset($_POST['email'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];

    $sql = "UPDATE usuarios
            SET nombre='$nombre', email='$email'
            WHERE id='$id'";

    if($conn->query($sql)){
        echo "Registro actualizado";
    }else{
        echo "Error: " . $conn->error;
    }
}

?>