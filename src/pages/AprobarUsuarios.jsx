import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavDektop from '../components/NavegacionDesktop/NavDesktop'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import { useAutenticacion } from '../hooks/useAutenticacion'
import Loading from '../components/Loading/Loading'

const AprobarUsuarios = () =>
{
    let { mail, hash, nombre } = useParams()
    const { autenticacion } = useAutenticacion()
    const permisos = React.createRef()

    const [form, setForm] = useState({ mail: mail, hash: hash, permisos: ''})

    const handelSubmit = e =>
    {
        e.preventDefault()
        Swal.fire(
        {
            title: '¿Esta seguro?',
            text: "¿Estás seguro de aprobar este usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                AprobarUsuario()
            }
        })
    }

    const AprobarUsuario = async () =>
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
            Swal.fire('Creando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'aprobar-usuario.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Usuario aprobado correctamente',
                    'El usuario recibira un mail avisando que su cuenta esta lista para usarse',
                    'success'
                )
            }
            else
            {
                Swal.fire(
                    'Error',
                    'Error al aprobar el usuario intentar mas tarde',
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
            Swal.fire(
                'Error',
                'Error al aprobar el usuario intentar mas tarde',
                'error'
            )
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            permisos: permisos.current.value
        })
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <NavDektop titulo="Aprobar Usuario"/>
                <main className="container-aprobar-usuario">
                    <form className="form-aprobar-usuario animacion-2" onSubmit={handelSubmit}>
                        <label>Nombre y Apellido: {nombre}</label>
                        <label>E-Mail: {mail}</label>
                        <label>Hash: {hash}</label>
                        <label>Seleccionar privilegios del usuario:</label>
                        <select ref={permisos} className="select-general select-aprobar-usuario" name="permisos" onChange={handelChange} required>
                            <option value="handheld">Handheld</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <button type="submit" className="btn-general-login btn-login">Aprobar</button>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default AprobarUsuarios