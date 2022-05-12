<?php

    require 'conexion.php';
        
    if($_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['codigo']))
        {
            $codigo = $_GET['codigo'];

            $sql_cod_veri = "SELECT id FROM pedidos WHERE preparado = 1 AND cod_pedido = $codigo";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $filas = mysqli_fetch_array($resultado_cod_veri);
                $id_pedido = $filas['id'];

                $sql="UPDATE productos SET cargado = 0 WHERE id_pedido = $id_pedido";
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
                        'mensaje' => 'Devolucion realizada correctamente!',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El pedido escaneado no fue encontrado',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);
?>