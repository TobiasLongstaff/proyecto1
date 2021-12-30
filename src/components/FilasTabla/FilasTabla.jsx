import React from 'react'
import { UilRedo } from '@iconscout/react-unicons'
import url from '../../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const FilasTabla = ({id, descripcion}) =>
{

    const handelClick = () =>
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
                deshacerProducto()
            }
        })
    }

    const deshacerProducto = async () =>
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
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return (
        <tr>
            <td>{descripcion}</td>
            <td className="td-btn">
                <button type="button" className="btn-table-deshacer" onClick={handelClick}>
                    <UilRedo size="20" color="white"/>
                </button>
            </td>
        </tr>
    )
}

export default FilasTabla