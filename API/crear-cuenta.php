<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    require 'conexion.php';

    // iniciar sesion
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $nombre_apellido = $datos->nombre_apellido;
            $mail_cliente = $datos->mail;
            $password = $password = sha1($datos->password);
            $password_con = sha1($datos->password_con);
            $hash = md5(rand(0,1000));

            $sql = "SELECT mail FROM usuarios WHERE mail = '$mail_cliente'";
            $resultado = mysqli_query($conexion, $sql);
            if(mysqli_num_rows($resultado) > 0)
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'El mail ya estan asociados a una cuenta'
                );
            }
            else
            {
                if($password == $password_con)
                {
                    $sql = "INSERT INTO usuarios (mail, password, nombre_apellido, hash, tipo) 
                    VALUES ('$mail_cliente', '$password', '$nombre_apellido', '$hash', 'Pendiente')";
                    $resultado = mysqli_query($conexion, $sql);
                    if(!$resultado)
                    {
                        $json[] = array(
                            'error' => '0',
                            'mensaje' => 'Error al cargar los datos, consultar con soporte'
                        );
                    }
                    else
                    { 
                        // $mail = new PHPMailer();
                        // // $mail->IsSMTP();
                        // $mail->SMTPAuth = true;
                        // $mail->Port = 465; 
                        // $mail->SMTPSecure = 'ssl';
                        // $mail->IsHTML(true); 
                        // // $mail->SMTPDebug  = 2;
                    
                    
                        // // VALORES A MODIFICAR //
                        // $mail->Host = $smtpHost; 
                        // $mail->Username = $smtpUsuario; 
                        // $mail->Password = $smtpClave;
                    
                        // $mail->From = $smtpUsuario;
                        // $mail->FromName = $nombre;
                        // $mail->AddAddress($mail_cliente);
                    
                        // $mail->Subject = "Tu cuenta de viewingmanagement.com se encuentra a espera de aprobación"; // Este es el titulo del email.
                        // $mail->Body = '
                        // <head>
                        //     <meta charset="UTF-8">
                        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                        //     <style type="text/css">
                        //         body
                        //         {
                        //             margin: 0;
                        //             padding: 0;
                        //             background-color: #ffffff;
                        //         }
                    
                        //         table
                        //         {
                        //             border-spacing: 0;
                        //         }
                    
                        //         td
                        //         {
                        //             padding: 0;
                        //         }
                    
                        //         .contenido
                        //         {
                        //             width: 100%;
                        //             padding-bottom: 40px;
                        //             display: flex;
                        //             justify-content: center;
                        //             margin-top: 2%;
                        //         }
                    
                        //         a
                        //         {
                        //             color: #ffffff;
                        //             background-color: #0555bd;
                        //             border-radius: 5px;
                        //             padding: 20px;
                        //             font-size: 25px;
                        //             text-decoration: none;
                        //         }
                    
                    
                        //         h1
                        //         {
                        //             color: #0555bd;
                        //         }
                    
                        //         h2
                        //         {
                        //             margin-bottom: 50px;
                        //         }
                    
                        //     </style>
                        // </head>
                        // <body>
                        //     <div class="contenido">
                        //         <div>
                        //             <div>
                        //                 <h1>¡Hola!</h1>
                        //                 <h2 style="color: #7D7D7D;">Su cuente se encuentra en espera de aprobación, espere a que comprobemos todos los <br>
                        //                     datos para dar de alta su cuente, una vez esté aprobado llegara un mail <br>
                        //                     de aviso. Gracias por utilizar viewingmanagement.com<br>
                        //                     En caso de inconvenientes contactar con soporte técnico.</h2>              
                        //             </div>               
                        //         </div>
                        //     </div>
                        // </body>';
                        // if(!$mail->send())
                        // {
                        //     echo 'error';
                        // }
                        // else
                        // {
                        //    echo '1'; 
                        // }
                        
                        // $mail = new PHPMailer();
                        // // $mail->IsSMTP();
                        // $mail->SMTPAuth = true;
                        // $mail->Port = 465; 
                        // $mail->SMTPSecure = 'ssl';
                        // $mail->IsHTML(true); 
                        // // $mail->SMTPDebug  = 2;
                    
                    
                        // // VALORES A MODIFICAR //
                        // $mail->Host = $smtpHost; 
                        // $mail->Username = $smtpUsuario; 
                        // $mail->Password = $smtpClave;
                    
                        // $mail->From = $smtpUsuario;
                        // $mail->FromName = $nombre;
                        // $mail->AddAddress($smtpUsuario);
                    
                        // $mail->Subject = "Nueva cuenta de viewingmanagement.com"; // Este es el titulo del email.
                        // $mail->Body = '
                        // <head>
                        //     <meta charset="UTF-8">
                        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                        //     <style type="text/css">
                        //         body
                        //         {
                        //             margin: 0;
                        //             padding: 0;
                        //             background-color: #ffffff;
                        //         }
                    
                        //         table
                        //         {
                        //             border-spacing: 0;
                        //         }
                    
                        //         td
                        //         {
                        //             padding: 0;
                        //         }
                    
                        //         .contenido
                        //         {
                        //             width: 100%;
                        //             padding-bottom: 40px;
                        //             display: flex;
                        //             justify-content: center;
                        //             margin-top: 2%;
                        //         }
                    
                        //         a
                        //         {
                        //             color: #ffffff;
                        //             background-color: #220088;
                        //             border-radius: 5px;
                        //             padding: 20px;
                        //             font-size: 25px;
                        //             text-decoration: none;
                        //         }
                    
                    
                        //         h1
                        //         {
                        //             color: #220088;
                        //         }
                    
                        //         h2
                        //         {
                        //             margin-bottom: 50px;
                        //         }
                    
                        //     </style>
                        // </head>
                        // <body>
                        //     <div class="contenido">
                        //         <div>
                        //             <div>
                        //                 <h2 style="color: #7D7D7D;">'.$nombre_apellido.'</h2>    
                        //                 <h2 style="color: #7D7D7D;">'.$mail_cliente.'</h2> 
                        //                 <h2 style="color: #7D7D7D;">'.$planta.'</h2>             
                        //             </div>
                        //             <a style="color: #ffffff;" href="http://viewingmanagement.com/aprobar-usuario.php?mail='.$mail_cliente.'&hash='.$hash.'">Activar cuenta</a>                 
                        //         </div>
                        //     </div>
                        // </body>';
                        // if(!$mail->send())
                        // {
                        //     echo 'error';
                        // }
                        // else
                        // {
                        //     echo '1';   
                        // } 
                    }
                }
                else
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Las contraseñas no son iguales'
                    );
                }
            }

        }
        else
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'error2'
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>