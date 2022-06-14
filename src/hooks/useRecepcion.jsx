import { useEffect, useState } from 'react'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const useRecepcion = () =>
{
    const [infoPallet, setInfoPallet] = useState(
    {
        cantidad: '',
        pallet: ''
    })

    const [infoCaja, setInfoCaja] = useState(
    {
        cod_caja: '',
        descripcion: '', 
        kilos: '', 
        vencimiento: '', 
        cantidad: '', 
        cod_pallet: ''
    })

    const [formPallet, setFormPallet] = useState(
    {
        cod_pallet: '', 
    })

    const [formCaja, setFormCaja] = useState(
    {
        cod_caja: '', 
    })

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

    useEffect(() =>
    {
        if(typeof formCaja.cod_caja !== 'undefined')
        {
            if(formCaja.cod_caja.length === 14)
            {
                EscanearCaja()
            }
        }
    }, [ formCaja.cod_caja ])

    const EscanearCaja = async () =>
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
                body: JSON.stringify(formCaja)
            }
            let res = await fetch(url+'cargar-cajas.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                setInfoCaja(
                {
                    ...infoCaja,
                    cod_caja: infoPost[0].cod_caja,
                    descripcion: infoPost[0].descripcion,
                    kilos: infoPost[0].kilos,
                    vencimiento: infoPost[0].vencimiento,
                    cantidad: infoPost[0].cantidades,
                    cod_pallet: infoPost[0].cod_pallet
                })
                setFormCaja({ ...formPallet, cod_caja: '' })
                Swal.fire(
                {
                    icon: 'success',
                    title: 'Caja cargada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else
            {
                setInfoCaja(
                {        
                    cod_caja: '',
                    descripcion: '', 
                    kilos: '', 
                    vencimiento: '', 
                    cantidad: '', 
                    cod_pallet: ''
                })
                setFormCaja({ ...formPallet, cod_caja: '' })
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
            setInfoCaja(
            {        
                cod_caja: '',
                descripcion: '', 
                kilos: '', 
                vencimiento: '', 
                cantidad: '', 
                cod_pallet: ''
            })
            setFormCaja({ ...formPallet, cod_caja: '' })
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

    const changeCaja = (value) =>
    {
        setFormCaja(
        {
            ...formCaja,
            cod_caja: value
        })
    }
    
    return { recepcionarPallet, changePallet, changeCaja, infoPallet, infoCaja, formPallet, formCaja }
}


