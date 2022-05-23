import React, { useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import Cookies from 'universal-cookie'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const Eliminar = () =>
{
    const textboxCodigo = React.createRef()
    const { autenticacion } = useAutenticacion()
    const [form, setForm] = useState({ cod_producto: '' })
    
    useEffect(() =>
    {
        if(form.cod_producto.length === 14 && textboxCodigo.current.value.length === 14)
        {
            deshacerProducto()
        }
    }, [ form ])

    const deshacerProducto = async () =>
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
            let res = await fetch(url+'deshacer-producto.php?codigo='+form.cod_producto, config)
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

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Eliminar producto"/>
                <main className="container-body">
                    <form className="container-form-eliminar">
                        <label className="text-usuario animacion-2">Usuario: {cookies.get('nombre')}</label>
                        <input 
                            ref={textboxCodigo} 
                            autoComplete="off" 
                            type="text" 
                            className="textbox-genegal textbox-escanear-codigo animacion-2" 
                            name="cod_producto" 
                            onChange={handelChange} 
                            placeholder="Escanear Codigo"
                            autoFocus
                        />
                        <footer className="container-controles">
                            <BtnVolver volver="/preparar-productos"/>
                        </footer>
                    </form>
                </main>
            </article>     
        )
    return(
        <Loading/>
    )
}

export default Eliminar