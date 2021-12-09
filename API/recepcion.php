<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    require 'conexion.php';

    // recepcion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $fecha_de_documento = $datos->fecha_doc;
            $fecha_de_llegada = $datos->fecha_llegada;
            $documento = $datos->num_doc;
            $observacion = $datos->observacion;
            $id_usuario = $datos->id_user;

            $sql = "INSERT INTO recepcion (fecha_de_documento, fecha_de_llegada, documento, observacion, id_usuario) 
            VALUES ('$fecha_de_documento', '$fecha_de_llegada', '$documento', '$observacion', '$id_usuario')";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Error al cargar los datos, consultar con soporte',
                );
            }
            else
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Recepcion creada'
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>