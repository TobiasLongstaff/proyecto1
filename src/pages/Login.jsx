import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import '../styles/login.css'
import Cookies from 'universal-cookie'
import url from '../services/Settings'

const cookies = new Cookies()

const Login = ({history}) =>
{
    const [ form, setForm ] = useState({mail: '', password: ''})

    useEffect(() => 
    {
        // if(cookies.get('IdSession') != null)
        // { 
        //     history.push('/menu')
        // }
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
            console.log(infoPost)
            if(infoPost.id != null)
            {
                cookies.set('IdSession', infoPost.id, {path: '/'})
                cookies.set('nombre', infoPost.nombre, {path: '/'})
                cookies.set('mail', form.mail, {path: '/'})
                cookies.set('tipo', infoPost.tipo, {path: '/'})
            }
            else
            {
                console.error('error')
            }
        }
        catch(error)
        {
            console.error(error)
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