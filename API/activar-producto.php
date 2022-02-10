<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $cod_producto = $datos->cod_producto;
            $id_pedido = $datos->id_pedido;

            $sql_pro_veri = "SELECT productos.id FROM productos INNER JOIN productos_pedidos 
            ON productos_pedidos.id_producto = productos.id_stock WHERE productos.codigo = $cod_producto AND productos_pedidos.id_pedido = $id_pedido";
            $resultado_pro_veri = mysqli_query($conexion, $sql_pro_veri);
            $numero_fila_pro_veri = mysqli_num_rows($resultado_pro_veri);
            if($numero_fila_pro_veri == '1')
            {
                $sql_cod_veri = "SELECT productos.id FROM productos INNER JOIN cajas ON cajas.id = productos.id_caja 
                WHERE cajas.cargado = 1 AND productos.codigo = $cod_producto";
                $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
                $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
                if($numero_fila_cod_veri == '1')
                {
                    $sql_car_veri = "SELECT id FROM productos WHERE codigo = $cod_producto AND cargado = 0";
                    $resultado_car_veri = mysqli_query($conexion, $sql_car_veri);
                    $numero_fila_car_veri = mysqli_num_rows($resultado_car_veri);
                    if($numero_fila_car_veri == '1')
                    {
                        $sql_act_veri = "SELECT productos.id_stock, stock.descripcion, productos.kilos, productos.vencimiento, productos.fecha, 
                        stock.codigo FROM productos INNER JOIN stock ON stock.id = productos.id_stock 
                        WHERE productos.codigo = $cod_producto AND productos.cargado = 0 AND 
                        productos.activo = 0";
                        $resultado_act_veri = mysqli_query($conexion, $sql_act_veri);
                        if($filas_act_veri = mysqli_fetch_array($resultado_act_veri))
                        {
                            $id_producto = $filas_act_veri['id_stock'];
                            $kilos = $filas_act_veri['kilos'];
                            $vencimiento = $filas_act_veri['vencimiento'];
                            $fecha = $filas_act_veri['fecha'];
                            $codigo = $filas_act_veri['codigo'];
                            $descripcion = $filas_act_veri['descripcion'];

                            $sql_cant = "SELECT COUNT(id) AS cantidad_escaneados FROM productos WHERE activo = '1' AND id_stock = '$id_producto'";
                            $resultado_cant = mysqli_query($conexion, $sql_cant);
                            if($filas_cant = mysqli_fetch_array($resultado_cant))
                            {
                                $cantidad_escaneados = $filas_cant['cantidad_escaneados'];
                            }

                            $sql_cant_total = "SELECT cantidad FROM productos_pedidos WHERE id_pedido = '$id_pedido' AND id_producto = '$id_producto'";
                            $resultado_cant_total = mysqli_query($conexion, $sql_cant_total);
                            if($filas_cant_total = mysqli_fetch_array($resultado_cant_total))
                            {
                                $cantidad_total = $filas_cant_total['cantidad'];
                            }
                            
                            if($cantidad_total == $cantidad_escaneados)
                            {
                                $json[] = array(
                                    'error' => '1',
                                    'mensaje' => 'Los productos necesarios para el pedido ya se encuentran cargados',
                                );  
                            }
                            else
                            {
                                $sql_update="UPDATE productos SET activo = 1 WHERE codigo = $cod_producto";
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
                                    $sql_cant = "SELECT COUNT(id) AS cantidad_escaneados FROM productos WHERE activo = '1' AND id_stock = '$id_producto'";
                                    $resultado_cant = mysqli_query($conexion, $sql_cant);
                                    if($filas_cant = mysqli_fetch_array($resultado_cant))
                                    {
                                        $cantidad_escaneados = $filas_cant['cantidad_escaneados'];
                                    }

                                    $json[] = array(
                                        'error' => '0',
                                        'kilos' => $kilos,
                                        'vencimiento' => $vencimiento,
                                        'cantidad_escaneados' => $cantidad_escaneados,
                                        'codigo' => $cod_producto,
                                        'descripcion' => $descripcion,
                                        'cantidad_total' => $cantidad_total
                                    );
                                }
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
                        'mensaje' => 'El codigo de producto es incorrecto o aun no se habilito este producto',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El producto escaneado no coincide con el del pedido',
                    'codigo' => $cod_producto
                );              
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>