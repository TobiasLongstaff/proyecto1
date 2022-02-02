<?php
    require 'conexion.php';

    /**
    * @version 1.0
    */

    require 'class.phpmailer.php';
    require 'class.smtp.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));

        if($datos != null)
        {
            $mail_usuario = $datos->mail;
            $hash = $datos->hash;
            $permisos = $datos->permisos;

            $nombre = 'parcelpicker.com.ar';
        
            // Datos de la cuenta de correo utilizada para enviar vía SMTP
            $smtpHost = "vps-2307367-x.dattaweb.com";  // Dominio alternativo brindado en el email de alta 
            $smtpUsuario = "no-reply@parcelpicker.com.ar";  // Mi cuenta de correo
            $smtpClave = "ZZAOaOqawx";  // Mi contraseña
    
            $sql="UPDATE usuarios SET tipo = '$permisos' WHERE mail = '$mail_usuario' AND hash = '$hash'";
            $resultado = mysqli_query($conexion,$sql);
            if(!$resultado)
            {
                echo 'error';
            }
            else
            {
                $sql = "SELECT id FROM usuarios WHERE mail = '$mail_usuario'";
                $resultado = mysqli_query($conexion, $sql);
                if($filas = mysqli_fetch_array($resultado))
                {   
                    $mail = new PHPMailer();
                    $mail->IsSMTP();
                    $mail->SMTPAuth = true;
                    $mail->Port = 465; 
                    $mail->SMTPSecure = 'ssl';
                    $mail->IsHTML(true); 
                
                
                    // VALORES A MODIFICAR //
                    $mail->Host = $smtpHost; 
                    $mail->Username = $smtpUsuario; 
                    $mail->Password = $smtpClave;
                
                    $mail->From = $smtpUsuario;
                    $mail->FromName = $nombre;
                    $mail->AddAddress($mail_usuario);
                
                    $mail->Subject = "Tu cuenta de '.$nombre.' ha sido aprobada "; // Este es el titulo del email.
                    $mail->Body = '
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style type="text/css">
                            body
                            {
                                margin: 0;
                                padding: 0;
                                background-color: #ffffff;
                            }
                
                            table
                            {
                                border-spacing: 0;
                            }
                
                            td
                            {
                                padding: 0;
                            }
                
                            .contenido
                            {
                                width: 100%;
                                padding-bottom: 40px;
                                display: flex;
                                justify-content: center;
                                margin-top: 2%;
                            }
                
                            a
                            {
                                color: #ffffff;
                                background-color: #00C3E3;
                                border-radius: 5px;
                                padding: 20px;
                                font-size: 25px;
                                text-decoration: none;
                            }
                
                
                            h1
                            {
                                color: #00C3E3;
                            }
                
                            h2
                            {
                                margin-bottom: 50px;
                            }
                
                        </style>
                    </head>
                    <body>
                        <div class="contenido">
                            <div>
                                <div>
                                    <h1>¡Hola!</h1>
                                    <h2 style="color: #252A34;">Su cuenta ya se encuentra habilitada para realizar operaciones dentro del sistema.<br>
                                    En caso de inconvenientes contactar son soporte tecnico.</h2>                 
                                </div>
                                <a style="color: #ffffff;" href="https://parcelpicker.com.ar/">Iniciar sesión</a>               
                            </div>
                        </div>
                    </body>';
                    
                    if(!$mail->send())
                    {
                        $json[] = array(
                            'error' => '1',
                            'mensaje' => 'Mail no enviado',
                        );  
                    }
                    else
                    {
                        $json[] = array(
                            'error' => '0',
                            'mensaje' => 'Usuario aprobado correctamente',
                        );  
                    }
                }
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    mysqli_close($conexion);
?>