import React, {useEffect, useState} from 'react'
import { UilRedo } from '@iconscout/react-unicons'
import url from '../../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Loading from '../Loading/Loading'

const Tabla = () =>
{
    const [ loading, setLoading ] = useState(true)
    const [data, setData] = useState([])

    useEffect(() =>
    {
        fetchResource()
    },[])

    const handelClick = (id) =>
    {
        Swal.fire(
        {
            title: '¿Deshacer este producto? ',
            text: "Si presionas continuar el producto que seleccionaste volverá a su estado inicial por lo tanto ya no se encontrará cargado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                deshacerProducto(id)
            }
        })
    }

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-productos-activos.php')
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

    const deshacerProducto = async (id) =>
    {
        try
        {
            let config = 
            {
                method: 'PUT',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            let res = await fetch(url+'deshacer-producto.php?id='+id, config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Operación realizada correctamente ',
                    infoPost[0].mensaje,
                    'success'
                )

                fetchResource()
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    if(!loading)
        return(
            <div>
                <div className="tbl-header">
                    <table>
                        <thead>
                            <tr>
                                <th>Descripcion</th>
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
                                    <td>{fila.descripcion}</td>
                                    <td className="td-btn">
                                        <button type="button" className="btn-table-deshacer" onClick={() =>handelClick(fila.id)}>
                                            <UilRedo size="20" color="white"/>
                                        </button>
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