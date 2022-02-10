import React, { useEffect, useState } from 'react'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import { UilExclamationCircle, UilPackage, UilPrint } from '@iconscout/react-unicons'
import pdf from "@react-pdf/renderer";
const { PDFViewer } = pdf;

const cookies = new Cookies()

const Preparados = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)

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
            let res = await fetch(url+'obtener-pedidos-preparados.php')
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

    const imprimir = (id_pedido) =>
    {
        var ventana = window.open('http://localhost:3000/etiqueta/'+id_pedido, 'PRINT', 'height=600,width=1000');;
        ventana.document.close();
        ventana.focus();
        ventana.onload = setTimeout(function() 
        {
            ventana.print();
        }, 2000)
    }

    return(
        <article>
            <NavDektop titulo="Preparados"/>
            <main className="container-page-web">
                <div className="tbl-header-web">
                    <table>
                        <thead>
                            <tr className="tr-head-web">
                                <th className="th-cant-web">#</th>
                                <th className="th-cant-web">ID</th>
                                <th>Cliente</th>
                                <th>Direccion</th>
                                <th>Ciudad</th>
                                <th className="th-estado">Estado</th>
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
                                    data.map((fila) =>
                                    (
                                        <tr key={fila.id} className="tr-web">
                                            <td className="td-cant-web">{fila.num_pedido}</td>
                                            <td className="td-cant-web">{fila.id_pedido}</td>
                                            <td className="text-tabla-desc"><p>{fila.cliente}</p></td>
                                            <td className="text-tabla-desc"><p>{fila.direccion}</p></td>
                                            <td>{fila.ciudad}</td>
                                            <td className="td-estado"><UilExclamationCircle size="25" color="red"/></td>
                                            <td className="td-controles">
                                                <Link to={'/productos-preparados/'+fila.id}>
                                                    <button className="btn-tabla-productos">
                                                        <UilPackage size="25" color="white"/>
                                                    </button>
                                                </Link>
                                                <button className="btn-tabla-imprimir" onClick={() =>imprimir(fila.id)}>
                                                    <UilPrint size="25" color="white"/>
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

export default Preparados