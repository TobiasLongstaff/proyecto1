import React, {useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import { UilAngleLeft } from '@iconscout/react-unicons'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'

const cookies = new Cookies()

const Cajas = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_caja: '', id_recepcion: cookies.get('id_recepcion') })
    const [infoCaja, setCaja] = useState({ descripcion: cookies.get('descripcion_caja'), kilos: cookies.get('kilos_caja'), vencimiento: cookies.get('vencimiento_caja'), cantidad: cookies.get('cantidad_caja') }) 

    useEffect(() =>
    {
        console.log(cookies.get('id_recepcion'))
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            textboxCodigo.current.focus()
        }
    })

    const handelSubmit = async e =>
    {
        e.preventDefault()
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
            if(infoPost[0].mensaje == 'Caja abierta')
            {
                setCaja(
                {
                    ...infoCaja,
                    descripcion: infoPost[0].descripcion,
                    kilos: infoPost[0].kilos,
                    vencimiento: infoPost[0].vencimiento,
                    cantidad: infoPost[0].cantidades
                })

                cookies.set('cod_caja', form.cod_caja, {path: '/'})
                cookies.set('id_caja', infoPost[0].id_caja, {path: '/'})
                cookies.set('descripcion_caja', infoPost[0].descripcion, {path: '/'})
                cookies.set('kilos_caja', infoPost[0].kilos, {path: '/'})
                cookies.set('vencimiento_caja', infoPost[0].vencimiento, {path: '/'})
                cookies.set('cantidad_caja', infoPost[0].cantidades, {path: '/'})

                Swal.fire(
                {
                    icon: 'success',
                    title: 'Caja abierta correctamente',
                    showConfirmButton: false,
                    timer: 1500
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

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handelClick = () =>
    {
        if(cookies.get('id_caja') != '')
        {
            Swal.fire(
            {
                title: '¿Estás seguro que queres volver al menu?',
                text: "Tenes una caja cargada esperando a que cargues sus productos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#00C3E3',
                confirmButtonText: 'Salir'
            }).then((result) => 
            {
                if(result.isConfirmed) 
                {
                    navigate('/')
                }
            })
        }
        else
        {
            navigate('/')
        }
    }

    if(idsession)
        return(
            <article>
                <Nav titulo="Cajas"/>
                <main className="container-body">
                    <form className="container-form-cajas" onSubmit={handelSubmit}>
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <input ref={textboxCodigo} type="text" className="textbox-genegal textbox-escanear-codigo" name="cod_caja" onChange={handelChange} placeholder="Escanear Codigo" required/>
                        <label>Descripcion: {infoCaja.descripcion}</label>
                        <label>Kilos: {infoCaja.kilos}</label>
                        <label>Vencimiento: {infoCaja.vencimiento}</label>
                        <label>Cantitad:</label>
                        <div className="container-contador-caja">
                            <img src={SvgBox} alt="caja"/>
                            <div className="container-contador">
                                <label>{infoCaja.cantidad}</label>
                            </div>
                        </div>
                        <button className="btn-login btn-general-login" type="submit">Cargar</button>
                        <footer className="container-controles">
                            <button type="button" onClick={handelClick} className="btn-volver btn-controles">
                                <UilAngleLeft size="80" color="#252A34"/>
                            </button>
                            <Link to="/productos">
                                <button className="btn-continuar btn-controles" type="button">Continuar</button>   
                            </Link>
                        </footer> 
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Cajas