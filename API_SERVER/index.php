<?php
    require 'conexion_pampa.php';
    require 'conexion_iflow.php';
    require 'woocommerce.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        header("HTTP/1.1 200 OK");
        $datos = $woocommerce->get('orders?per_page=30'); 
        $json = json_decode(json_encode($datos), true);
        
        foreach($json as $item) {
            $id_pedido = $item['id'];
            $n_pedido = $item['number'];
            $estado = $item['status'];
            $nombre = $item['billing']['first_name'];
            $apellido = $item['billing']['last_name'];
            $direccion = $item['billing']['address_1'];
            $ciudad = $item['billing']['city'];
            $cod_postal = $item['billing']['postcode'];
            $telefono = $item['billing']['phone'];
            $cod_pedido = $n_pedido.$id_pedido;

            if($estado == 'completed') {
                if($cod_postal == '6360') {
                    $conexion = $conexion_pampa;
                }
                else {
                    $conexion = $conexion_iflow;
                }

                $sql_veri_woo="SELECT id FROM pedidos WHERE id_pedido = '$id_pedido'";
                $resultado_veri_woo = mysqli_query($conexion, $sql_veri_woo);
                $numero_fila_veri_woo = mysqli_num_rows($resultado_veri_woo);
                if($numero_fila_veri_woo != '1')
                {
                    $sql_woo = "INSERT INTO pedidos (cliente, id_pedido, numero, direccion, ciudad, preparado, cod_pedido, cod_postal, telefono) VALUE ('$apellido $nombre', '$id_pedido', '$n_pedido', '$direccion', '$ciudad', '0', '$cod_pedido', '$cod_postal', '$telefono')";
                    $resultado_woo = mysqli_query($conexion, $sql_woo);

                    $datos_pro = $woocommerce->get("orders/" . $id_pedido);
                    $json_pro = json_decode(json_encode($datos_pro), true);
                    
                    foreach($json_pro['line_items'] as $pro)
                    {
                        $codigo = $pro['sku'];
                        $cantidad = $pro['quantity'];

                        $sql_stock="SELECT codigo FROM stock WHERE codigo = '$codigo'";
                        $resultado_stock = mysqli_query($conexion, $sql_stock);
                        $numero_fila_stock = mysqli_num_rows($resultado_stock);
                        if($numero_fila_stock == '1')
                        {
                            $filas_stock = mysqli_fetch_array($resultado_stock);
                            $cod_producto = $filas_stock['codigo'];

                            $sql_veri_woo_id="SELECT id FROM pedidos WHERE id_pedido = '$id_pedido'";
                            $resultado_veri_woo_id = mysqli_query($conexion, $sql_veri_woo_id);
                            if($filas_pedido = mysqli_fetch_array($resultado_veri_woo_id));
                            {
                                $id_pedido_tabla = $filas_pedido['id'];
                            }

                            $sql_woo_pro = "INSERT INTO productos_pedidos (cod_producto, id_pedido, cantidad) VALUE ('$cod_producto', '$id_pedido_tabla', '$cantidad')";
                            $resultado_woo_pro = mysqli_query($conexion, $sql_woo_pro);
                            if(!$resultado_woo_pro)
                            {
                                echo 'error1';
                            }
                        }
                    }
                }
            }
            else
            {
                $sql_delete = "DELETE FROM pedidos WHERE id_pedido = $id_pedido AND preparado = 0";
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
        // print_r($json);
    }
    mysqli_close($conexion);
?>