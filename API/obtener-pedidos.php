<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        $sql="SELECT * FROM pedidos WHERE preparado = '0'";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'cliente' => $filas['cliente'],
                'id_pedido' => $filas['id_pedido']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>