import React, { useEffect } from 'react'
import { UilSetting, UilTruckLoading, UilShoppingCartAlt } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/menu.css'
import BtnCerrarSesion from '../components/BtnCerrarSesion/BtnCerrarSesion'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const Menu = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        { 
            navigate('/')
        }
        else if(cookies.get('id_recepcion'))
        {
            navigate('/opciones-recepcion')
        }
    })

    if(idsession)
        return(
            <article>
                <nav className="animacion-1">
                    <BtnCerrarSesion color="#252A34"/>
                    <h1>Menu</h1>
                    <button type="button" className="btn-nav-menu">
                        <UilSetting size="32" color="white"/>
                    </button>
                </nav>
                <main className="container-menu-options">
                    <Link to="/recepcion"> 
                        <button type="button" className="btn-menu animacion-2">
                            <UilTruckLoading size="50" color="#252A34"/><br/>
                            <label>Recepcion</label>
                        </button>
                    </Link>
                    <Link to="/preparacion">
                        <button type="button" className="btn-menu animacion-3">
                            <UilShoppingCartAlt  size="50" color="#252A34"/><br/>
                            <label>Preparacion</label>
                        </button>
                    </Link>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Menu