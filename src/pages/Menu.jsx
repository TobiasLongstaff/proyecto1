import React, { useEffect } from 'react'
import { UilTruckLoading, UilShoppingCartAlt, UilPackage, UilBox, UilQrcodeScan, UilRedo } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/menu.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'

const cookies = new Cookies()

const Menu = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const tipo = cookies.get('tipo')

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
    {
        if(tipo == 'admin' || tipo == 'estandar')
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
        else
        {
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
        }
    }
    else
    {
        return(
            <Loading/>
        )
    }
}

export default Menu