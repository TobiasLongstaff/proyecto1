<?php

    require 'conexion.php';

    // cargar cajas
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_caja = $datos->cod_caja;
            $id_recepcion = $datos->id_recepcion;

            $sql_cod_veri = "SELECT * FROM cajas WHERE codigo = '$codigo_caja'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql = "SELECT * FROM cajas WHERE codigo = '$codigo_caja' AND activa = '0'";
                $resultado = mysqli_query($conexion, $sql);
                $numero_fila = mysqli_num_rows($resultado);
                if($numero_fila == '1')
                {
                    $sql_update="UPDATE cajas SET activa = '1', id_recepcion = '$id_recepcion' WHERE codigo = '$codigo_caja' AND activa = '0'";
                    $resultado_update = mysqli_query($conexion, $sql_update);
                    if(!$resultado_update)
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Error al abrir la caja',
                        );
                    }
                    else
                    {
                        $filas = mysqli_fetch_array($resultado);
                        $json[] = array(
                            'error' => '0',
                            'id_caja' => $filas['id'],
                            'mensaje' => 'Caja abierta',
                            'descripcion' => $filas['descripcion'],
                            'kilos' => $filas['kilos'],
                            'vencimiento' => $filas['vencimiento'],
                            'cantidades' => $filas['cantidades']
                        );
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Esta caja ya se encuentra abierta',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El codigo de caja es incorrecto no existe una caja con ese codigo',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>