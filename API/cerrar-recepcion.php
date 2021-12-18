<?php

    require 'conexion.php';

    // cerrar-recepcion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            date_default_timezone_set('America/Buenos_Aires');
            $fecha_actual = date('Y-m-d');

            $id_recepcion = $datos->id_recepcion;

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>