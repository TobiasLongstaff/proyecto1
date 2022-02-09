<?php
    require 'conexion.php';
    require 'woocommerce.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
    
        $sql="SELECT * FROM pedidos WHERE preparado = '1'";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'cliente' => $filas['cliente'],
                'num_pedido' => $filas['numero'],
                'direccion' => $filas['direccion'],
                'id_pedido' => $filas['id_pedido'],
                'ciudad' => $filas['ciudad']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>