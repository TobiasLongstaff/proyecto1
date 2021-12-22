import React, {useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import BtnControles from '../components/BtnControles/BtnControles'

const cookies = new Cookies()

const Pallets = () =>
{
    let config
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_pallet: cookies.get('cod_pallet'), id_recepcion: cookies.get('id_recepcion') })
    const [infoCaja, setCaja] = useState({ cantidad: cookies.get('cantidad_caja_pallet') }) 

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            textboxCodigo.current.focus()
        }
    })

    useEffect(() =>
    {
        if(typeof form.cod_pallet !== 'undefined')
        {
            if(form.cod_pallet.length === 14)
            {
                EscanearPallet()
            }
        }
    }, [ form ])

    const handelSubmit = async e =>
    {
        e.preventDefault()
        textboxCodigo.current.focus()
        textboxCodigo.current.value = ''
        try
        {
            config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let resCargar = await fetch(url+'cargar-pallets.php', config)
            let infoPostCargar = await resCargar.json()
            console.log(infoPostCargar[0])
            if(infoPostCargar[0].error == '0')
            {
                setCaja(
                {
                    ...infoCaja,
                    cantidad: ''
                })

                setForm(
                {
                    ...form,
                    cod_pallet: ' '
                })

                cookies.remove('cod_pallet')
                cookies.remove('id_pallet')
                cookies.remove('cantidad_caja_pallet')

                Swal.fire(
                {
                    icon: 'success',
                    title: 'Cajas cargadas correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
            else
            {
                Swal.fire(
                    'Error',
                    infoPostCargar[0].mensaje,
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
            Swal.fire(
                'Error',
                'Necesitas escanear el pallet para poder cargar las cajas',
                'error'
            )
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const EscanearPallet = async () =>
    {
        textboxCodigo.current.focus()
        textboxCodigo.current.value = ''
        try
        {
            config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url+'escanear-pallets.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                setCaja(
                {
                    ...infoCaja,
                    cantidad: infoPost[0].cantidades,
                })

                cookies.set('cod_pallet', form.cod_pallet, {path: '/'})
                cookies.set('id_pallet', infoPost[0].id_pallet, {path: '/'})
                cookies.set('cantidad_caja_pallet', infoPost[0].cantidades, {path: '/'})
            }
            else
            {
                setForm(
                {
                    ...form,
                    cod_pallet: ' '
                })

                cookies.remove('cod_pallet')
                cookies.remove('id_pallet')
                cookies.remove('cantidad_caja_pallet')

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

    if(idsession)
        return(
            <article>
                <Nav titulo="Pallets"/>
                <main className="container-body">
                    <form className="container-form-cajas" onSubmit={handelSubmit}>
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <input ref={textboxCodigo} type="text" className="textbox-genegal textbox-escanear-codigo" name="cod_pallet" onChange={handelChange} placeholder="Escanear Codigo"/>
                        <label>Codigo Pallet: {form.cod_pallet} </label>
                        <label>Cantitad de cajas:</label>
                        <div className="container-contador-caja">
                            <img src={SvgBox} alt="caja"/>
                            <div className="container-contador">
                                <label>{infoCaja.cantidad}</label>
                            </div>
                        </div>
                        <button className="btn-login btn-general-login" type="submit">Cargar</button>
                        <BtnControles/>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Pallets