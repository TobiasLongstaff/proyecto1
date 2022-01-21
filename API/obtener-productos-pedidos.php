<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id_pedido = $_GET['id'];

            $sql="SELECT * FROM productos_pedidos INNER JOIN stock ON productos_pedidos.id_producto = stock.id WHERE id_pedido = '$id_pedido'";
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
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }

?>