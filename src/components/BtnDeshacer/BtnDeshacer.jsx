import React, { useState, useEffect } from 'react'
import { UilRedo } from '@iconscout/react-unicons'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../../services/Settings'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const BtnDeshacer = ({ pantalla, codigo }) =>
{
    const [form, setForm] = useState({ formCodigo: '' })

    useEffect(() =>
    {
        deshacerUltimoPallet()
    }, [ form ])

    const handelClick = () =>
    {
        Swal.fire(
        {
            title: '¿Deshacer último movimiento?',
            text: "Si presionas continuar el ultimo "+pantalla+" que cargaste volverá a su estado inicial por lo tanto ya no se encontrará cargado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                asignarUseState(codigo)
            }
        })
    }

    const asignarUseState = (codigo) =>
    {
        if(codigo.length === 14)
        {
            setForm(
            {
                ...form,
                formCodigo: codigo
            })
        }
        else
        {
            Swal.fire(
                'Error',
                'No se cargó ningún codigo previamente',
                'error'
            )
        }
    }

    const deshacerUltimoPallet = async () =>
    {
        if(form.formCodigo.length === 14)
        {
            try
            {
                let config =
                {
                    method: 'POST',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                }
                let res = await fetch(url+'deshacer-ultimo-'+pantalla+'.php', config)
                let infoPost = await res.json()
                console.log(infoPost[0])
                if(infoPost[0].error == '0')
                {
                    Swal.fire(
                    {
                        icon: 'success',
                        title: 'Operacion realizada correctamente',
                        text: infoPost[0].mensaje,
                        showConfirmButton: true,
                    })
                }
                else
                {
                    Swal.fire(
                        'Error',
                        infoPost[0].mensaje,
                        'error'
                    )
                }
            }
            catch(error)
            {
                console.error(error)
                Swal.fire(
                    'Error',
                    'No se cargó ningún codigo previamente',
                    'error'
                )
            }
        }
    }

    return (
        <button className="btn-eliminar btn-general-login animacion-2" type="button" onClick={handelClick}>
            <UilRedo size="20" color="white"/>Deshacer
        </button>
    )
}

export default BtnDeshacer