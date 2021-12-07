import React from 'react'
import { UilSignout } from '@iconscout/react-unicons'
import '../Navegacion/nav.css'

const Nav = ({titulo}) =>
{
    return(
        <header className="nav-app">
            <nav>
                <button type="button" className="btn-nav-menu">
                    <UilSignout size="32" color="white"/>
                </button>
                <div className="container-titulo">
                    <h1>{titulo}</h1>
                </div>
            </nav>
        </header>
    )
}

export default Nav