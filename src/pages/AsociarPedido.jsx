import React, { useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const AsociarPedido = () =>
{
    let navigate = useNavigate()
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-pedidos-preparados.php?codigo_or=1')
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelClick = (id_pedido) =>
    {
        cookies.set('id_pedido', id_pedido, {path: '/'})
        navigate('/asociar-codigo')
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Asociar Pedido"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="animacion-2">Pedidos Preparados:</label>
                        <div className="animacion-1">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="th-num">#</th>
                                            <th className="th-id">ID</th>
                                            <th className="th-desc">Cliente</th>
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
                                                <button type="button" className="btn-table-seleccionar" onClick={() =>handelClick(fila.id)}>
                                                    <td className="td-id">{fila.num_pedido}</td>
                                                    <td className="td-id">{fila.id_pedido}</td>
                                                    <td className="td-desc">
                                                        <p className="text-btn-tabla">{fila.cliente}</p>
                                                    </td>
                                                </button>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <footer className="container-controles">
                            <BtnVolver volver="/menu"/>
                        </footer> 
                    </div>
                </main>                    
            </article>
        )
    return(
        <Loading/>
    )
}

export default AsociarPedido