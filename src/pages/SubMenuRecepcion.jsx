import React from 'react'
import { UilTruckLoading, UilBox } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import '../styles/menu.css'
import BtnCerrarSesion from '../components/BtnCerrarSesion/BtnCerrarSesion'
import Loading from '../components/Loading/Loading'
import { useAutenticacion } from '../hooks/useAutenticacion'

const SubMenuRecepcion = () =>
{
    const { autenticacion } = useAutenticacion()

    if(autenticacion.autenticado)
        return(
            <article>
                <nav className="animacion-1">
                    <BtnCerrarSesion color="#252A34"/>
                    <h1>Opciones</h1>
                    <button type="button" className="btn-nav-menu">
                        {/* <UilSetting size="32" color="#252A34"/> */}
                    </button>
                </nav>
                <main className="container-menu-options">
                    <Link to="/pallets"> 
                        <button type="button" className="btn-menu animacion-2">
                            <UilTruckLoading size="50" color="#252A34"/><br/>
                            <label>Cargar Pallets</label>
                        </button>
                    </Link>
                    <Link to="/cajas">
                        <button type="button" className="btn-menu animacion-3">
                            <UilBox size="50" color="#252A34"/><br/>
                            <label>Cargar Cajas</label>
                        </button>
                    </Link>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default SubMenuRecepcion