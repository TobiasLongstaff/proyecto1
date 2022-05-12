<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id_pedido = $_GET['id'];

            $sql="SELECT productos.codigo, productos.kilos, stock.descripcion FROM productos INNER JOIN stock ON productos.cod_stock = stock.codigo WHERE id_pedido = '$id_pedido'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'descripcion' => $filas['descripcion'],
                    'codigo' => $filas['codigo'],
                    'peso' => $filas['kilos'],
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    mysqli_close($conexion);
?>