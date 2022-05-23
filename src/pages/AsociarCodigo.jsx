import React, { useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import Cookies from 'universal-cookie'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import { useNavigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const AsociarCodigo = () =>
{
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_caja: '' })
    let navigate = useNavigate()
    const { autenticacion } = useAutenticacion() 

    useEffect(() =>
    {
        textboxCodigo.current.focus()
        if(form.cod_caja.length >= 8)
        {
            AsociarCodigo()
        }
        else
        {
            textboxCodigo.current.value = ''
        }
    }, [ form ])

    const AsociarCodigo = async () =>
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
            let res = await fetch(
                url+'actualizar-codigo-pedido.php?codigo='+form.cod_caja+'&id_pedido='+cookies.get('id_pedido'), 
                config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Operación realizada correctamente ',
                    infoPost[0].mensaje,
                    'success'
                )
                navigate('/menu')
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
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Asociar Codigo"/>
                <main className="container-body">
                    <form className="container-form-eliminar">
                        <label className="text-usuario animacion-2">Usuario: {cookies.get('nombre')}</label>
                        <input ref={textboxCodigo} autoComplete="off" type="text" className="textbox-genegal textbox-escanear-codigo animacion-2" name="cod_caja" onChange={handelChange} placeholder="Escanear Codigo"/>
                        <footer className="container-controles">
                            <BtnVolver volver="/asociar-pedido"/>
                        </footer>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default AsociarCodigo