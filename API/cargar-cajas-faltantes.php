<?php

    require 'conexion.php';
        
    if($_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['codigo']))
        {
            $codigo = $_GET['codigo'];

            $sql_cod_veri = "SELECT cod_pallet FROM cajas WHERE cargado = 0 AND codigo = $codigo";
            $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
            $numero_fila_cod_veri = mysqli_num_rows($resultado_cod_veri);
            if($numero_fila_cod_veri == '1')
            {
                $filas = mysqli_fetch_array($resultado_cod_veri);
                $cod_pallet = $filas['cod_pallet'];
                $sql_cod_veri = "SELECT cargado FROM recepcion WHERE documento = (SELECT cod_recepcion FROM pallets WHERE codigo = $cod_pallet AND cargado = 0)";
                $resultado_cod_veri = mysqli_query($conexion, $sql_cod_veri);
                if($filas = mysqli_fetch_array($resultado_cod_veri))
                {
                    $cargado = $filas['cargado'];
                    if($cargado == 1)
                    {
                        $sql="UPDATE cajas SET cargado = 1 WHERE codigo = $codigo";
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
                                'mensaje' => 'Caja cargada correctamente!',
                            );
                        }                        
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'La recepcion que contiene esta caja no se encuentra cerrada',
                        );
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'No existe una recepcion con esta caja',
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Esta caja no existe o ya se encuentra cargada',
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);

?>