<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    require 'conexion.php';

    // cargar cajas
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            date_default_timezone_set('America/Buenos_Aires');
            $fecha_actual = date('Y-m-d');

            $codigo_caja = $datos->cod_caja;
            $codigo_producto = $datos->cod_producto;
            $fecha_vencimiento = $datos->fecha_ven;
            $peso = $datos->peso;
            $descripcion = $datos->descripcion;

            $sql_cod_veri = "SELECT * FROM productos WHERE codigo = '$codigo_producto'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Este producto ya se encuentra cargado',
                );
            }
            else
            {
                $sql = "INSERT INTO productos (codigo, descripcion, kilos, vencimiento, activo, fecha, stock, id_caja) 
                VALUES ('$codigo_producto', '$descripcion', '$peso', '$fecha_vencimiento', '1', '$fecha_actual', '1', '$codigo_caja')";
                $resultado = mysqli_query($conexion, $sql);
                if(!$resultado)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al cargar los datos, consultar con soporte',
                    );
                }
                else
                {
                    $sql_cantidad = "SELECT COUNT(id) AS cantidad FROM productos WHERE id_caja = '$codigo_caja'";
                    $resultado_cantidad = mysqli_query($conexion, $sql_cantidad);
                    if($filas = mysqli_fetch_array($resultado_cantidad, MYSQLI_ASSOC))
                    {
                        $json[] = array(
                            'error' => '0',
                            'cantidad_cargados' => $filas['cantidad'],
                            'mensaje' => 'Producto Cargado'
                        );
                    }
                }
            }


            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>