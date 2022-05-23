import React from 'react'
import { UilSignout } from '@iconscout/react-unicons'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const cookies = new Cookies()

const BtnCerrarSesion = ({color}) =>
{
    let navigate = useNavigate();
    const CerrarSesion = () =>
    {
        Swal.fire(
        {
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro que queres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar Sesión'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                cookies.remove('hashSession')
                cookies.remove('nombre')
                cookies.remove('mail')
                navigate('/')
            }
        })
    }

    return(
        <button onClick={CerrarSesion} type="button" className="btn-nav-menu">
            <UilSignout size="32" color={color}/>
        </button>
    )
}

export default BtnCerrarSesion