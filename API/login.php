<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    require 'conexion.php';

    // iniciar sesion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
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
                $tipo_usuario = $filas['tipo'];
    
                if($tipo_usuario == 'estandar' || $tipo_usuario == 'admin')
                {
                    header("HTTP/1.1 200 OK");
                    echo '1';            
                }
                else
                {
                    header("HTTP/1.1 200 OK");
                    echo 'Su cuenta está pendiente de aprobación';
                }
            }
            else
            {
                header("HTTP/1.1 200 OK");
                echo 'Usuario o Contraseña incorrectos';
            }     
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo 'error2';
        }
    }
    else
    {
        header("HTTP/1.1 400 Bad Request");
        echo 'error1';
    }
?>