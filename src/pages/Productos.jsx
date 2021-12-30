import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import '../styles/productos.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import { UilAngleRight } from '@iconscout/react-unicons'

const cookies = new Cookies()

const Productos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_producto: '' })
    const [producto, setProducto] = useState(
    { 
        cod_producto: cookies.get('cod_producto'), 
        descripcion: cookies.get('descripcion_producto'),
        vencimiento: cookies.get('vencimiento_producto'),
        peso: cookies.get('peso_producto')
    })

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            if(textboxCodigo.current == '')
            {
                textboxCodigo.current.focus()
            }
        }
    })

    useEffect(() =>
    {
        if(form.cod_producto.length === 14 && textboxCodigo.current.value != '')
        {
            obtenerProducto()
        }
    }, [form])

    const obtenerProducto = async () =>
    {
        textboxCodigo.current.value = ''
        textboxCodigo.current.focus()
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
            let res = await fetch(url+'cargar-producto.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                setProducto(
                {
                    ...producto,
                    cod_producto: form.cod_producto,
                    descripcion: infoPost[0].descripcion,
                    vencimiento: infoPost[0].vencimiento,
                    peso: infoPost[0].kilos
                })

                cookies.set('cod_producto', form.cod_producto, {path: '/'})
                cookies.set('descripcion_producto', infoPost[0].descripcion, {path: '/'})
                cookies.set('vencimiento_producto', infoPost[0].vencimiento, {path: '/'})
                cookies.set('peso_producto', infoPost[0].kilos, {path: '/'})

                Swal.fire(
                {
                    icon: 'success',
                    title: 'Producto cargado correctamente',
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
                'Error al cargar producto intentar mas tarde',
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
                <Nav titulo="Preparacion"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <input type="text" autoComplete="off" ref={textboxCodigo} className="textbox-genegal textbox-escanear-codigo" name="cod_producto" onChange={handelChange} placeholder="Escanear Codigo" required/>
                        <label>Codigo Producto: {producto.cod_producto}</label>
                        <label>Descripcion: {producto.descripcion}</label>
                        <label>Fecha Vencimiento: {producto.vencimiento}</label>
                        <label>Peso: {producto.peso}</label>
                        <footer className="container-controles">
                            <BtnVolver volver="/menu"/>
                            <Link to="/preparar-productos">
                                <button type="button" className="btn-continuar btn-controles">
                                    <UilAngleRight size="80" color="white"/>
                                </button> 
                            </Link>
                        </footer> 
                    </div>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Productos