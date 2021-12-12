import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import BtnControles from '../components/BtnControles/BtnControles'
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
    const [form, setForm] = useState({ cod_caja: ''})
    const [infoCaja, setCaja] = useState({ descripcion: '', kilos: '', vencimiento: '', cantidad: '' }) 

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
                        <div className="container-contador-caja">
                            <img src={SvgBox} alt="caja"/>
                            <div className="container-contador">
                                <label>{infoCaja.cantidad}</label>
                            </div>
                        </div>
                        <button className="btn-login btn-general-login" type="submit">Cargar</button>
                        <footer className="container-controles">
                            <BtnControles volver="/menu"/>
                            <button className="btn-continuar btn-controles" type="button">Abrir</button>
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