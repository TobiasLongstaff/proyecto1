import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import BtnControles from '../components/BtnControles/BtnControles'
import '../styles/productos.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import SvgOpenBox from '../img/box-open-solid.svg'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'

const cookies = new Cookies()

const Productos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()
    const [form, setForm] = useState({ cod_producto: '', fecha_ven: '', peso: '', descripcion: '', cod_caja: cookies.get('id_caja') })
    const [cantidad, setCantidad] = useState({ cantidad_restante: cookies.get('cantidad_caja') })

    useEffect(()=>
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
            let res = await fetch(url+'cargar-productos.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Producto Cargado')
            {
                Swal.fire(
                {
                    icon: 'success',
                    title: 'Producto cargado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })

                setCantidad(
                {
                    ...cantidad,
                    cantidad_restante: cookies.get('cantidad_caja') - infoPost[0].cantidad_cargados
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
                <Nav titulo="Productos"/>
                <main className="container-body">
                    <form className="container-form" onSubmit={handelSubmit}>
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <label>Codigo de Caja: {cookies.get('cod_caja')}</label>
                        <input type="text" ref={textboxCodigo} className="textbox-genegal textbox-escanear-codigo" name="cod_producto" value={form.cod_producto} onChange={handelChange} placeholder="Escanear Codigo" required/>
                        <div className="container-info-productos">
                            <div>
                                <label>Fecha Vencimiento</label>
                                <input type="date" name="fecha_ven" className="textbox-genegal textbox-date" onChange={handelChange} required/>
                            </div>
                            <input type="text" name="peso" className="textbox-genegal textbox-peso" placeholder="Peso" onChange={handelChange} required/>
                        </div>
                        <textarea name="descripcion" className="textbox-genegal textarea-general" placeholder="Descripcion" onChange={handelChange}></textarea>
                        <div className="container-contador-productos">
                            <label>Productos restantes:</label>
                            <div className="container-contador-caja-productos">
                                <img src={SvgOpenBox} alt="caja"/>
                                <div className="container-contador-caja-abierta">
                                    <label>{cantidad.cantidad_restante}</label>
                                </div>
                            </div>
                        </div>
                        <footer className="container-controles">
                            <BtnControles volver="/cajas"/>
                            <button type="submit" className="btn-continuar btn-controles"></button> 
                        </footer> 
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Productos