<?php
    require 'conexion.php';

    // crear cuenta
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $id_usuario = $datos->id;
            $nombre = $datos->nombre;
            $mail = $datos->mail;
            $permisos = $datos->permisos;

            if(!empty($id_usuario))
            {
                $sql_veri_cli = "SELECT id FROM usuarios WHERE mail = '$mail' AND id != '$id_usuario'";
                $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
                if(mysqli_num_rows($resultado_veri_cli) <= 0)
                {
                    $sql = "UPDATE usuarios SET nombre_apellido = '$nombre', mail = '$mail', tipo = '$permisos' WHERE id = '$id_usuario'";
                    $resultado = mysqli_query($conexion, $sql);
                    if(!$resultado)
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Error al cargar los datos, consultar con soporte',
                            'sql' => $sql
                        );
                    }
                    else
                    { 
                        $json[] = array(
                            'error' => '0',
                            'mensaje' => 'Usuario Creado'
                        );
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Este usuario ya se encuentra creado'
                    );
                }                
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Seleccionar un usuario'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>