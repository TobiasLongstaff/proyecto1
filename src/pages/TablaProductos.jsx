import React,{ useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import BtnVolver from '../components/BtnVolver/BtnVolver';
import Loading from '../components/Loading/Loading'
import { UilAngleRight } from '@iconscout/react-unicons'

const cookies = new Cookies()

const TablaProductos = () =>
{
    let navigate = useNavigate()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    let id_pedido = cookies.get('id_pedido')

    useEffect(() => 
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-productos-pedidos.php?id='+id_pedido)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelClick = (id_producto) =>
    {
        cookies.set('id_producto', id_producto, {path: '/'})
        navigate('/productos')
    }

    if(!loading)
        return(
            <article>
                <Nav titulo="Tabla Productos"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="text-usuario animacion-1">Usuario: {cookies.get('nombre')}</label>
                        <label className="animacion-2">Productos Del Pedido:</label>
                        <div className="animacion-1">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Cant</th>
                                            <th>Descrip</th>
                                            <th className="td-btn">Controles</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tbl-content">
                                <table>
                                    <tbody>
                                        {data.map((fila) =>
                                        (
                                            <tr key={fila.id}>
                                                <td>{fila.cantidad}</td>
                                                <td>{fila.descripcion}</td>
                                                <td className="td-btn">
                                                    <button type="button" className="btn-table-seleccionar" onClick={() =>handelClick(fila.id_producto)}>
                                                        <UilAngleRight size="20" color="white"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <footer className="container-controles">
                            <BtnVolver volver="/preparacion"/>
                            <Link to="/preparar-productos">
                                <button type="button" className="btn-continuar btn-controles animacion-3">
                                    <UilAngleRight size="80" color="white"/>
                                </button> 
                            </Link>
                        </footer> 
                    </div>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default TablaProductos