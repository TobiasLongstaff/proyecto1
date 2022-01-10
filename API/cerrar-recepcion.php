<?php

    require 'conexion.php';
    require 'woocommerce.php';

    // cerrar-recepcion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            date_default_timezone_set('America/Buenos_Aires');
            $fecha_actual = date('Y-m-d H:i:s');

            $id_recepcion = $datos->id_recepcion; 
            $cant_faltante = $datos->cant_faltante;
            $id_usuario = $datos->id_usuario;

            $sql_cod_veri = "SELECT id FROM recepcion WHERE id = '$id_recepcion'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_update="UPDATE recepcion SET cargado = '1' WHERE id = '$id_recepcion'";
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
                    $productos = $woocommerce->get('products');
                    $prueba = 'S4100001A292231';
                    
                    $sql = "SELECT productos.codigo_articulo FROM pallets INNER JOIN cajas 
                    ON cajas.id_pallet = pallets.id INNER JOIN productos ON productos.id_caja = 
                    cajas.id WHERE id_recepcion = '$id_recepcion'";
                    $resultado = mysqli_query($conexion, $sql);
                    // while($filas = mysqli_fetch_array($resultado))
                    if($filas = mysqli_fetch_array($resultado))
                    {
                        // echo $id = buscar_producto($filas['codigo_articulo'], $productos);
                        $producto = buscar_producto($prueba, $productos);
                        $id_producto = $producto['id'];
                        $stock_actual = $producto['stock'];
                        $data = [
                            'stock_quantity' => $stock_actual + 1
                        ];
                        
                        print_r($woocommerce->put('products/'.$id_producto, $data));
                    }

                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Recepcion Cerrada',
                    );
                }

                if(!empty($cant_faltante))
                {
                    //LOG
                    $sql_log = "INSERT INTO log (fecha, descripcion, id_pantallas, id_usuario) VALUES ('$fecha_actual', 'Se cerró la recepción ".$id_recepcion." con ".$cant_faltante." pallets menos', '6', '$id_usuario')";
                    $resultado_log = mysqli_query($conexion, $sql_log);
                }   

            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error esta recepcion no existe',
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>