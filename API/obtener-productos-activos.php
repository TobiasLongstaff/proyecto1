<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id_pedido']))
        {
            $id_pedido = $_GET['id_pedido'];

            $sql="SELECT productos.codigo, stock.descripcion, COUNT(stock.descripcion) AS cantidad_productos FROM productos 
            INNER JOIN stock ON productos.cod_stock = stock.codigo
            INNER JOIN productos_pedidos ON stock.codigo = productos_pedidos.cod_producto 
            WHERE cargado = '0' AND activo = '1' AND productos_pedidos.id_pedido = '$id_pedido' 
            GROUP BY stock.descripcion HAVING cantidad_productos >=1";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'codigo' => $filas['codigo'],
                    'descripcion' => $filas['descripcion'],
                    'cantidad' => $filas['cantidad_productos'],
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    mysqli_close($conexion);
?>