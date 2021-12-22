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
            $codigo_pallet = $datos->cod_pallet;

            $sql_cod_veri = "SELECT id FROM cajas WHERE codigo = '$codigo_caja' AND cargado = '0'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_update="UPDATE cajas SET cargado = '1' WHERE codigo = '$codigo_caja' AND cargado = '0'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                if(!$resultado_update)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al cargar la caja',
                    );
                }
                else
                {
                    $sql="SELECT id, cantidad FROM pallets WHERE codigo = '$codigo_pallet'";
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

                    if($cantidad_cargados == $cantidad_pallets)
                    {
                        $sql_update="UPDATE pallets SET cargado = '1' WHERE id = '$id_pallet'";
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
                        'mensaje' => 'Caja cargada',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Esta caja ya se encuentra cargada',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>