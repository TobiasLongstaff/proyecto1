import React, {useState} from "react"
import { Link } from 'react-router-dom'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const Registro = () =>
{
    const [ MensajeError, setError ] = useState(null) 
    const [ form, setForm ] = useState({nombre_apellido: '', mail: '', password: '', password_con: ''}) 
    const initialState = {nombre_apellido: '', mail: '', password: '', password_con: ''}

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
            Swal.fire('Creando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'crear-cuenta.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Cuenta creada')
            {
                Swal.fire(
                    'Cuenta creada exitosamente',
                    'Te llegara un mail avisando cuando tu cuenta esta lista para usarse ',
                    'success'
                )
                setForm({ ...initialState });
            }
            else
            {
                Swal.close()
                setError(infoPost[0].mensaje)
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error al registrarte intentar mas tarde')
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    return(
        <article className="container-registro">
            <div className="container-info-login">
                <header className="header-registro animacion-1">
                    <h1>Registro</h1>
                </header>
                <main>
                    <form onSubmit={handelSubmit} className="menu-registro">
                        <input type="text" placeholder="Nombre y Apellido" name="nombre_apellido" onChange={handelChange} className="textbox-genegal animacion-2" value={form.nombre_apellido} required/>
                        <input type="mail" placeholder="E-mail" name="mail" onChange={handelChange} className="textbox-genegal animacion-2" value={form.mail} required/>
                        <input type="password" placeholder="Contraseña" name="password" onChange={handelChange} className="textbox-genegal animacion-2" value={form.password} required/>
                        <input type="password" placeholder="Confirmar Contraseña" name="password_con" onChange={handelChange} className="textbox-genegal animacion-2" value={form.password_con} required/>
                        <label>{MensajeError}</label>
                        <div className="container-btn animacion-3">
                            <button type="submit" className="btn-registro btn-general-registro">Crear cuenta</button>
                            <Link to="/">
                                <button type="button" className="btn-volver-registro btn-general-registro">Volver</button>
                            </Link>                    
                        </div>
                    </form>
                </main>                  
            </div>
        </article> 
    )
}

export default Registro