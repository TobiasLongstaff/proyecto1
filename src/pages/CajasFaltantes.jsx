import React, { useEffect, useState, useRef } from 'react'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import { useNavigate } from 'react-router-dom'

const cookies = new Cookies()

const CajasFaltantes = () =>
{
    const textboxCodigo = useRef()
    const [form, setForm] = useState({ cod_caja: '' })
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            textboxCodigo.current.focus()
            if(textboxCodigo.current.value.length >= 8)
            {
                devolucion()
            }
        }
    }, [ form ])

    const devolucion = async () =>
    {
        try
        {
            let config = 
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            let res = await fetch(url+'cargar-cajas-faltantes.php?codigo='+form.cod_caja, config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Operación realizada correctamente',
                    infoPost[0].mensaje,
                    'success'
                )
            }
            else
            {
                Swal.fire(
                    'Error ',
                    infoPost[0].mensaje,
                    'error'
                )
            }
        }
        catch (error)
        {
            console.error(error)
        }
        textboxCodigo.current.value = ''
        textboxCodigo.current.focus()
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article>
            <Nav titulo="Cajas Faltantes"/>
            <main className="container-body">
                <form className="container-form-eliminar">
                    <label className="text-usuario animacion-2">Usuario: {cookies.get('nombre')}</label>
                    <input ref={textboxCodigo} autoComplete="off" type="text" className="textbox-genegal textbox-escanear-codigo animacion-2" name="cod_caja" onChange={handelChange} placeholder="Escanear Caja"/>
                    <footer className="container-controles">
                        <BtnVolver volver="/menu"/>
                    </footer>
                </form>
            </main>
        </article>
    )
}

export default CajasFaltantes