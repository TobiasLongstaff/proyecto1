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

            $sql_cod_veri = "SELECT id FROM recepcion WHERE id = '$id_recepcion'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_update="UPDATE recepcion SET cargado = '1' WHERE id = '$id_recepcion'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                if(!$resultado_update)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al cargar el pallet',
                    );
                }
                else
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Recepcion Cerrada',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error esta recepcion no existe',
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>