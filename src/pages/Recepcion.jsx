import React, { useState } from 'react'
import '../styles/recepcion.css'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from "../components/BtnVolver/BtnVolver"
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useFecha } from '../hooks/useFecha'
import { useRecepcion } from '../hooks/useRecepcion'

const cookies = new Cookies()

const Recepcion = () =>
{
    const { autenticacion } = useAutenticacion()
    const { fecha } = useFecha()
    const { recepcion } = useRecepcion()
    const [ form, setForm ] = useState(
    {
        num_doc: '', 
        fecha_doc: '', 
        fecha_llegada: '', 
        observacion: '', 
        id_user: ''
    })

    const handelSubmit = e =>
    {
        e.preventDefault()
        recepcion(form)
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