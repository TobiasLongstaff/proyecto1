import React, { useEffect, useState } from 'react'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'
import Cookies from 'universal-cookie'
import url from '../services/Settings'

const cookies = new Cookies()

const Stock = () =>
{
    const [ loading, setLoading ] = useState(true)
    const [cajas, setCajas] = useState([])
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

    return(
        <article>
            <NavDektop titulo="Preparados"/>
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
}

export default Stock