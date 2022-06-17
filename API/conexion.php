<?php
    header("Access-Control-Allow-Origin: *");
    
    // header("Access-Control-Allow-Origin: https://parcelpicker.com.ar");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    header("Content-Type: application/json; charset=utf-8");
    // $conexion = mysqli_connect('localhost', 'tobias_admin', 'UKsaixo7Fkcx', 'tobias_Iflow');
    // if (mysqli_connect_errno())
    // {
    //     $_SESSION['message-error'] = 'Error al conectar la base de datos';
    //     exit();
    // }
    // mysqli_select_db($conexion, 'tobias_Iflow') or die ($_SESSION['message-error'] = 'Error al conectar');
    // mysqli_set_charset($conexion, 'utf8');

    $conexion = mysqli_connect('localhost', 'root', '', 'tobias_pampa');
    if (mysqli_connect_errno())
    {
        $_SESSION['message-error'] = 'Error al conectar la base de datos';
        exit();
    }
    mysqli_select_db($conexion, 'tobias_pampa') or die ($_SESSION['message-error'] = 'Error al conectar');
    mysqli_set_charset($conexion, 'utf8');
?>