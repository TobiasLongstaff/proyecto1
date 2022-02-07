import React,{ useEffect, useState } from 'react'
import NavDesktop from '../components/NavegacionDesktop/NavDesktop'
import { useNavigate } from "react-router-dom";
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import { UilExclamationCircle } from '@iconscout/react-unicons'

const cookies = new Cookies()

const Configuracion = () =>
{

    const [data, setData] = useState([])
    let navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const idsession = cookies.get('IdSession')
    const key = 'c52f1bd66cc19d05628bd8bf27af3ad6'

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
            let res = await fetch(url+'obtener-usuarios.php?key='+key)
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
            <NavDesktop titulo="Configuracion"/>
            <main className="container-page-web">
                <div className="tbl-header-web">
                    <table>
                        <thead>
                            <tr className="tr-head-web">
                                <th className="th-cod">#</th>
                                <th>Nombre y Apellido</th>
                                <th>E-Mail</th>
                                <th>Permisos</th>
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
                                            <td className="td-cod">{fila.id}</td>
                                            <td><p>{fila.nombre}</p></td>
                                            <td><p>{fila.mail}</p></td>
                                            <td>{fila.permisos}</td>
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

export default Configuracion