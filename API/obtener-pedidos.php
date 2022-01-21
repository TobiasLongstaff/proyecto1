<?php
    require 'conexion.php';
    require 'woocommerce.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        $datos = $woocommerce->get('orders'); 
        $json = json_decode(json_encode($datos), true);
        
        foreach($json as $item)
        {
            $id_pedido = $item['id'];
            $n_pedido = $item['number'];
            $estado = $item['status'];
            
            if($estado == 'processing')
            {
                $sql_veri_woo="SELECT id FROM pedidos WHERE id_pedido = '$id_pedido'";
                $resultado_veri_woo = mysqli_query($conexion, $sql_veri_woo);
                $numero_fila_veri_woo = mysqli_num_rows($resultado_veri_woo);
                if($numero_fila_veri_woo != '1')
                {
                    $sql_woo = "INSERT INTO pedidos (cliente, id_pedido, numero, preparado) VALUE ('prueba', '$id_pedido', '$n_pedido', '0')";
                    $resultado_woo = mysqli_query($conexion, $sql_woo);

                    $sql_veri_woo_id="SELECT id FROM pedidos WHERE id_pedido = '$id_pedido'";
                    $resultado_veri_woo_id = mysqli_query($conexion, $sql_veri_woo_id);
                    if($filas_pedido = mysqli_fetch_array($resultado_veri_woo_id));
                    {
                        $id_pedido_tabla = $filas_pedido['id'];
                    }

                    $datos_pro = $woocommerce->get("orders/" . $id_pedido);
                    $json_pro = json_decode(json_encode($datos_pro), true);
                    
                    foreach($json_pro['line_items'] as $pro)
                    {
                        $codigo = $pro['sku'];
                        $cantidad = $pro['quantity'];

                        $sql_stock="SELECT id FROM stock WHERE codigo = '$codigo'";
                        $resultado_stock = mysqli_query($conexion, $sql_stock);
                        $numero_fila_stock = mysqli_num_rows($resultado_stock);
                        if($numero_fila_stock == '1')
                        {
                            $filas_stock = mysqli_fetch_array($resultado_stock);
                            $id_producto = $filas_stock['id'];

                            $sql_woo_pro = "INSERT INTO productos_pedidos (id_producto, id_pedido, cantidad) VALUE ('$id_producto', '$id_pedido_tabla', '$cantidad')";
                            $resultado_woo_pro = mysqli_query($conexion, $sql_woo_pro);
                            if(!$resultado_woo_pro)
                            {
                                echo 'error1';
                            }
                        }

                        // $sku = explode("-", $pro['sku']);
                        // foreach($sku as  $s)
                        // {
                        //     $codigo_v_productos = $s;

                        //     $sql_stock_v="SELECT id FROM stock WHERE codigo = '$codigo'";
                        //     $resultado_stock_v = mysqli_query($conexion, $sql_stock_v);
                        //     $numero_fila_stock_v = mysqli_num_rows($resultado_stock_v);
                        //     if($numero_fila_stock_v == '1')
                        //     {
                        //         $filas_stock_v = mysqli_fetch_array($resultado_stock_v);
                        //         $id_producto_v = $filas_stock_v['id'];
                        //         $cantidad_producto_v = 1;

                        //         $sql_woo_pro = "INSERT INTO productos_pedidos (id_producto, id_pedido, cantidad) VALUE ('$id_producto_v', '$id_pedido_tabla', '$cantidad_producto_v')";
                        //         $resultado_woo_pro = mysqli_query($conexion, $sql_woo_pro);
                        //         if(!$resultado_woo_pro)
                        //         {
                        //             echo 'error2';
                        //         }     
                        //     }                       
                        // }
                    }
                }
            }
            else
            {
                $sql_delete = "DELETE FROM pedidos WHERE id_pedido = '$id_pedido' AND preparado = '0'";
                $resultado_delete = mysqli_query($conexion, $sql_delete);
                if(!$resultado_delete)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'error al eliminar'
                    );
                }
            }
        }
    
        $sql="SELECT * FROM pedidos WHERE preparado = '0'";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'cliente' => $filas['cliente'],
                'num_pedido' => $filas['numero']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>