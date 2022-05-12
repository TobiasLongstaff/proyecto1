<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'DELETE')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
    
            $sql="DELETE FROM usuarios WHERE id = '$id'";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error volver a intentar mas tarde'
                );
            }
            else
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Usuario Eliminardo'
                );
            }
        }
        else
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'Faltan datos para eliminar este usuario'
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);
?>