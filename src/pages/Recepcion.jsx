import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/recepcion.css'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from "../components/BtnVolver/BtnVolver"
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Loading from '../components/Loading/Loading'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useFecha } from '../hooks/useFecha'

const cookies = new Cookies()

const Recepcion = () =>
{
    let navigate = useNavigate()
    const { autenticacion } = useAutenticacion()
    const { fecha } = useFecha()
    const [ form, setForm ] = useState(
    {
        num_doc: '', 
        fecha_doc: '', 
        fecha_llegada: '', 
        observacion: '', 
        id_user: ''
    })

    const handelSubmit = async e =>
    {
        console.log(form)
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

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            fecha_llegada: fecha, 
            id_user: autenticacion.id,
            [e.target.name]: e.target.value
        })
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Recepcion"/>
                <main className="container-body">
                    <form className="container-form" onSubmit={handelSubmit}>
                        <label className="text-usuario animacion-1">Usuario: {cookies.get('nombre')}</label>
                        <input 
                            type="text" 
                            autoComplete="off" 
                            className="animacion-1 textbox-genegal textbox-escanear-codigo" 
                            name="num_doc" 
                            placeholder="N° Documento" 
                            onChange={handelChange} 
                            value={form.num_doc} 
                            required 
                            autoFocus
                        />
                        <div className="animacion-1">
                            <label>Fecha del documento</label>
                            <input 
                                type="date" 
                                autoComplete="off" 
                                className="textbox-genegal" 
                                name="fecha_doc" 
                                onChange={handelChange} 
                                value={form.fecha_doc} 
                                required
                            />                    
                        </div>
                        <div className="animacion-1">
                            <label>Fecha de llegada</label>
                            <input 
                                type="date" 
                                className="textbox-genegal" 
                                value={fecha} 
                                disabled 
                                required/>                    
                        </div>
                        <textarea 
                            autoComplete="off" 
                            className="textbox-genegal textarea-general animacion-1" 
                            name="observacion" 
                            placeholder="Observacion" 
                            onChange={handelChange} 
                            value={form.observacion}
                        ></textarea>     
                        <footer className="container-controles">
                            <BtnVolver volver="/menu"/>
                            <button type="submit" className="btn-continuar btn-controles animacion-3">Continuar</button> 
                        </footer>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Recepcion