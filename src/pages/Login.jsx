import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../styles/login.css'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useUser } from '../hooks/useUser'

const Login = () =>
{
    const { autenticacion } = useAutenticacion()
    const { login, error } = useUser()
    const [ form, setForm ] = useState({ mail: '', password: '' })

    const handelSubmit = async e =>
    {
        e.preventDefault()
        login(form)
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article className="container-login">
            <div className="container-info-login">
                <header className="header-login animacion-1">
                    <h1>Iniciar sesión</h1>
                </header>
                <main>
                    <form className="menu-login" onSubmit={handelSubmit}>
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            name="mail" 
                            onChange={handelChange} 
                            value={form.mail} 
                            className="textbox-genegal animacion-2" 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            name="password" 
                            onChange={handelChange} 
                            value={form.password} 
                            className="textbox-genegal animacion-2" 
                            required
                        />
                        <label>{error}</label>
                        <div className="container-btn animacion-3">
                            <button type="submit" className="btn-login btn-general-login">Iniciar sesión</button>
                            <Link to="/registrarse">
                                <button type="button" className="btn-registrarse btn-general-login">Crear cuenta</button>
                            </Link>                    
                        </div>
                    </form>
                </main>
            </div>
        </article>        
    )
}

export default Login