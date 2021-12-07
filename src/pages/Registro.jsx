import React, {useState} from "react"
import { Link } from 'react-router-dom'
import url from '../services/Settings'

const Registro = ({history}) =>
{
    const [ form, setForm ] = useState({nombre_apellido: '', mail: '', password: '', password_con: ''}) 

    const handelSubmit = async e =>
    {
        e.preventDefault();
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
            let res = await fetch(url+'crear-cuenta.php', config)
            let infoPost = await res.json()
            console.log(infoPost)
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
        <article className="container-registro">
            <header className="header-registro">
                <h1>Registro</h1>
            </header>
            <main>
                <form onSubmit={handelSubmit} className="menu-registro">
                    <input type="text" placeholder="Nombre y Apellido" name="nombre_apellido" onChange={handelChange} className="textbox-genegal" value={form.nombre_apellido} required/>
                    <input type="mail" placeholder="E-mail" name="mail" onChange={handelChange} className="textbox-genegal" value={form.mail} required/>
                    <input type="password" placeholder="Contraseña" name="password" onChange={handelChange} className="textbox-genegal" value={form.password} required/>
                    <input type="password" placeholder="Confirmar Contraseña" name="password_con" onChange={handelChange} className="textbox-genegal" value={form.password_con} required/>
                    <div className="container-btn">
                        <button type="submit" className="btn-registro btn-general-registro">Crear cuenta</button>
                        <Link to="/">
                            <button type="button" className="btn-volver-registro btn-general-registro">Volver</button>
                        </Link>                    
                    </div>
                </form>
            </main>                
        </article> 
    )
}

export default Registro