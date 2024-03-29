import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import '../styles/recepcion.css'
import Nav from '../components/Navegacion/Nav'
import BtnControles from "../components/BtnControles/BtnControles";
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Loading from '../components/Loading/Loading'


const cookies = new Cookies()

const Recepcion = () =>
{
    let navigate = useNavigate()
    const [ form, setForm ] = useState({num_doc: '', fecha_doc: '', fecha_llegada: cookies.get('fecha_actual'), observacion: '', id_user: cookies.get('IdSession')})
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            fecha_actual()
            if(textboxCodigo.current.value == '')
            {
                textboxCodigo.current.focus()
            }
        }
    }),[]

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
            let res = await fetch(url+'recepcion.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Recepcion creada')
            {
                cookies.set('id_recepcion', infoPost[0].id_recepcion, {path: '/'})
                navigate('/cajas')
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
        console.log(form)
    }

    const fecha_actual = () =>
    {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let fecha = `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
        cookies.set('fecha_actual', fecha, {path: '/'})
    }

    if(idsession)
        return(
            <article>
                <Nav titulo="Recepcion"/>
                <main className="container-body">
                    <form className="container-form" onSubmit={handelSubmit}>
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <input type="text" ref={textboxCodigo} className="textbox-genegal textbox-escanear-codigo" name="num_doc" placeholder="N° Documento" onChange={handelChange} value={form.num_doc} required/>
                        <div>
                            <label>Fecha del documento</label>
                            <input type="date" className="textbox-genegal" name="fecha_doc" onChange={handelChange} value={form.fecha_doc} required/>                    
                        </div>
                        <div>
                            <label>Fecha de llegada</label>
                            <input type="date" className="textbox-genegal" value={cookies.get('fecha_actual')} disabled required/>                    
                        </div>
                        <textarea className="textbox-genegal textarea-general" name="observacion" placeholder="Observacion" onChange={handelChange} value={form.observacion}></textarea>     
                        <footer className="container-controles">
                            <BtnControles volver="/menu"/>
                            <button type="submit" className="btn-continuar btn-controles">Continuar</button> 
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