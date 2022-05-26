<?php

    require 'conexion.php';
    
    if($_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['codigo']) && isset($_GET['id_pedido']))
        {
            $codigo = $_GET['codigo'];
            $id_pedido = $_GET['id_pedido'];

            $sql="UPDATE pedidos SET cod_pedido = '$codigo' WHERE id = $id_pedido";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error inesperado volver a intentar mas tarde',
                    'sql' => $sql
                );
            }
            else
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Codigo asociado correctamente!',
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
    mysqli_close($conexion);
?>