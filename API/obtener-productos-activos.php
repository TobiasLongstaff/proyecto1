<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        $sql="SELECT id, descripcion FROM productos WHERE cargado = '0' AND activo = '1'";
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

?>