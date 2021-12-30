import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useNavigate } from 'react-router-dom'
import BtnVolver from '../BtnVolver/BtnVolver'
import Cookies from 'universal-cookie'
import url from '../../services/Settings'
import { UilFileCheckAlt } from '@iconscout/react-unicons'

const cookies = new Cookies()

const BtnControles = () =>
{
    const navigate = useNavigate()
    const [form, setFrom] = useState(
    {
        id_recepcion: cookies.get('id_recepcion'),
        cant_pallets: cookies.get('cantidad_pallets'),
    })

    const [formPallet, setFormPallet] = useState(
    {
        id_recepcion: cookies.get('id_recepcion'),
        cant_faltante: '',
        id_usuario: cookies.get('IdSession')
    })

    useEffect(() =>
    {
        console.log(formPallet)
        if(formPallet.cant_faltante !== '')
        CerrarRecepcion()
    }, [formPallet])

    const handelClick = () =>
    {
        Swal.fire(
        {
            title: '¿Cerrar recepción? ',
            text: "¿Estás seguro que queres cerrar la recepción?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar recepcion'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                ChequerRecepcion()
            }
        })
    }

    const ChequerRecepcion = async () =>
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
            let res = await fetch(url+'chequear-recepcion.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                CerrarRecepcion()
            }
            else if(infoPost[0].error == '2')
            {
                Swal.fire(
                {
                    title: 'Faltan cargar pallets',
                    text: infoPost[0].mensaje,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#00C3E3',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Cerrar recepcion'
                }).then((result) => 
                {
                    if(result.isConfirmed) 
                    {
                        setFormPallet(
                        {
                            ...formPallet,
                            cant_faltante: infoPost[0].cantidad_faltante
                        })
                    }
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
                'Error al cargar recepcion intentar mas tarde',
                'error'
            )
        }
    }

    const CerrarRecepcion = async () =>
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
                body: JSON.stringify(formPallet)
            }
            let res = await fetch(url+'cerrar-recepcion.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                {
                    icon: 'success',
                    title: 'Recepcion cerrada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                cookies.remove('id_recepcion')
                cookies.remove('id_pallet')
                cookies.remove('id_caja')
                cookies.remove('cod_caja')
                cookies.remove('cod_pallet')
                cookies.remove('cod_pallet_caja')
                cookies.remove('cantidad_caja')
                cookies.remove('cantidad_pallets')
                cookies.remove('cantidad_caja_pallet')
                cookies.remove('descripcion_caja')
                cookies.remove('kilos_caja')
                cookies.remove('vencimiento_caja')
                navigate('/menu')
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
                'Error al cargar recepcion intentar mas tarde',
                'error'
            )
        }
    }

    return(
        <footer className="container-controles">
            <BtnVolver volver="/opciones-recepcion"/>
            <button onClick={handelClick} className="btn-continuar btn-controles" type="button"><UilFileCheckAlt size="60" color="white"/></button>   
        </footer> 
    )
}

export default BtnControles