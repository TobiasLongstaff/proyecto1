import React from 'react'
import { UilSignout, UilSetting, UilTruckLoading, UilBox} from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import '../styles/menu.css'

const Menu = () =>
{
    return(
        <article>
            <nav>
                <button type="button" className="btn-nav-menu">
                    <UilSignout size="32" color="#252A34"/>
                </button>
                <h1>Menu</h1>
                <button type="button" className="btn-nav-menu">
                    <UilSetting size="32" color="#252A34"/>
                </button>
            </nav>
            <main className="container-menu-options">
                <Link to="/recepcion"> 
                    <button type="button" className="btn-menu">
                        <UilTruckLoading size="50" color="#252A34"/><br/>
                        <label>Recepcion</label>
                    </button>
                </Link>
                <button type="button" className="btn-menu">
                    <UilBox size="50" color="#252A34"/><br/>
                    <label>Preparacion</label>
                </button>
            </main>
        </article>
    )
}

export default Menu