<?php

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

            $sql_cod_veri = "SELECT * FROM recepcion WHERE documento = '$documento'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Ya existe una recepcion con este codigo de documento',
                );
            }
            else
            {
                $sql = "INSERT INTO recepcion (fecha_de_documento, fecha_de_llegada, documento, observacion, id_usuario) 
                VALUES ('$fecha_de_documento', '$fecha_de_llegada', '$documento', '$observacion', '$id_usuario')";
                $resultado = mysqli_query($conexion, $sql);
                if(!$resultado)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al cargar los datos, consultar con soporte',
                    );
                }
                else
                {
                    $sql = "SELECT id FROM recepcion";
                    $resultado = mysqli_query($conexion, $sql);
                    while($filas = mysqli_fetch_array($resultado))
                    {
                        $id_recepcion = $filas['id'];
                    }
                    $json[] = array(
                        'error' => '0',
                        'id_recepcion' => $id_recepcion,
                        'mensaje' => 'Recepcion creada'
                    );
                }
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>