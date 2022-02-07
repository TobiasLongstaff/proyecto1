import React,{ useEffect, useState } from 'react'
import NavDesktop from '../components/NavegacionDesktop/NavDesktop'
import { useNavigate, useParams } from "react-router-dom";
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import { UilExclamationCircle } from '@iconscout/react-unicons'

const cookies = new Cookies()

const ProductosPreparados = () =>
{
    const [data, setData] = useState([])
    let navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    let { id_pedido }  = useParams()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            fetchResource()
        }
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

    return(
        <article>
            <NavDesktop titulo="Productos Preparados"/>
            <main className="container-page-web">
                <div className="tbl-header-web">
                    <table>
                        <thead>
                            <tr className="tr-head-web">
                                <th className="th-cod">Codigo</th>
                                <th className="th-cant-web">Cantidad</th>
                                <th>Descripcion</th>
                                <th className="th-estado">Estado</th>
                                <th className="th-cont">Controles</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content-web">
                    <table>
                        <tbody>
                            { loading ? (
                                <tr className="tr-load">
                                    <td><div className="loader">Loading...</div></td>
                                </tr>
                                ): (
                                    data.map((fila) =>
                                    (
                                        <tr key={fila.id} className="tr-web">
                                            <td className="td-cod">{fila.codigo}</td>
                                            <td className="td-cant-web">{fila.cantidad}</td>
                                            <td className="text-tabla-desc"><p>{fila.descripcion}</p></td>
                                            <td className="td-estado"><UilExclamationCircle size="25" color="red"/></td>
                                            <td className="td-cont">
                                                <button className="btn-tabla-productos">
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </article>
    )
}

export default ProductosPreparados