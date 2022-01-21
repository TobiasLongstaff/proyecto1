import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import BtnControles from '../components/BtnControles/BtnControles'
import BtnDeshacer from '../components/BtnDeshacer/BtnDeshacer'

const cookies = new Cookies()

const Cajas = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_caja: cookies.get('cod_caja'), id_recepcion: cookies.get('id_recepcion') })
    const infoCajaInicial =
    { 
        descripcion: cookies.get('descripcion_caja'), 
        kilos: cookies.get('kilos_caja'), 
        vencimiento: cookies.get('vencimiento_caja'), 
        cantidad: cookies.get('cantidad_caja'), 
        cod_pallet: cookies.get('cod_pallet_caja')
    }
    const [infoCaja, setCaja] = useState(infoCajaInicial)

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
        if(typeof form.cod_caja !== 'undefined')
        {
            if(form.cod_caja.length === 14 && textboxCodigo.current.value.length === 14)
            {
                EscanearCaja()
            }
        }
    }, [ form ])

    const EscanearCaja = async () =>
    {
        textboxCodigo.current.focus()
        textboxCodigo.current.value = ''
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
            let res = await fetch(url+'cargar-cajas.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                setCaja(
                {
                    ...infoCaja,
                    descripcion: infoPost[0].descripcion,
                    kilos: infoPost[0].kilos,
                    vencimiento: infoPost[0].vencimiento,
                    cantidad: infoPost[0].cantidades,
                    cod_pallet: infoPost[0].cod_pallet
                })

                cookies.set('cod_caja', form.cod_caja, {path: '/'})
                cookies.set('cod_pallet_caja', infoPost[0].cod_pallet, {path: '/'})
                cookies.set('id_caja', infoPost[0].id_caja, {path: '/'})
                cookies.set('descripcion_caja', infoPost[0].descripcion, {path: '/'})
                cookies.set('kilos_caja', infoPost[0].kilos, {path: '/'})
                cookies.set('vencimiento_caja', infoPost[0].vencimiento, {path: '/'})
                cookies.set('cantidad_caja', infoPost[0].cantidades, {path: '/'})

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
                RemoverCoockiesCajas()
                Swal.fire(
                    'Error',
                    infoPost[0].mensaje,
                    'error'
                )
            }
        }
        catch(error)
        {
            RemoverCoockiesCajas()
            console.error(error)
            Swal.fire(
                'Error',
                'Error al cargar recepcion intentar mas tarde',
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

    const RemoverCoockiesCajas = () =>
    {
        cookies.remove('cod_caja')
        cookies.remove('cod_pallet_caja')
        cookies.remove('id_caja')
        cookies.remove('descripcion_caja')
        cookies.remove('kilos_caja')
        cookies.remove('vencimiento_caja')
        cookies.remove('cantidad_caja')
        setCaja(
        {
            infoCajaInicial
        })
    }

    if(idsession)
        return(
            <article>
                <Nav titulo="Cajas"/>
                <main className="container-body">
                    <form className="container-form-cajas">
                        <label className="animacion-1">Codigo Caja: {form.cod_caja}</label>
                        <input ref={textboxCodigo} autoComplete="off" type="text" className="textbox-genegal textbox-escanear-codigo animacion-1" name="cod_caja" onChange={handelChange} placeholder="Escanear Codigo"/>
                        <label className="animacion-1">Codigo Pallet: {infoCaja.cod_pallet}</label>
                        <p className="animacion-1">Descripcion: {infoCaja.descripcion}</p>
                        <label className="animacion-1">Kilos: {infoCaja.kilos}</label>
                        <label className="animacion-1">Vencimiento: {infoCaja.vencimiento}</label>
                        <div className="container-cantidad animacion-1">
                            <label>Cantitad:</label>
                            <div className="container-contador-caja">
                                <img src={SvgBox} alt="caja"/>
                                <div className="container-contador">
                                    <label>{infoCaja.cantidad}</label>
                                </div>
                            </div>
                        </div>
                        <BtnDeshacer pantalla="caja" codigo={form.cod_caja}/>
                        <BtnControles/>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Cajas