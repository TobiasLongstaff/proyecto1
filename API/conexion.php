<?php

    $conexion = mysqli_connect('localhost', 'root', '', 'proyecto1');
    if (mysqli_connect_errno())
    {
        $_SESSION['message-error'] = 'Error al conectar la base de datos';
        exit();
    }
    mysqli_select_db($conexion, 'proyecto1') or die ($_SESSION['message-error'] = 'Error al conectar');
    mysqli_set_charset($conexion, 'utf8');
?>