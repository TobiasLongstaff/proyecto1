import React, { useEffect } from 'react'
import Nav from '../components/Navegacion/Nav'
import { UilUploadAlt} from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import '../styles/preparacionProductos.css'
import Cookies from 'universal-cookie'
import Tabla from '../components/Tabla/Tabla'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const cookies = new Cookies()

const PrepararProductos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
    },[])

    const cargarProductos = async () =>
    {
        try
        {
            let res = await fetch(url+'cargar-productos.php')
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Productos cargados correctamente',
                    '',
                    'success'
                )
                cookies.remove('cod_producto')
                cookies.remove('descripcion_producto')
                cookies.remove('vencimiento_producto')
                cookies.remove('peso_producto')
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
            <Nav titulo="Productos"/>
            <main className="container-body">
                <div className="container-form-cajas">
                    <label className="text-usuario animacion-1">Usuario: {cookies.get('nombre')}</label>
                    <label className="animacion-2">Productos escaneados:</label>
                    <Tabla/>
                    <footer className="container-controles">
                        <BtnVolver volver="/preparacion"/>
                        <button type="button" className="btn-continuar btn-controles animacion-3" onClick={()=>cargarProductos()}>
                            <UilUploadAlt size="60" color="white"/>
                        </button> 
                    </footer> 
                </div>
            </main>
        </article>
    )
}

export default PrepararProductos