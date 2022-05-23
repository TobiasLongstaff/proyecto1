import React,{ useEffect, useState } from 'react'
import NavDesktop from '../components/NavegacionDesktop/NavDesktop'
import { useParams } from "react-router-dom";
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const ProductosPedidos = () =>
{
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    let { id_pedido }  = useParams()

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

    if(autenticacion.autenticado)
        return(
            <article>
                <NavDesktop titulo="Productos del Pedido"/>
                <main className="container-page-web">
                    <div className="tbl-header-web">
                        <table>
                            <thead>
                                <tr className="tr-head-web">
                                    <th className="th-cod">Codigo</th>
                                    <th className="th-cant-web">Cantidad</th>
                                    <th>Descripcion</th>
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
    return(
        <Loading/>
    )
}

export default ProductosPedidos