import React, { useEffect, useState } from 'react'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'
import { UilEye } from '@iconscout/react-unicons'
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const Stock = () =>
{
    const { autenticacion } = useAutenticacion()
    const [ loading, setLoading ] = useState(true)
    const [ loading_pro, setLoading_pro ] = useState(true)
    const [ cajas, setCajas ] = useState([])
    const [ productos, setProductos ] = useState([])

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-cajas.php')
            let cajas = await res.json()
            if(typeof cajas !== 'undefined')
            {
                setCajas(cajas)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerProducto = async (codigo) =>
    {
        let res_product = await fetch(url+'obtener-productos-por-cajas.php?codigo='+codigo)
        let productos = await res_product.json()
        if(typeof cajas !== 'undefined')
        {
            setProductos(productos)
            setLoading_pro(false)
        }
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <NavDektop titulo="Stock"/>
                <main className="container-page-web-productos-preparados">
                    <div>
                        <label>Cajas: </label>
                        <div className="tbl-header-web">
                            <table>
                                <thead>
                                    <tr className="tr-head-web">
                                        <th className="th-cod">Codigo</th>
                                        <th className="th-cant-web">Cantidad</th>
                                        <th>Descripcion</th>
                                        <th>Kilos</th>
                                        <th>Vencimiento</th>
                                        <th className="th-controles">Controles</th>
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
                                            cajas.map((fila) =>
                                            (
                                                <tr key={fila.codigo} className="tr-web">
                                                    <td className="td-cod">{fila.codigo}</td>
                                                    <td className="td-cant-web">{fila.cantidad}</td>
                                                    <td className="text-tabla-desc"><p>{fila.descripcion}</p></td>
                                                    <td><p>{fila.kilos}</p></td>
                                                    <td><p>{fila.vencimiento}</p></td>
                                                    <td className="td-controles">
                                                        <button type="button" onClick={()=>obtenerProducto(fila.codigo)} className="btn-tabla-productos">
                                                            <UilEye color="white"/>
                                                        </button>
                                                    </td>
                                                </tr>                                                
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>                    
                    </div>
                    <div>
                        <label>Productos: </label>
                        <div className="tbl-header-web">
                            <table>
                                <thead>
                                    <tr className="tr-head-web">
                                        <th className="th-cod">Codigo</th>
                                        <th>Kilos</th>
                                        <th>Vencimiento</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content-web">
                            <table>
                                <tbody>
                                    { loading_pro ? (
                                        <tr className="tr-load">
                                            <td><div className="loader">Loading...</div></td>
                                        </tr>
                                        ): (
                                            productos.map((fila) =>
                                            (
                                                <tr key={fila.codigo} className="tr-web">
                                                    <td className="td-cod">{fila.codigo}</td>
                                                    <td><p>{fila.kilos}</p></td>
                                                    <td><p>{fila.vencimiento}</p></td>
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

export default Stock