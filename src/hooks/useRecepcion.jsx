import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const useRecepcion = () =>
{
    let navigate = useNavigate()
    const [infoPallet, setInfoPallet] = useState(
    {
        cantidad: '',
        pallet: ''
    })
    const [formPallet, setFormPallet] = useState(
    {
        cod_pallet: '', 
        id_recepcion: cookies.get('id_recepcion') 
    })

    const recepcion = async (form) =>
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
            let res = await fetch(url+'recepcion.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Recepcion creada')
            {
                cookies.set('id_recepcion', infoPost[0].id_recepcion, {path: '/'})
                cookies.set('cantidad_pallets', infoPost[0].cantidad_pallets, {path: '/'})
                navigate('/opciones-recepcion')
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

    useEffect(() =>
    {
        if(formPallet.cod_pallet !== '' && typeof formPallet.cod_pallet !== 'undefined')
        {
            if(formPallet.cod_pallet.length === 14){ recepcionarPallet() }
        }
    }, [ formPallet.cod_pallet ])

    const recepcionarPallet = async () =>
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
            let res = await fetch(url+'cargar-pallets.php', config)
            let infoPost = await res.json()
            if(infoPost[0].error == '0')
            {
                setInfoPallet(
                {
                    pallet: formPallet.cod_pallet,
                    cantidad: infoPost[0].cantidades,
                })
                setFormPallet({ ...formPallet, cod_pallet: '' })
                Swal.fire(
                {
                    icon: 'success',
                    title: 'Pallet cargado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else
            {
                setInfoPallet({ pallet: '', cantidad: '' })
                setFormPallet({ ...formPallet, cod_pallet: '' })
                Swal.fire(
                    'Error',
                    infoPost[0].mensaje,
                    'error'
                )
            }
        }
        catch(error)
        {
            setInfoPallet({ pallet: '', cantidad: '' })
            setFormPallet({ ...formPallet, cod_pallet: '' })
            console.error(error)
            Swal.fire(
                'Error',
                'Error al cargar recepcion intentar mas tarde',
                'error'
            )
        }
    }

    const changePallet = (value) =>
    {
        setFormPallet(
        {
            ...formPallet,
            cod_pallet: value
        })
    }
    
    return { recepcion, recepcionarPallet, changePallet, infoPallet, formPallet }
}


