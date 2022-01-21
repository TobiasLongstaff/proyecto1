<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id_pedido']))
        {
            $id_pedido = $_GET['id_pedido'];

            $sql="SELECT productos.id, stock.descripcion FROM productos 
            INNER JOIN stock ON productos.id_stock = stock.id 
            INNER JOIN productos_pedidos ON stock.id = productos_pedidos.id_producto 
            WHERE cargado = '0' AND activo = '1' AND id_pedido = '$id_pedido'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'id' => $filas['id'],
                    'descripcion' => $filas['descripcion']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>