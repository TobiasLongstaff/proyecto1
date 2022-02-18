import React, {useEffect, useState} from 'react'
import url from '../../services/Settings'
import Loading from '../Loading/Loading'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Tabla = () =>
{
    const [ loading, setLoading ] = useState(true)
    const [data, setData] = useState([])
    let id_pedido = cookies.get('id_pedido')

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-productos-activos.php?id_pedido='+id_pedido)
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

    if(!loading)
        return(
            <div className="animacion-1">
                <div className="tbl-header">
                    <table>
                        <thead>
                            <tr>
                                <th className="td-cant">Cant.</th>
                                <th className="th-desc">Descripcion</th>
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
                                    <td className="td-cant">{fila.cantidad}</td>
                                    <td className="td-desc">
                                        <p className="text-tabla-desc-product">
                                            {fila.descripcion}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        )
    return(
        <Loading/>
    )
}

export default Tabla