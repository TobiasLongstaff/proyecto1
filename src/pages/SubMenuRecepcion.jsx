import React, { useEffect } from 'react'
import { UilSetting, UilTruckLoading, UilBox } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/menu.css'
import BtnCerrarSesion from '../components/BtnCerrarSesion/BtnCerrarSesion'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const SubMenuRecepcion = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        { 
            navigate('/')
        }
    })

    if(idsession)
        return(
            <article>
                <nav>
                    <BtnCerrarSesion color="#252A34"/>
                    <h1>Opciones</h1>
                    <button type="button" className="btn-nav-menu">
                        {/* <UilSetting size="32" color="#252A34"/> */}
                    </button>
                </nav>
                <main className="container-menu-options">
                    <Link to="/pallets"> 
                        <button type="button" className="btn-menu">
                            <UilTruckLoading size="50" color="#252A34"/><br/>
                            <label>Cargar Pallets</label>
                        </button>
                    </Link>
                    <Link to="/cajas">
                        <button type="button" className="btn-menu">
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