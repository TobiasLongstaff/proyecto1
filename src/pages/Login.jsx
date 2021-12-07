import React from "react";
import { Link } from 'react-router-dom'
import '../styles/login.css'

const Login = () =>
{
    return(
        <article className="container-login">
            <header className="header-login">
                <h1>Iniciar sesión</h1>
            </header>
            <main className="menu-login">
                <input type="text" placeholder="E-mail" className="textbox-genegal"/>
                <input type="password" placeholder="Contraseña" className="textbox-genegal"/>
                <div className="container-btn">
                    <button type="submit" className="btn-login btn-general-login">Iniciar sesión</button>
                    <Link to="/registrarse">
                        <button type="button" className="btn-registrarse btn-general-login">Crear cuenta</button>
                    </Link>                    
                </div>
            </main>                
        </article>        
    )
}

export default Login