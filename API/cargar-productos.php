<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        $resultado_update = '';
        
        $sql="SELECT id FROM productos WHERE activo = '1' AND cargado = '0'";
        $resultado=mysqli_query($conexion,$sql);
        while($filas = mysqli_fetch_array($resultado))
        {
            $id = $filas['id'];

            $sql_update="UPDATE productos SET activo = '0', cargado = '1' WHERE id = '$id'";
            $resultado_update = mysqli_query($conexion, $sql_update);
        }
        if(!$resultado_update)
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'Error inesperado volver a intentar mas tarde',
            );
        }
        else
        {
            $json[] = array(
                'error' => '0',
                'mensaje' => 'Productos cargados',
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>