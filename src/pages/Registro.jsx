import React from "react"
import { Link } from 'react-router-dom'

const Registro = ({history}) =>
{
    return(
        <article className="container-registro">
            <header className="header-registro">
                <h1>Registro</h1>
            </header>
            <main className="menu-registro">
                <input type="text" placeholder="Nombre y Apellido" className="textbox-genegal"/>
                <input type="text" placeholder="E-mail" className="textbox-genegal"/>
                <input type="password" placeholder="Contraseña" className="textbox-genegal"/>
                <input type="password" placeholder="Confirmar Contraseña" className="textbox-genegal"/>
                <div className="container-btn">
                    <button type="submit" className="btn-registro btn-general-registro">Crear cuenta</button>
                    <Link to="/">
                        <button type="button" className="btn-volver-registro btn-general-registro">Volver</button>
                    </Link>                    
                </div>
            </main>                
        </article> 
    )
}

export default Registro