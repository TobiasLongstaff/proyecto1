<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        $sql="SELECT * FROM cajas";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas_cajas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'codigo' => $filas_cajas['codigo'],
                'cantidad' => $filas_cajas['cantidades'],
                'descripcion' => $filas_cajas['descripcion'],
                'kilos' => $filas_cajas['kilos'],
                'vencimiento' => $filas_cajas['vencimiento'],
            );
        }
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

    mysqli_close($conexion);
?>