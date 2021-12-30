<?php

    require 'conexion.php';
    
    if($_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id']))
        {
            $id = $_GET['id'];

            $sql="UPDATE productos SET activo = '0' WHERE id = '$id'";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
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
                    'mensaje' => 'El producto seleccionado ya no se encuentra cargado',
                );
            }
        }
        else
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'Error inesperado volver a intentar mas tarde',
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>