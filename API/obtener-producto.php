<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_producto']) && isset($_GET['id_pedido']))
        {
            $cod_producto = $_GET['id_producto'];
            $id_pedido = $_GET['id_pedido'];

            $sql="SELECT descripcion FROM stock WHERE codigo = '$cod_producto' ";
            $resultado=mysqli_query($conexion,$sql);
            if($filas = mysqli_fetch_array($resultado))
            {
                $descripcion = $filas['descripcion'];

                $sql_cant_total = "SELECT cantidad FROM productos_pedidos WHERE id_pedido = '$id_pedido' AND cod_producto = '$cod_producto'";
                $resultado_cant_total = mysqli_query($conexion, $sql_cant_total);
                if($filas_cant_total = mysqli_fetch_array($resultado_cant_total))
                {
                    $cantidad_total = $filas_cant_total['cantidad'];
                }

                $sql_cant = "SELECT COUNT(productos.codigo) AS cantidad_escaneados, stock.codigo FROM productos 
                INNER JOIN stock ON stock.codigo = productos.cod_stock
                WHERE productos.activo = '1' AND productos.cod_stock = '$cod_producto'";
                $resultado_cant = mysqli_query($conexion, $sql_cant);
                if($filas_cant = mysqli_fetch_array($resultado_cant))
                {
                    $cantidad_escaneados = $filas_cant['cantidad_escaneados'];
                    $codigo = $filas_cant['codigo'];

                    $json[] = array(
                        'error' => '0',
                        'descripcion' => $descripcion,
                        'cantidad_escaneados' => $cantidad_escaneados,
                        'cant_total' => $cantidad_total,
                        'cod_producto' => $codigo
                    );
                }
            }
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>