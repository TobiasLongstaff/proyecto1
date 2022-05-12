<?php
    require 'conexion.php';

    /**
    * @version 1.0
    */

    require 'class.phpmailer.php';
    require 'class.smtp.php';

    // crear cuenta
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

            // Datos de la cuenta de correo utilizada para enviar vía SMTP
            $smtpHost = "vps-2307367-x.dattaweb.com";  // Dominio alternativo brindado en el email de alta 
            $smtpUsuario = "no-reply@parcelpicker.com.ar";  // Mi cuenta de correo
            $smtpClave = "ZZAOaOqawx";  // Mi contraseña

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
                        $mail = new PHPMailer();
                        $mail->IsSMTP();
                        $mail->SMTPAuth = true;
                        $mail->Port = 465; 
                        $mail->SMTPSecure = 'ssl';
                        $mail->IsHTML(true); 
                        // $mail->SMTPDebug  = 2;
                    
                    
                        // VALORES A MODIFICAR //
                        $mail->Host = $smtpHost; 
                        $mail->Username = $smtpUsuario; 
                        $mail->Password = $smtpClave;
                    
                        $mail->From = $smtpUsuario;
                        $mail->FromName = 'parcelpicker.com.ar';
                        $mail->AddAddress($mail_cliente);
                    
                        $mail->Subject = "Tu cuenta de parcelpicker.com.ar se encuentra a espera de aprobación"; // Este es el titulo del email.
                        $mail->Body = '
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                            <style type="text/css">
                                body
                                {
                                    margin: 0;
                                    padding: 0;
                                    background-color: #F3F5F9;
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
                                    color: #F3F5F9;
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
                                        <h2 style="color: #252A34;">Su cuenta se encuentra en espera de aprobación, espere a que comprobemos todos los <br>
                                            datos para dar de alta su cuenta, una vez esté aprobada llegara un mail <br>
                                            de aviso. Gracias por utilizar parcelpicker.com.ar<br>
                                            En caso de inconvenientes contactar con soporte técnico.</h2>              
                                    </div>               
                                </div>
                            </div>
                        </body>';
                        if(!$mail->send())
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error mail 1'
                            );
                        }
                        
                        $mail = new PHPMailer();
                        $mail->IsSMTP();
                        $mail->SMTPAuth = true;
                        $mail->Port = 465; 
                        $mail->SMTPSecure = 'ssl';
                        $mail->IsHTML(true); 
                        // $mail->SMTPDebug  = 2;
                    
                    
                        // VALORES A MODIFICAR //
                        $mail->Host = $smtpHost; 
                        $mail->Username = $smtpUsuario; 
                        $mail->Password = $smtpClave;
                    
                        $mail->From = $smtpUsuario;
                        $mail->FromName = 'parcelpicker.com.ar';
                        $mail->AddAddress($smtpUsuario);
                    
                        $mail->Subject = "Nueva cuenta de parcelpicker.com.ar"; // Este es el titulo del email.
                        $mail->Body = '
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                            <style type="text/css">
                                body
                                {
                                    margin: 0;
                                    padding: 0;
                                    background-color: #F3F5F9;
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
                                    color: #F3F5F9;
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
                                        <h2 style="color: #252A34;">'.$nombre_apellido.'</h2>    
                                        <h2 style="color: #252A34;">'.$mail_cliente.'</h2>           
                                    </div>
                                    <a style="color: #ffffff;" href="https://parcelpicker.com.ar/aprobar-usuario/'.$mail_cliente.'/'.$hash.'/'.$nombre_apellido.'">Activar cuenta</a>                 
                                </div>
                            </div>
                        </body>';
                        if(!$mail->send())
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error mail 2'
                            );
                        }
                        $json[] = array(
                            'error' => '0',
                            'mensaje' => 'Cuenta creada'
                        );
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
    mysqli_close($conexion);
?>