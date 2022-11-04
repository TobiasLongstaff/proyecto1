<?php

    require 'conexion.php';
    require 'woocommerce.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_pedido']) && isset($_GET['id_usuario']))
        {
            date_default_timezone_set('America/Buenos_Aires');
            $fecha_actual = date('Y-m-d H:i:s');

            $id_pedido = $_GET['id_pedido'];
            $id_usuario = $_GET['id_usuario'];
            $resultado_update = '';
            $productos_text = '';
            $id_pedido_woo = '';
        
            $sql_cant_prod = "SELECT SUM(productos_pedidos.cantidad) AS cantidad_productos, pedidos.id_pedido FROM pedidos INNER JOIN productos_pedidos ON pedidos.id = productos_pedidos.id_pedido WHERE pedidos.id = '$id_pedido'";
            $resultado_cant_prod=mysqli_query($conexion,$sql_cant_prod);
            if($filas_cant_prod = mysqli_fetch_array($resultado_cant_prod))
            {
                $cantidad_productos = $filas_cant_prod['cantidad_productos'];
                $id_pedido_woo = $filas_cant_prod['id_pedido'];
            }

            $sql_cant_act = "SELECT COUNT(productos.codigo) AS cantidad_productos_activos FROM productos WHERE activo = '1'";
            $resultado_cant_act=mysqli_query($conexion,$sql_cant_act);
            if($filas_cant_act = mysqli_fetch_array($resultado_cant_act))
            {
                $cantidad_productos_act = $filas_cant_act['cantidad_productos_activos'];
            }
            
            if($cantidad_productos != $cantidad_productos_act)
            {
                $cant_faltante = $cantidad_productos - $cantidad_productos_act;
                //LOG
                $sql_log_pro = "SELECT stock.codigo FROM stock INNER JOIN productos_pedidos ON stock.codigo 
                = productos_pedidos.cod_producto WHERE productos_pedidos.id_pedido = '$id_pedido'";
                $resultado_log_pro=mysqli_query($conexion,$sql_log_pro);
                while($filas_log_pro = mysqli_fetch_array($resultado_log_pro))
                {
                    $productos_text = $productos_text.$filas_log_pro['codigo'].'-';
                }

                $sql_log = "INSERT INTO log_pedidos (fecha, descripcion, id_pantallas, id_usuario, id_pedido) VALUES ('$fecha_actual', 'Se cerró el pedido ".$id_pedido." con ".$cant_faltante." productos menos productos: ".$productos_text."' , 7, $id_usuario, $id_pedido)";
                $resultado_log = mysqli_query($conexion, $sql_log);
                if(!$resultado_log)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error de log',
                        'sql' => $sql_log
                    );
                }

            }

            // UPDATE PRECIO
            // Falta que tome el precio por kilo del producto lo demas esta todo
            // $pedido = $woocommerce->get('orders/'.$id_pedido_woo);
            // $shipping = $pedido->shipping_total;
            // $precio_final = 0;
            // $json_pedido = json_decode(json_encode($pedido), true);
            // foreach($json_pedido['line_items'] as $item)
            // {
            //     $id_producto_pedido = $item['id'];
            //     $id_producto = $item['product_id'];
            //     $sku = $item['sku'];
            //     $kilos = 0;
            //     $precio_por_producto = 0;

            //     $sql_productos_act="SELECT SUM(kilos) AS kilos FROM productos WHERE activo = 1 AND cargado = 0 AND cod_stock = '$sku'";
            //     $resultado_productos_act=mysqli_query($conexion,$sql_productos_act);
            //     if($filas_productos_act = mysqli_fetch_array($resultado_productos_act))
            //     {
            //         $kilos = round($filas_productos_act['kilos'], 2);
            //     }
        
            //     $productos = $woocommerce->get('products/'.$id_producto);
            //     $precio_por_kilo = $productos->price;
            //     $precio_por_producto = $precio_por_kilo * $kilos;
            //     $precio_final = $precio_final + $precio_por_producto;
        
            //     $line_items[] = array(                  
            //         'id' => $id_producto_pedido,
            //         'subtotal' => $precio_por_producto,
            //         'total' => $precio_por_producto,
            //         'meta_data' =>
            //         [
            //             [
            //                 'key' => 'peso recalculado',
            //                 'value' => $kilos,                                  
            //             ],
            //             [
            //                 'key' => 'precio recalculado',
            //                 'value' => $precio_por_producto,                                  
            //             ]
            //         ]                        
            //     );
            // }

            // echo $shipping + $precio_final;

            // $data = [
            //     'update' => 
            //     [
            //         [
            //             'id' => $id_pedido_woo,
            //             'line_items' => $line_items
            //         ]
            //     ]
            // ];

            // print_r($woocommerce->post('orders/batch', $data));

            // if(!$resultado_update)
            // {
            //     $json[] = array(
            //         'error' => '1',
            //         'mensaje' => 'Error inesperado volver a intentar mas tarde'
            //     );
            // }
            // else
            // {
                $sql="SELECT codigo FROM productos WHERE activo = 1 AND cargado = 0";
                $resultado=mysqli_query($conexion,$sql);
                while($filas = mysqli_fetch_array($resultado))
                {
                    $id = $filas['codigo'];
                    $sql_update="UPDATE productos SET activo = 0, cargado = 1, id_pedido = $id_pedido WHERE codigo = $id";
                    $resultado_update = mysqli_query($conexion, $sql_update);                    
                }

                $sql_update="UPDATE pedidos SET preparado = '1' WHERE id = '$id_pedido'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Productos cargados',
                    );
                }
            }
        // }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);
?>