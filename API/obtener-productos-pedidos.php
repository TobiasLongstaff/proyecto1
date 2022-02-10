<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id_pedido = $_GET['id'];

            $sql="SELECT stock.codigo, stock.descripcion, productos_pedidos.cantidad, productos.kilos, productos.id, productos_pedidos.id_producto FROM productos_pedidos INNER JOIN stock ON productos_pedidos.id_producto = stock.id
            INNER JOIN productos ON stock.id = productos.id_stock WHERE id_pedido = '$id_pedido'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'id' => $filas['id'],
                    'id_producto' => $filas['id_producto'],
                    'descripcion' => $filas['descripcion'],
                    'codigo' => $filas['codigo'],
                    'cantidad' => $filas['cantidad'],
                    'peso' => $filas['kilos'],
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }

?>