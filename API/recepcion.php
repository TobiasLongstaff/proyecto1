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

            $sql_cod_veri = "SELECT documento FROM recepcion WHERE documento = '$documento'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_cod_car = "SELECT documento, cantidad FROM recepcion WHERE documento = '$documento' AND cargado = '0'";
                $resultado_cod_car = mysqli_query($conexion, $sql_cod_car);
                $numero_fila_cod_car = mysqli_num_rows($resultado_cod_car);
                if($numero_fila_cod_car== '1')
                {
                    $filas = mysqli_fetch_array($resultado_cod_car);
                    $id_recepcion = $filas['documento'];
                    $cantidad_pallets = $filas['cantidad'];
    
                    $sql_update="UPDATE recepcion SET fecha_de_documento = '$fecha_de_documento', 
                    fecha_de_llegada = '$fecha_de_llegada', observacion = '$observacion', id_usuario = '$id_usuario' 
                    WHERE documento = '$documento' AND cargado = '0'";
                    $resultado_update = mysqli_query($conexion, $sql_update);
                    if(!$resultado_update)
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Error consultar con soporte',
                        );
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '0',
                            'id_recepcion' => $id_recepcion,
                            'cantidad_pallets' => $cantidad_pallets,
                            'mensaje' => 'Recepcion creada'
                        );
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Ya fue cargada esta recepcion',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'No se encontró el número de documento',
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    mysqli_close($conexion);
?>