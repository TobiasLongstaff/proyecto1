<?php
    require 'conexion.php';

    // iniciar sesio

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $mail = $datos->mail;
            $password = $password = sha1($datos->password);
        
            $sql = "SELECT * FROM usuarios WHERE mail = '$mail' AND password = '$password'";
            $resultado = mysqli_query($conexion, $sql);
            $numero_fila = mysqli_num_rows($resultado);
            if($numero_fila == '1')
            {
                $filas = mysqli_fetch_array($resultado);
                $hash = $filas['hash'];
                $tipo_usuario = $filas['tipo'];
                $nombre = $filas['nombre_apellido'];
    
                if($tipo_usuario == 'handheld' || $tipo_usuario == 'admin' || $tipo_usuario == 'estandar')
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Bien',
                        'hash' => $hash,
                        'nombre' => $nombre
                    );           
                }
                else
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Su cuenta está pendiente de aprobación'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Usuario o Contraseña incorrectos'
                );
            }     
        }
        else
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'Error'
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);
?>