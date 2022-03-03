<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
    
        $estado = '0';

        if(isset($_GET['codigo_or']))
        {
            $sql="SELECT * FROM pedidos WHERE preparado = '1' AND cod_pedido = concat_ws('', numero, id_pedido)";
        }
        else
        {
            $sql="SELECT * FROM pedidos WHERE preparado = '1'";
        }

        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $id_pedido = $filas['id'];

            $sql_alerta="SELECT id FROM log_pedidos WHERE id_pedido = '$id_pedido'";
            $resultado_alerta = mysqli_query($conexion, $sql_alerta);
            $numero_alerta = mysqli_num_rows($resultado_alerta);
            if($numero_alerta == '1')
            {
                $estado = '1';
            }
            else
            {
                $estado = '0';
            }

            $json[] = array(
                'id' => $id_pedido,
                'cliente' => $filas['cliente'],
                'num_pedido' => $filas['numero'],
                'direccion' => $filas['direccion'],
                'id_pedido' => $filas['id_pedido'],
                'ciudad' => $filas['ciudad'],
                'estado' => $estado,
                'cod_pedido' => $filas['cod_pedido'],
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>