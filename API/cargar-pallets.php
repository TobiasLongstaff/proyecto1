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

            $sql_update="UPDATE pallets SET cargado = '1' WHERE codigo = '$codigo_pallet' AND cargado = '0'";
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
                $json[] = array(                  
                    'error' => '0',
                    'mensaje' => 'Cajas cargadas correctamente'
                );
            }
        }

    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>