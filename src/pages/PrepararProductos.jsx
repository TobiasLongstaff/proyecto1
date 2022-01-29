import React, { useEffect, useState } from 'react'
import Nav from '../components/Navegacion/Nav'
import { UilParcel, UilTrashAlt } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import '../styles/preparacionProductos.css'
import Cookies from 'universal-cookie'
import Tabla from '../components/Tabla/Tabla'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useReactToPrint } from 'react-to-print';
import Etiqueta from '../components/Etiqueta/Etiqueta'

const cookies = new Cookies()

const PrepararProductos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    let id_pedido = cookies.get('id_pedido')

    const [form, setFrom] = useState(
    {
        id_pedido: cookies.get('id_pedido'),
    })

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
    },[])


    const cargarProductos = async () =>
    {
        Swal.fire(
            {
                title: '¿Terminar Pedido?',
                text: '¿Desea terminar este pedido?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00C3E3',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Terminar pedido'
            }).then((result) => 
            {
                if(result.isConfirmed) 
                {
                    ChequerPedido()
                }
            })
    }

    const ChequerPedido = async () =>
    {
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
            let res = await fetch(url+'chequear-pedido.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                CerrarPedido()
            }
            else if(infoPost[0].error == '2')
            {
                Swal.fire(
                {
                    title: 'Faltan cargar productos',
                    text: infoPost[0].mensaje,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#00C3E3',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Cerrar pedido'
                }).then((result) => 
                {
                    if(result.isConfirmed) 
                    {
                        CerrarPedido()
                    }
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
                'Error al cargar recepcion intentar mas tarde',
                'error'
            )
        }
    }

    const CerrarPedido = async () =>
    {
        try
        {
            Swal.fire('Terminando Pedido');
            Swal.showLoading()
            let res = await fetch(url+'terminar-pedido.php?id_pedido='+id_pedido+'&id_usuario='+idsession)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Pedido finalizado correctamente',
                    '',
                    'success'
                )
                navigate('/menu')
            }
            else
            {
                Swal.fire(
                    'Error',
                    'Error inesperado volver a intentar mas tarde',
                    'error'
                )  
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return(
        <article>
            <Nav titulo="Productos Listos"/>
            <main className="container-body">
                <div className="container-form-cajas">
                    <label className="text-usuario animacion-1">Cantidad total escaneados: {cookies.set('cantidad_productos_activos')}</label>
                    <label className="animacion-2">Productos escaneados:</label>
                    <Tabla/>
                    <footer className="container-controles">
                        <BtnVolver volver="/tabla-productos" />
                        <Link to="/eliminar">
                            <button type="button" className="btn-eliminar btn-controles animacion-3">
                                <UilTrashAlt size="60" color="white"/>
                            </button>
                        </Link>
                        <button type="button" className="btn-continuar btn-controles animacion-3" onClick={()=>cargarProductos()}>
                            <UilParcel size="60" color="white"/>
                        </button> 
                    </footer> 
                </div>
            </main>
        </article>
    )
}

export default PrepararProductos