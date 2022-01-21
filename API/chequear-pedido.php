<?php

    require 'conexion.php';

    // cerrar-recepcion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            date_default_timezone_set('America/Buenos_Aires');
            $fecha_actual = date('Y-m-d H:i:s');

            $id_pedido = $datos->id_pedido; 

            $sql_cod_veri = "SELECT id FROM pedidos WHERE id = '$id_pedido'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
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
                    $json[] = array(
                        'error' => '2',
                        'cantidad_faltante' => $cant_faltante,
                        'mensaje' => '¿Todavía tienes '.$cant_faltante.' productos pendientes de este pedido deseas cerrar el pedido igualmente?',
                    );
                }
                else
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Pedido cargado correctamente',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error este pedido no existe',
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>