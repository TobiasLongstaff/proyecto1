<?php

    require 'conexion.php';

    // cargar cajas
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_pallet = $datos->cod_pallet;

            $sql_cod_veri = "SELECT id FROM pallets WHERE codigo = '$codigo_pallet'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql = "SELECT * FROM pallets WHERE codigo = '$codigo_pallet' AND cargado = '0'";
                $resultado = mysqli_query($conexion, $sql);
                $numero_fila = mysqli_num_rows($resultado);
                if($numero_fila == '1')
                {
                    $filas = mysqli_fetch_array($resultado);
                    $json[] = array(
                        'error' => '0',
                        'id_pallet' => $filas['id'],
                        'mensaje' => 'Pallet escaneado',
                        'cantidades' => $filas['cantidad']
                    );
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Este pallet ya se encuentra cargado',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El codigo de pallet es incorrecto no existe un pallet con ese codigo',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>