import React, { useEffect, useRef, useState } from 'react'
import BtnCerrarSesion from '../BtnCerrarSesion/BtnCerrarSesion'
import { UilSetting } from '@iconscout/react-unicons'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const cookies = new Cookies()

const NavDektop = ({titulo}) =>
{
    let navigate = useNavigate()
    const [btnColor, setBtnColor] = useState('#ffff')
    const btnConfig = useRef()

    useEffect(() =>
    {
        if(cookies.get('tipo') == 'admin')
        {
            setBtnColor('#252A34')
        }
        else
        {
            btnConfig.current.disabled = 'true'
        }
    })

    const handelClick = () =>
    {
        navigate('/configuracion')
    }
    
    return(
        <nav className="animacion-1">
            <BtnCerrarSesion color="#252A34"/>
            <h1>{titulo}</h1>
            <button ref={btnConfig} type="button" onClick={handelClick} className="btn-nav-menu">
                <UilSetting size="32" color={btnColor}/>
            </button>
        </nav>
    )
}

export default NavDektop