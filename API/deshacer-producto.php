<?php

    require 'conexion.php';
    
    if($_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['codigo']))
        {
            $codigo = $_GET['codigo'];

            $sql_cod_veri = "SELECT codigo FROM productos WHERE activo = 1 AND codigo = $codigo";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql="UPDATE productos SET activo = 0 WHERE codigo = $codigo";
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
                        'mensaje' => 'El producto escaneado ya no se encuentra cargado',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El producto escaneado no se encuentra cargado en el pedido',
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