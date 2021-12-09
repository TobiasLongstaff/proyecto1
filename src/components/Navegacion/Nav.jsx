import React from 'react'
import { UilSignout } from '@iconscout/react-unicons'
import '../Navegacion/nav.css'
import BtnCerrarSesion from '../BtnCerrarSesion/BtnCerrarSesion'

const Nav = ({titulo}) =>
{
    return(
        <header className="nav-app">
            <nav>
                <BtnCerrarSesion color="white" />
                <div className="container-titulo">
                    <h1>{titulo}</h1>
                </div>
            </nav>
        </header>
    )
}

export default Nav