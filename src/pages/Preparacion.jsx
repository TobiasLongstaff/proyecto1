import React, {useState, useEffect} from 'react';
import Nav from '../components/Navegacion/Nav'
import Loading from '../components/Loading/Loading'
import url from '../services/Settings'
import BtnVolver from '../components/BtnVolver/BtnVolver';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'

const cookies = new Cookies()

const Preparacion = () =>
{
    let navigate = useNavigate()
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorCarga, setErrorCarga ] = useState(false)

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        setErrorCarga(false)
        try
        {
            let res = await fetch(url+'obtener-pedidos.php')
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
                console.log('fetch')
            }
        }
        catch(error)
        {
            console.error(error)
            setErrorCarga(true)
        }
    }

    const handelClick = (id_pedido) =>
    {
        cookies.set('id_pedido', id_pedido, {path: '/'})
        navigate('/tabla-productos')
    }

    const handelBuscar = async e =>
    {
        console.log(e.target.value)
        let busqueda = e.target.value
        try
        {
            let res = await fetch(url+'obtener-pedidos.php?busqueda='+busqueda)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
                console.log('fetch')
            }
        }
        catch(error)
        {
            console.error(error)
            setErrorCarga(true)
        }
    }

    if(!loading)
        return(
            <article>
                <Nav titulo="Preparacion"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="text-usuario animacion-1">Usuario: {cookies.get('nombre')}</label>
                        <input type="search" name="buscar" placeholder="Buscar pedido" className="textbox-genegal textbox-escanear-codigo animacion-1" onChange={handelBuscar} />
                        <label className="animacion-2">Pedidos Pendientes:</label>
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
                            <div className="tbl-content-buscar">
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
        <Loading error={errorCarga} childClick={()=>fetchResource()}/>
    )
}

export default Preparacion