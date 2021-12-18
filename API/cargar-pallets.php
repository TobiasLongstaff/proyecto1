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
                $sql_car_veri = "SELECT id FROM pallets WHERE codigo = '$codigo_pallet' AND cargado = '0'";
                $resultado_car_veri = mysqli_query($conexion, $sql_car_veri);
                $numero_fila_car_veri = mysqli_num_rows($resultado_car_veri);
                if($numero_fila_car_veri == '1')
                {
                    $sql_update="UPDATE pallets SET cargado = '1' WHERE codigo = '$codigo_pallet' AND cargado = '0'";
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
                        $sql_select = "SELECT cajas.codigo FROM cajas INNER JOIN pallets ON 
                        cajas.id_pallet = pallets.id WHERE pallets.codigo = '$codigo_pallet' 
                        AND cajas.cargado = '0'";
                        $resultado_select = mysqli_query($conexion, $sql_select);
                        while($filas = mysqli_fetch_array($resultado_select))
                        {
                            $codigo_caja = $filas['codigo'];
                            $sql_update_caja="UPDATE cajas SET cargado = '1' WHERE codigo = '$codigo_caja'";
                            $resultado_update_caja = mysqli_query($conexion, $sql_update_caja);
                            if(!$resultado_update_caja)
                            {
                                $json[] = array(
                                    'error' => '1',
                                    'mensaje' => 'Error al cargar la caja '.$codigo_caja,
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

    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>