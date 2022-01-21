import React, {useState, useEffect} from 'react';
import Nav from '../components/Navegacion/Nav'
import Loading from '../components/Loading/Loading'
import url from '../services/Settings'
import BtnVolver from '../components/BtnVolver/BtnVolver';
import Cookies from 'universal-cookie'
import { UilAngleRight } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'

const cookies = new Cookies()

const Preparacion = () =>
{
    let navigate = useNavigate()

    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-pedidos.php')
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

    const handelClick = (id_pedido) =>
    {
        cookies.set('id_pedido', id_pedido, {path: '/'})
        navigate('/tabla-productos')
    }

    if(!loading)
        return(
            <article>
                <Nav titulo="Preparacion"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="text-usuario animacion-1">Usuario: {cookies.get('nombre')}</label>
                        <label className="animacion-2">Pedidos Pendientes:</label>
                        <div className="animacion-1">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
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
                                                <td>{fila.num_pedido}</td>
                                                <td className="td-btn">
                                                    <button type="button" className="btn-table-seleccionar" onClick={() =>handelClick(fila.id)}>
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

export default Preparacion