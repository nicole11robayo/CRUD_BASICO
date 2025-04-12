<?php
include 'config.php';

if(isset($_POST['nombre']) && isset($_POST['email'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];

    $sql = "INSERT INTO usuarios (nombre,email) VALUES ('$nombre', '$email')";

    if ($conn->query($sql) === TRUE){
        echo "Nuevo registro creado correctamente";
    }else {
        echo "Error: " . $conn->error;
    }
}
?>