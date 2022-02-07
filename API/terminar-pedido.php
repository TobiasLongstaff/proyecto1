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
        
            $sql_cant_prod = "SELECT SUM(productos_pedidos.cantidad) AS cantidad_productos FROM pedidos INNER JOIN productos_pedidos ON pedidos.id = productos_pedidos.id_pedido WHERE pedidos.id = '$id_pedido'";
            $resultado_cant_prod=mysqli_query($conexion,$sql_cant_prod);
            if($filas_cant_prod = mysqli_fetch_array($resultado_cant_prod))
            {
                $cantidad_productos = $filas_cant_prod['cantidad_productos'];
            }

            $sql_cant_act = "SELECT COUNT(productos.id) AS cantidad_productos_activos FROM productos WHERE activo = '1'";
            $resultado_cant_act=mysqli_query($conexion,$sql_cant_act);
            if($filas_cant_act = mysqli_fetch_array($resultado_cant_act))
            {
                $cantidad_productos_act = $filas_cant_act['cantidad_productos_activos'];
            }
            
            if($cantidad_productos != $cantidad_productos_act)
            {
                $cant_faltante = $cantidad_productos - $cantidad_productos_act;
                //LOG
                $sql_log_pro = "SELECT stock.codigo FROM stock INNER JOIN productos_pedidos ON stock.id 
                = productos_pedidos.id_producto WHERE productos_pedidos.id_pedido = '$id_pedido'";
                $resultado_log_pro=mysqli_query($conexion,$sql_log_pro);
                while($filas_log_pro = mysqli_fetch_array($resultado_log_pro))
                {
                    $productos_text = $productos_text.$filas_log_pro['codigo'].'-';
                }

                $sql_log = "INSERT INTO log (fecha, descripcion, id_pantallas, id_usuario) VALUES ('$fecha_actual', 'Se cerró el pedido ".$id_pedido." con ".$cant_faltante." productos menos productos: ".$productos_text."' , 7, $id_usuario)";
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

            $sql="SELECT id FROM productos WHERE activo = 1 AND cargado = 0";
            $resultado=mysqli_query($conexion,$sql);
            while($filas = mysqli_fetch_array($resultado))
            {
                $id = $filas['id'];
    
                $sql_update="UPDATE productos SET activo = 0, cargado = 1 WHERE id = $id";
                $resultado_update = mysqli_query($conexion, $sql_update);
            }

            if(!$resultado_update)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error inesperado volver a intentar mas tarde'
                );
            }
            else
            {
                $data = [
                    'status' => 'completed',
                    'quantity' => '2.50'
                ];
                
                // print_r($woocommerce->put('orders/'.$id_pedido, $data));

                //STOCK
                // $productos = $woocommerce->get('products');
                // $prueba = 'S4100001A292231';
    
                // $producto = buscar_producto($prueba, $productos);
                // $id_producto = $producto['id'];
                // $stock_actual = $producto['stock'];
                // $data = [
                //     'stock_quantity' => $stock_actual + 1
                // ];
                
                // print_r($woocommerce->put('products/'.$id_producto, $data));
    
                $sql_update="UPDATE pedidos SET preparado = '1' WHERE id = '$id_pedido'";
                $resultado_update = mysqli_query($conexion, $sql_update);
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Productos cargados',
                    );
                }
            }
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>