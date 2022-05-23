<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['key']) && $_GET['key'] == 'c52f1bd66cc19d05628bd8bf27af3ad6')
        {
            if(isset($_GET['id']))
            {
                $id_usuario = $_GET['id'];
                $sql="SELECT id, mail, nombre_apellido, tipo FROM usuarios WHERE id = '$id_usuario'";
            }
            elseif(isset($_GET['hash']))
            {
                $hash = $_GET['hash'];
                $sql="SELECT id, mail, nombre_apellido, tipo FROM usuarios WHERE hash = '$hash'";
            }
            else
            {
                $sql="SELECT id, mail, nombre_apellido, tipo FROM usuarios";
            }
            $resultado = mysqli_query($conexion, $sql);
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'error' => '0',
                    'mail' => $filas['mail'],
                    'nombre' => $filas['nombre_apellido'],
                    'tipo' => $filas['tipo'],
                    'id' => $filas['id']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    mysqli_close($conexion);
?>