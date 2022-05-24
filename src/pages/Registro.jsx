import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

const Registro = () =>
{
    const [ formRegistro, setFormRegistro ] = useState({nombre_apellido: '', mail: '', password: '', password_con: ''}) 
    const { registro, error } = useUser()
    const handelSubmit = e =>
    {
        e.preventDefault();
        registro(formRegistro)
        setFormRegistro({nombre_apellido: '', mail: '', password: '', password_con: ''})
    }

    const handelChange = e =>
    {
        setFormRegistro(
        {
            ...formRegistro,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article className="container-registro">
            <div className="container-info-login">
                <header className="header-registro animacion-1">
                    <h1>Registro</h1>
                </header>
                <main>
                    <form onSubmit={handelSubmit} className="menu-registro">
                        <input type="text" placeholder="Nombre y Apellido" name="nombre_apellido" onChange={handelChange} className="textbox-genegal animacion-2" value={formRegistro.nombre_apellido} required/>
                        <input type="mail" placeholder="E-mail" name="mail" onChange={handelChange} className="textbox-genegal animacion-2" value={formRegistro.mail} required/>
                        <input type="password" placeholder="Contraseña" name="password" onChange={handelChange} className="textbox-genegal animacion-2" value={formRegistro.password} required/>
                        <input type="password" placeholder="Confirmar Contraseña" name="password_con" onChange={handelChange} className="textbox-genegal animacion-2" value={formRegistro.password_con} required/>
                        <label>{error}</label>
                        <div className="container-btn animacion-3">
                            <button type="submit" className="btn-registro btn-general-registro">Crear cuenta</button>
                            <Link to="/">
                                <button type="button" className="btn-volver-registro btn-general-registro">Volver</button>
                            </Link>                    
                        </div>
                    </form>
                </main>                  
            </div>
        </article> 
    )
}

export default Registro