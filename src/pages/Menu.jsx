import React from 'react'
import { UilTruckLoading, UilShoppingCartAlt, UilPackage, UilBox, UilQrcodeScan, UilRedo } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import '../styles/menu.css'
import Loading from '../components/Loading/Loading'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'
import {useAutenticacion} from '../hooks/useAutenticacion'

const Menu = () =>
{
    const { autenticacion } = useAutenticacion()

    if(autenticacion.autenticado)
        if(autenticacion.tipo == 'admin' || autenticacion.tipo == 'estandar')
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
        return(
            <article>
                <NavDektop titulo="Menu"/>
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
                    <Link to="/cajas-faltantes">
                        <button type="button" className="btn-menu animacion-3">
                            <UilBox size="50" color="#252A34"/><br/>
                            <label>Cargar Cajas faltantes</label>
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