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
            $cantidad_pallets = $datos->cant_pallets;

            $sql_cod_veri = "SELECT id, cantidad FROM recepcion WHERE id = '$id_recepcion'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql="SELECT COUNT(id) AS pallets_cargados FROM pallets WHERE id_recepcion = '$id_recepcion' AND cargado = '1'";
                $resultado=mysqli_query($conexion,$sql);
                $filas = mysqli_fetch_array($resultado);
                $pallets_cargados = $filas['pallets_cargados'];
                $pallets_faltantes = $cantidad_pallets - $pallets_cargados;
                if($pallets_faltantes > 0)
                {
                    $json[] = array(
                        'error' => '2',
                        'cantidad_faltante' => $pallets_faltantes,
                        'mensaje' => '¿Todavía tienes '.$pallets_faltantes.' pallets pendientes de esta recepción deseas cerrar la recepción igualmente?',
                    );
                }
                else
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Recepcion cargada correctamente',
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