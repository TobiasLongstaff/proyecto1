<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['filtro']))
        {
            $filtro = $_GET['filtro'];
            $cargado = '';
            if($filtro == 'cerrada')
            {
                $cargado = '0';
            }
            else
            {
                $cargado = '1';
            }
            $sql = "SELECT cajas.* FROM cajas 
            INNER JOIN productos ON productos.cod_caja = cajas.codigo WHERE productos.cargado = '$cargado'";
        }
        else
        {
            $sql = "SELECT * FROM cajas";
        }
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