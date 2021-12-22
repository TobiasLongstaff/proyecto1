<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_caja = $datos->cod_caja;
            $id_recepcion = $datos->id_recepcion;

            $sql_cod_veri = "SELECT id FROM cajas WHERE codigo = '$codigo_caja'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_rec_veri = "SELECT cajas.id AS id_cajas FROM cajas INNER JOIN 
                pallets ON cajas.id_pallet = pallets.id WHERE cajas.codigo = '$codigo_caja' 
                AND pallets.id_recepcion = '$id_recepcion'";
                $resultado_rec_veri = mysqli_query($conexion, $sql_rec_veri);
                $numero_fila_rec_veri = mysqli_num_rows($resultado_rec_veri);
                if($numero_fila_rec_veri == '1')
                {
                    $sql = "SELECT cajas.id AS id_cajas, cajas.codigo AS codigo_cajas, cajas.descripcion, 
                    cajas.kilos, cajas.cantidades, cajas.vencimiento, cajas.id_pallet, cajas.cargado, pallets.id, 
                    pallets.codigo AS codigo_pallet FROM cajas LEFT JOIN pallets ON 
                    cajas.id_pallet = pallets.id WHERE cajas.cargado = '0' AND cajas.codigo = '$codigo_caja'";
                    $resultado = mysqli_query($conexion, $sql);
                    $numero_fila = mysqli_num_rows($resultado);
                    if($numero_fila == '1')
                    {
                        $filas = mysqli_fetch_array($resultado);
                        $codigo_pallet = $filas['codigo_pallet'];
                        if(empty($codigo_pallet))
                        {
                            $codigo_pallet = 'No asignado';
                        }
                        
                        $json[] = array(
                            'error' => '0',
                            'id_caja' => $filas['id_cajas'],
                            'mensaje' => 'Caja abierta',
                            'descripcion' => $filas['descripcion'],
                            'kilos' => $filas['kilos'],
                            'vencimiento' => $filas['vencimiento'],
                            'cantidades' => $filas['cantidades'],
                            'cod_pallet' => $codigo_pallet
                        );
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Esta caja ya se encuentra cargada',
                        );
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Esta caja no pertenece a esta recepción',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'El codigo de caja es incorrecto no existe una caja con ese codigo',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>