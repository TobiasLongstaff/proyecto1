import React,{ useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import BtnVolver from '../components/BtnVolver/BtnVolver';
import { UilAngleRight, UilTimes } from '@iconscout/react-unicons'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import SvgBox from '../img/box-solid.svg'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const TablaProductos = () =>
{
    let navigate = useNavigate()
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    let id_pedido = cookies.get('id_pedido')
    const textboxCodigo = React.createRef()
    const [overlay, setOverlay] = useState('overlay')
    const [popup, setPopup] = useState('container-popup-producto')
    const [form, setForm] = useState({ cod_producto: '', id_pedido: cookies.get('id_pedido') })
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
        fetchResource()
    },[])

    useEffect(() =>
    {
        if(form.cod_producto.length === 14 && form.cod_producto != '')
        {
            activarProducto()
        }
        else
        {
            if(form.cod_producto.length > 14 || form.cod_producto.length < 14 && form.cod_producto != '')
            {
                textboxCodigo.current.value = ''
                textboxCodigo.current.focus()
            }
        }
    }, [form])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-productos-pedidos.php?id='+id_pedido)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
            }
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
                    cod_producto: infoPost[0].codigo, 
                    descripcion: infoPost[0].descripcion,
                    cant_total: infoPost[0].cantidad_total
                })
                setOverlay('overlay active')
                setPopup('container-popup-producto active')
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

    const cerrarPopup = () =>
    {
        setOverlay('overlay')
        setPopup('container-popup-producto')
    }

    const handelClick = (id_producto) =>
    {
        cookies.set('id_producto', id_producto, {path: '/'})
        navigate('/productos')
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Tabla Productos"/>
                <main className="container-body">
                    <div className="container-form-cajas">
                        <input 
                            type="text" 
                            autoComplete="off" 
                            ref={textboxCodigo} 
                            className="textbox-genegal textbox-escanear-codigo animacion-1" 
                            name="cod_producto" 
                            onChange={handelChange} 
                            placeholder="Escanear Codigo" 
                            required
                            autoFocus
                        />
                        <div className="animacion-1">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="td-cant">Cant.</th>
                                            <th className="th-desc">Descripcion</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tbl-content">
                                <table>
                                    <tbody>
                                    { loading ? (
                                        <tr className="tr-load">
                                            <td><div className="loader">Loading...</div></td>
                                        </tr>
                                        ): (
                                            data.map((fila) =>
                                            (
                                                <tr key={fila.id}>
                                                    <button type="button" className="btn-table-seleccionar" onClick={() =>handelClick(fila.id_producto)}>
                                                        <td className="td-cant">{fila.cantidad}</td>
                                                        <td className="td-desc">
                                                            <p className="text-btn-tabla-productos">{fila.descripcion}</p>
                                                        </td>                                                    
                                                    </button>
                                                </tr>
                                            ))
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <footer className="container-controles">
                            <BtnVolver volver="/preparacion"/>
                            <Link to="/preparar-productos">
                                <button type="button" className="btn-continuar btn-controles animacion-3">
                                    <UilAngleRight size="80" color="white"/>
                                </button> 
                            </Link>
                        </footer> 
                    </div>
                </main>
                <div className={overlay}>
                    <div className={popup}>
                        <header className="container-header-popup">
                            <h1>Producto Cargado</h1>
                        </header>
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
                        <footer className="container-btn-popup">
                            <button className="btn-cerrar-popup" onClick={() =>cerrarPopup()}>
                                <p>OK</p>
                            </button>
                        </footer>
                    </div>
                </div>
            </article>
        )
    return(
        <Loading/>
    )
}

export default TablaProductos