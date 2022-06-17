import React from 'react'
import { Link } from 'react-router-dom'
import { UilTruckLoading, UilBox, UilShoppingCartAlt, UilQrcodeScan, UilRedo } from '@iconscout/react-unicons'
import NavDektop from '../NavegacionDesktop/NavDesktop'

const MenuMovil = () =>
{
    return(
        <article>
            <NavDektop titulo="Menu"/>
            <main className="container-menu-options">
                <Link to="/opciones-recepcion">
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
                <Link to="/devolucion">
                    <button type="button" className="btn-menu animacion-3">
                        <UilRedo size="50" color="#252A34"/><br/>
                        <label>Devolucion</label>
                    </button>
                </Link>
                <Link to="/asociar-pedido">
                    <button type="button" className="btn-menu animacion-3">
                        <UilQrcodeScan size="50" color="#252A34"/><br/>
                        <label>Asociar codigo</label>
                    </button>
                </Link>
            </main>
        </article>
    )
}

export default MenuMovil