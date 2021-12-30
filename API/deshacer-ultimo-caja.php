<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_caja = $datos->formCodigo;

            if(!empty($codigo_caja))
            {
                $sql_update="UPDATE cajas SET cargado = '0' WHERE codigo = '$codigo_caja'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                if(!$resultado_update)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al deshacer la caja '.$codigo_caja,
                    );
                }
                else
                {
                    $sql="SELECT id, cantidad FROM pallets WHERE id IN (SELECT id_pallet FROM cajas WHERE codigo = '$codigo_caja')";
                    $resultado=mysqli_query($conexion,$sql);
                    if($filas = mysqli_fetch_array($resultado))
                    {
                        $id_pallet = $filas['id'];
                        $cantidad_pallets = $filas['cantidad'];
                    }

                    $sql="SELECT COUNT(id) AS cantidad_cargados FROM cajas WHERE id_pallet = '$id_pallet' AND cargado != '0'";
                    $resultado=mysqli_query($conexion,$sql);
                    if($filas = mysqli_fetch_array($resultado))
                    {
                        $cantidad_cargados = $filas['cantidad_cargados'];
                    }

                    if($cantidad_cargados != $cantidad_pallets)
                    {
                        $sql_update="UPDATE pallets SET cargado = '0' WHERE id = '$id_pallet'";
                        $resultado_update = mysqli_query($conexion, $sql_update);
                        if(!$resultado_update)
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error al cargar la caja',
                            );
                        }
                    }

                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'La última caja ya no se encuentran cargada',
                    );
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