<?php

    require 'conexion.php';

    // cargar cajas
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $codigo_caja = $datos->cod_caja;
            $cod_recepcion = $datos->id_recepcion;
            $codigo_pallet = '';

            $sql_cod_veri = "SELECT codigo FROM cajas WHERE codigo = '$codigo_caja'";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $sql_rec_veri = "SELECT cajas.codigo AS id_cajas FROM cajas INNER JOIN 
                pallets ON cajas.cod_pallet = pallets.codigo WHERE cajas.codigo = '$codigo_caja' 
                AND pallets.cod_recepcion = '$cod_recepcion'";
                $resultado_rec_veri = mysqli_query($conexion, $sql_rec_veri);
                $numero_fila_rec_veri = mysqli_num_rows($resultado_rec_veri);
                if($numero_fila_rec_veri == '1')
                {
                    $sql = "SELECT cajas.codigo AS id_cajas, cajas.descripcion, 
                    cajas.kilos, cajas.cantidades, cajas.vencimiento, cajas.cod_pallet, cajas.cargado, 
                    pallets.codigo AS codigo_pallet FROM cajas 
                    LEFT JOIN pallets ON cajas.cod_pallet = pallets.codigo 
                    WHERE cajas.cargado = '0' AND cajas.codigo = '$codigo_caja'";
                    $resultado = mysqli_query($conexion, $sql);
                    $numero_fila = mysqli_num_rows($resultado);
                    if($numero_fila == '1')
                    {
                        $filas = mysqli_fetch_array($resultado);
                        $codigo_pallet = $filas['codigo_pallet'];
                        $id_caja = $filas['id_cajas'];
                        $descripcion = $filas['descripcion'];
                        $vencimiento = $filas['vencimiento'];
                        $cantidades = $filas['cantidades'];
                        $kilos = $filas['kilos'];
                        
                        if(empty($codigo_pallet))
                        {
                            $codigo_pallet = 'No asignado';
                        }

                        $sql_update="UPDATE cajas SET cargado = '1' WHERE codigo = '$codigo_caja' AND cargado = '0'";
                        $resultado_update = mysqli_query($conexion, $sql_update);
                        if(!$resultado_update)
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error al cargar la caja',
                            );
                        }
                        else
                        {
                            $sql="SELECT codigo, cantidad FROM pallets WHERE codigo = '$codigo_pallet'";
                            $resultado=mysqli_query($conexion,$sql);
                            if($filas = mysqli_fetch_array($resultado))
                            {
                                $cod_pallet = $filas['codigo'];
                                $cantidad_pallets = $filas['cantidad'];
                            }
        
                            $sql="SELECT COUNT(codigo) AS cantidad_cargados FROM cajas WHERE cod_pallet = '$cod_pallet' AND cargado != '0'";
                            $resultado=mysqli_query($conexion,$sql);
                            if($filas = mysqli_fetch_array($resultado))
                            {
                                $cantidad_cargados = $filas['cantidad_cargados'];
                            }
        
                            if($cantidad_cargados == $cantidad_pallets)
                            {
                                $sql_update="UPDATE pallets SET cargado = '1' WHERE codigo = '$cod_pallet'";
                                $resultado_update = mysqli_query($conexion, $sql_update);
                                if(!$resultado_update)
                                {
                                    $json[] = array(
                                        'error' => '1',
                                        'mensaje' => 'Error al cargar la caja',
                                    );
                                }
                            }
        
                            $json[] = array(
                                'error' => '0',
                                'cod_caja' => $codigo_caja,
                                'id_caja' => $id_caja,
                                'mensaje' => 'Caja abierta',
                                'descripcion' => $descripcion,
                                'kilos' => $kilos,
                                'vencimiento' => $vencimiento,
                                'cantidades' => $cantidades,
                                'cod_pallet' => $codigo_pallet
                            );
                        }
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
    mysqli_close($conexion);
?>