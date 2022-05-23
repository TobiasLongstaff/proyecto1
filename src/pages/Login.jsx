import React, {useState, useEffect} from "react";
import { Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import Cookies from 'universal-cookie'
import url from '../services/Settings'

const cookies = new Cookies()

const Login = () =>
{
    let navigate = useNavigate()
    const [ MensajeError, setError ] = useState(null) 
    const [ form, setForm ] = useState({mail: '', password: ''})

    useEffect(() => 
    {
        if(cookies.get('hashSession'))
        { 
            navigate('/menu')
        }
    })

    const handelSubmit = async e =>
    {
        e.preventDefault()
        try
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url+'login.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                cookies.set('hashSession', infoPost[0].hash, {path: '/'})
                cookies.set('nombre', infoPost[0].nombre, {path: '/'})
                cookies.set('mail', form.mail, {path: '/'})
                navigate('/menu')
            }
            else
            {
                setError(infoPost[0].mensaje)
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error al iniciar sesion intentar mas tarde')
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    return(
        <article className="container-login">
            <div className="container-info-login">
                <header className="header-login animacion-1">
                    <h1>Iniciar sesión</h1>
                </header>
                <main>
                    <form className="menu-login" onSubmit={handelSubmit}>
                        <input type="email" placeholder="E-mail" name="mail" onChange={handelChange} value={form.mail} className="textbox-genegal animacion-2" required />
                        <input type="password" placeholder="Contraseña" name="password" onChange={handelChange} value={form.password} className="textbox-genegal animacion-2" required/>
                        <label>{MensajeError}</label>
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