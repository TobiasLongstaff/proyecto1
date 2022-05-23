import React,{ useEffect, useState } from 'react'
import NavDesktop from '../components/NavegacionDesktop/NavDesktop'
import { useParams } from "react-router-dom";
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const ProductosPreparados = () =>
{
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [dataIngresado, setDataIngresado] = useState([])
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

            let resIngresado = await fetch(url+'obtener-productos-pedidos-ingresados.php?id='+id_pedido)
            let datosIngresado = await resIngresado.json()
            if(typeof datos !== 'undefined' && typeof datosIngresado !== 'undefined')
            {
                setData(datos)
                setDataIngresado(datosIngresado)
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
                <NavDesktop titulo="Productos Preparados"/>
                <main className="container-page-web-productos-preparados">
                    <div>
                        <label>Productos del pedido: </label>
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
                                                <tr key={fila.codigo} className="tr-web">
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
                    </div>
                    <div>
                        <label>Productos Ingresados: </label>
                        <div className="tbl-header-web">
                            <table>
                                <thead>
                                    <tr className="tr-head-web">
                                        <th className="th-cod">Codigo</th>
                                        <th className="th-cant-web">Peso</th>
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
                                            dataIngresado.map((fila_ingresdo) =>
                                            (
                                                <tr key={fila_ingresdo.id} className="tr-web">
                                                    <td className="td-cod">{fila_ingresdo.codigo}</td>
                                                    <td className="td-cant-web">{fila_ingresdo.peso}</td>
                                                    <td className="text-tabla-desc"><p>{fila_ingresdo.descripcion}</p></td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>                    
                    </div>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default ProductosPreparados