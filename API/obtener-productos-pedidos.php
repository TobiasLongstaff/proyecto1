<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id_pedido = $_GET['id'];

            $sql_pedido="SELECT * FROM pedidos WHERE id = '$id_pedido'";
            $resultado_pedido=mysqli_query($conexion,$sql_pedido);
            if($filas_pedido = mysqli_fetch_array($resultado_pedido))
            {
                $sql_productos="SELECT SUM(kilos) AS peso_total FROM productos WHERE id_pedido = '$id_pedido'";
                $resultado_productos=mysqli_query($conexion,$sql_productos);
                if($filas_productos = mysqli_fetch_array($resultado_productos))
                {
                    $peso_total = round($filas_productos['peso_total'], 2).'kg';

                    $sql="SELECT productos_pedidos.id, productos_pedidos.cod_producto,
                    productos_pedidos.cantidad, stock.codigo, stock.descripcion FROM productos_pedidos INNER JOIN stock ON productos_pedidos.cod_producto = stock.codigo WHERE id_pedido = '$id_pedido'";
                    $resultado=mysqli_query($conexion,$sql);
                    $json = array();
                    while($filas = mysqli_fetch_array($resultado))
                    {
                        $json[] = array(
                            'num_pedido' => $filas_pedido['numero'],
                            'direccion' => $filas_pedido['direccion'],
                            'cliente' => $filas_pedido['cliente'],
                            'ciudad' => $filas_pedido['ciudad'],
                            'cod_postal' => $filas_pedido['cod_postal'],
                            'telefono' => $filas_pedido['telefono'],
                            'id' => $filas['id'],
                            'id_producto' => $filas['cod_producto'],
                            'cod_pedido' => $filas_pedido['cod_pedido'],
                            'descripcion' => $filas['descripcion'],
                            'codigo' => $filas['codigo'],
                            'cantidad' => $filas['cantidad'],
                            'peso_total' => $peso_total
                        );
                    }
                }
            }

            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }

?>