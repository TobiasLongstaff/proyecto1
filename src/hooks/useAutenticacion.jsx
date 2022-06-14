import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import url from '../services/Settings'

const cookie = new Cookies

export const useAutenticacion = () =>
{
    let navigate = useNavigate()
    const location = useLocation()
    const [autenticacion, setAutenticacion] = useState({autenticado: false, tipo: '', id: ''})
    var hash = cookie.get('hashSession')

    useEffect(() =>
    {
        (hash != null) ? verificarUsuario() : navigate('/')
    },[])

    const verificarUsuario = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-usuarios.php?key=c52f1bd66cc19d05628bd8bf27af3ad6&hash='+hash)
            let usuario = await res.json()
            if(typeof usuario !== 'undefined')
            {
                if(location.pathname == '/aprobar-usuarios' || location.pathname == '/configuracion')
                {
                    if(usuario[0].tipo !== 'admin'){ navigate('/menu') }
                }
                else if(location.pathname == '/'){ navigate('/menu') }
                setAutenticacion({
                    autenticado: true,
                    tipo: usuario[0].tipo,
                    id: usuario[0].id
                }) 
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    return { autenticacion }
}