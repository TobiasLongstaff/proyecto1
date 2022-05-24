import React from 'react'
import { Link } from 'react-router-dom'
import { UilTruckLoading, UilPackage, UilBox } from '@iconscout/react-unicons'
import NavDektop from '../NavegacionDesktop/NavDesktop'

const MenuDescktop = () =>
{
    return(
        <article>
            <NavDektop titulo="Menu"/>
            <main className="container-menu-options-web">
                <Link to="/pedidos" className="link-menu"> 
                    <button type="button" className="btn-menu-web animacion-2">
                        <UilTruckLoading size="50" color="#252A34"/><br/>
                        <label>Pedidos</label>
                    </button>
                </Link>
                <Link to="/preparados" className="link-menu"> 
                    <button type="button" className="btn-menu-web animacion-2">
                        <UilPackage size="50" color="#252A34"/><br/>
                        <label>Preparados</label>
                    </button>
                </Link>
                <Link to="/stock" className="link-menu"> 
                    <button type="button" className="btn-menu-web animacion-2">
                        <UilBox size="50" color="#252A34"/><br/>
                        <label>Stock</label>
                    </button>
                </Link>
            </main>
        </article>
    )
}

export default MenuDescktop