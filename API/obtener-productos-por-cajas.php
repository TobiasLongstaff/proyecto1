<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['codigo']))
        {
            $codigo = $_GET['codigo'];

            $sql="SELECT * FROM productos WHERE cod_caja = '$codigo'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas_cajas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'codigo' => $filas_cajas['codigo'],
                    'kilos' => $filas_cajas['kilos'],
                    'vencimiento' => $filas_cajas['vencimiento'],
                    'cargado' => $filas_cajas['cargado']
                );
            }            
        }
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

    mysqli_close($conexion);
?>