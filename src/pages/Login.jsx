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
        if(cookies.get('IdSession'))
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
            if(infoPost[0].id != null)
            {
                cookies.set('IdSession', infoPost[0].id, {path: '/'})
                cookies.set('nombre', infoPost[0].nombre, {path: '/'})
                cookies.set('mail', form.mail, {path: '/'})
                cookies.set('tipo', infoPost[0].tipo, {path: '/'})
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
            <header className="header-login">
                <h1>Iniciar sesión</h1>
            </header>
            <main>
                <form className="menu-login" onSubmit={handelSubmit}>
                    <input type="email" placeholder="E-mail" name="mail" onChange={handelChange} value={form.mail} className="textbox-genegal" required />
                    <input type="password" placeholder="Contraseña" name="password" onChange={handelChange} value={form.password} className="textbox-genegal" required/>
                    <label>{MensajeError}</label>
                    <div className="container-btn">
                        <button type="submit" className="btn-login btn-general-login">Iniciar sesión</button>
                        <Link to="/registrarse">
                            <button type="button" className="btn-registrarse btn-general-login">Crear cuenta</button>
                        </Link>                    
                    </div>
                </form>
            </main>                
        </article>        
    )
}

export default Login