import React, { useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const Devolucion = () =>
{
    const [form, setForm] = useState({ cod_caja: '' })
    const { autenticacion } = useAutenticacion()

    useEffect(() =>
    {
        if(form.cod_caja.length >= 8)
        {
            devolucion()
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
            let res = await fetch(url+'realizar-devolucion.php?codigo='+form.cod_caja, config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Operación realizada correctamente ',
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
        setForm({ cod_caja: '' })
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
                <Nav titulo="Devolucion"/>
                <main className="container-body">
                    <form className="container-form-eliminar">
                        <label className="text-usuario animacion-2">Usuario: {cookies.get('nombre')}</label>
                        <input 
                            autoComplete="off" 
                            type="text" 
                            className="textbox-genegal textbox-escanear-codigo animacion-2" 
                            name="cod_caja" 
                            onChange={handelChange} 
                            value={form.cod_caja}
                            placeholder="Escanear Caja"
                            autoFocus
                        />
                        <footer className="container-controles">
                            <BtnVolver volver="/menu"/>
                        </footer>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Devolucion