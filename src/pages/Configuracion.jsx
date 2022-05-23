import React,{ useEffect, useState } from 'react'
import NavDesktop from '../components/NavegacionDesktop/NavDesktop'
import url from '../services/Settings'
import { UilTrashAlt, UilEditAlt} from '@iconscout/react-unicons'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const Configuracion = () =>
{
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    const key = 'c52f1bd66cc19d05628bd8bf27af3ad6'
    const [ form, setForm ] = useState({ nombre: '', mail: '', permisos: '', id: ''})
    const [ MensajeError, setError ] = useState(null)

    useEffect(() =>
    {
        fetchResource()                    
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-usuarios.php?key='+key)
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

    const handelEliminar = (id_fila) =>
    {
        Swal.fire(
        {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                eliminarUsuario(id_fila)
            }
        })
    }

    const eliminarUsuario = async (id_fila) =>
    {
        try
        {
            let config = 
            {
                method: 'DELETE',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            let res = await fetch(url+'eliminar-usuario.php?id='+id_fila, config)
            let infoDel = await res.json()
            console.log(infoDel[0])
            if(infoDel[0].error == 0)
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                fetchResource()
            }
            else
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'error'
                )
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const handelSubmit = async e =>
    {
        e.preventDefault();

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
            let res = await fetch(url+'editar-usuario.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                setError('')
                Swal.fire(
                    'Operacion realizada correctamente',
                    '',
                    'success'
                )
                fetchResource()
            }
            else
            {
                setError(infoPost[0].mensaje)
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error inesperado intentar mas tarde')
        }
    }

    const handelEditar = async (id_fila) =>
    {
        try
        {
            let res_usuario = await fetch(url+'obtener-usuarios.php?key=c52f1bd66cc19d05628bd8bf27af3ad6&id='+id_fila)
            let datos_usuario = await res_usuario.json()
            if(typeof datos_usuario !== 'undefined')
            {
                setForm(
                {
                    nombre: datos_usuario[0].nombre,
                    id: id_fila,
                    mail: datos_usuario[0].mail,
                    permisos: datos_usuario[0].tipo
                })
                console.log(form)
            }
        }
        catch(error)
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
                <NavDesktop titulo="Configuracion"/>
                <main className="container-page-web-productos-preparados">
                    <form className="container-from-usuarios" onSubmit={handelSubmit}>
                        <h1 className="animacion-1">Editar Usuario</h1>
                        <input type="text" className="textbox-genegal animacion-1" name="nombre" placeholder="Nombre Apellido" onChange={handelChange} value={form.nombre} required/>
                        <input type="email" className="textbox-genegal animacion-2" name="mail" placeholder="E-Mail" onChange={handelChange} value={form.mail} required/>
                        <select value={form.permisos} className="select-general select-aprobar-usuario animacion-2" name="permisos" onChange={handelChange} required>
                            <option value="handheld">Handheld</option>
                            <option value="estandar">Estandar</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <label className="text-error">{MensajeError}</label>
                        <button type="submit" className="btn-login btn-general-login animacion-3">Editar usuario</button>
                    </form>
                    <div>
                        <div className="tbl-header-web">
                            <table>
                                <thead>
                                    <tr className="tr-head-web">
                                        <th className="th-cod">#</th>
                                        <th>Nombre y Apellido</th>
                                        <th>E-Mail</th>
                                        <th>Permisos</th>
                                        <th className="th-controles">Controles</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content-web">
                            <table>
                                <tbody>
                                    { loading ? (
                                        <tr className="tr-load">
                                            <td><div className="loader">Loading...</div></td>
                                        </tr>
                                        ): (
                                            data.map((fila) =>
                                            (
                                                <tr key={fila.id} className="tr-web">
                                                    <td className="td-cod">{fila.id}</td>
                                                    <td><p>{fila.nombre}</p></td>
                                                    <td><p>{fila.mail}</p></td>
                                                    <td>{fila.tipo}</td>
                                                    <td className="td-controles">
                                                        <button className="btn-tabla-controles btn-editar">
                                                            <UilEditAlt size="25" color="white" onClick={() =>handelEditar(fila.id)}/>
                                                        </button>
                                                        <button className="btn-tabla-controles btn-eliminar" onClick={() =>handelEliminar(fila.id)}>
                                                            <UilTrashAlt size="30" color="white"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>                    
                    </div>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Configuracion