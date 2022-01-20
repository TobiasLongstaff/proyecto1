<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $cod_producto = $datos->cod_producto;

            $sql_cod_veri = "SELECT id FROM productos WHERE codigo = '$cod_producto'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_car_veri = "SELECT id FROM productos WHERE codigo = '$cod_producto' AND cargado = '0'";
                $resultado_car_veri = mysqli_query($conexion, $sql_car_veri);
                $numero_fila_car_veri = mysqli_num_rows($resultado_car_veri);
                if($numero_fila_car_veri == '1')
                {
                    $sql_act_veri = "SELECT productos.*, stock.descripcion FROM productos INNER JOIN stock ON productos.id_stock = stock.id WHERE productos.codigo = '$cod_producto' AND cargado = '0' AND activo = '0'";
                    $resultado_act_veri = mysqli_query($conexion, $sql_act_veri);
                    $numero_fila_act_veri = mysqli_num_rows($resultado_act_veri);
                    if($numero_fila_act_veri == '1')
                    {
                        $filas = mysqli_fetch_array($resultado_act_veri);
                        $descripcion = $filas['descripcion'];
                        $kilos = $filas['kilos'];
                        $vencimiento = $filas['vencimiento'];
                        $fecha = $filas['fecha'];

                        $sql_update="UPDATE productos SET activo = '1' WHERE codigo = '$cod_producto'";
                        $resultado_update = mysqli_query($conexion, $sql_update);
                        if(!$resultado_update)
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error inesperado volver a intentar mas tarde',
                            );
                        }
                        else
                        {
                            $sql_cant = "SELECT COUNT(id) AS cantidad_escaneados FROM productos WHERE activo = '1'";
                            $resultado_cant = mysqli_query($conexion, $sql_cant);
                            if($filas_cant = mysqli_fetch_array($resultado_cant))
                            {
                                $cantidad_escaneados = $filas_cant['cantidad_escaneados'];
                            }
                            
                            $json[] = array(
                                'error' => '0',
                                'descripcion' => $descripcion,
                                'kilos' => $kilos,
                                'vencimiento' => $vencimiento,
                                'cantidad_escaneados' => $cantidad_escaneados
                            );
                        }
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Este producto ya fue agregado anteriormente',
                        );               
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Este producto ya se encuentra cargado',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El codigo de producto es incorrecto no existe un producto con ese codigo',
                );
            }
        }
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>