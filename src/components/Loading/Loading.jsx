import React from 'react'
import '../Loading/loading.css'
import { Link } from 'react-router-dom'

const Loading = ({error, childClick}) =>
{
    if(error === true )
        return(
            <article className="container-error-conexion">
                <div className="container-info-error-conexion">
                    <h2>
                        Conéctate a internet
                    </h2>
                    <label>
                        La conexión de internet es demasiado débil o 
                        el tiempo de respuesta fue muy largo. 
                        Volver a intentar.
                    </label>
                    <button type="button" onClick={()=>childClick()} className="btn-reintentar-conexion btn-general-login">Reintentar</button>                    
                    <Link to="/menu">
                        <button type="button" className="btn-registrarse btn-general-login">Volver</button>
                    </Link>
                </div>
            </article>
        )
    return(
        <article className="container-loader">
            <div className="loader">Loading...</div>
        </article>
    )
}

export default Loading