<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_pallet = $datos->formCodigo;

            if(!empty($codigo_pallet))
            {
                $sql_update="UPDATE pallets SET cargado = '0' WHERE codigo = '$codigo_pallet'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                if(!$resultado_update)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al deshacer el pallet '.$codigo_pallet,
                    );
                }
                else
                {
                    $sql_update="UPDATE cajas SET cargado = '0' WHERE id_pallet IN (SELECT id FROM pallets WHERE codigo = '$codigo_pallet')";
                    $resultado_update = mysqli_query($conexion, $sql_update);
                    if(!$resultado_update)
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Error al deshacer el pallet '.$codigo_pallet,
                        );
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '0',
                            'mensaje' => 'El último pallet y sus cajas ya no se encuentran cargados',
                        );
                    }
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'No se cargó ningún pallet previamente'
                );
            }
        }
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>