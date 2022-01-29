import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import '../styles/productos.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import SvgBox from '../img/box-solid.svg'

const cookies = new Cookies()

const Productos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    let id_producto = cookies.get('id_producto')
    let id_pedido = cookies.get('id_pedido')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_producto: '', id_producto: id_producto, id_pedido: cookies.get('id_pedido') })
    const [producto, setProducto] = useState(
    {
        cod_producto: '', 
        descripcion: '',
        vencimiento: '',
        peso: '',
        cantidad: '',
        cant_total: ''
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
            obtenerProducto()
        }
    },[])

    useEffect(() =>
    {
        if(form.cod_producto.length === 14 && textboxCodigo.current.value != '')
        {
            activarProducto()
        }
    }, [form])

    const obtenerProducto = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-producto.php?id_producto='+id_producto+'&id_pedido='+id_pedido)
            let datos = await res.json()
            setProducto(
            {
                ...producto,
                cod_producto: datos[0].cod_producto,
                descripcion: datos[0].descripcion,
                cantidad: datos[0].cantidad_escaneados,
                cant_total: datos[0].cant_total
            })
            console.log(datos)
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const activarProducto = async () =>
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
            let res = await fetch(url+'activar-producto.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                setProducto(
                {
                    ...producto,
                    vencimiento: infoPost[0].vencimiento,
                    peso: infoPost[0].kilos,
                    cantidad: infoPost[0].cantidad_escaneados,
                })

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
                <Nav titulo="Producto"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <label className="animacion-1">Codigo Producto: {producto.cod_producto}</label>
                        <input type="text" autoComplete="off" ref={textboxCodigo} className="textbox-genegal textbox-escanear-codigo animacion-1" name="cod_producto" onChange={handelChange} placeholder="Escanear Codigo" required/>
                        <p className="animacion-1">Desc: {producto.descripcion}</p>
                        <label className="animacion-1">Fecha Vencimiento: {producto.vencimiento}</label>
                        <label className="animacion-1">Peso: {producto.peso}</label>
                        <label className="animacion-1">Cantidad Total: {producto.cant_total}</label>
                        <label className="animacion-1">Cantidad Escaneados: </label>
                        <div className="container-contador-caja animacion-1">
                            <img src={SvgBox} alt="caja"/>
                            <div className="container-contador-producto-text">
                                <label>{producto.cantidad}</label>
                            </div>
                        </div>
                        <footer className="container-controles">
                            <BtnVolver volver="/tabla-productos"/>
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