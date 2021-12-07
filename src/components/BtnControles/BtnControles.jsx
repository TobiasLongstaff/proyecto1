import React from 'react'
import { Link } from 'react-router-dom'
import { UilAngleLeft } from '@iconscout/react-unicons'
import '../BtnControles/btncontroles.css'

const BtnControles = ({volver, continuar}) =>
{
    return(
        <footer className="container-controles">
            <Link to={volver}>
                <button className="btn-volver btn-controles">
                    <UilAngleLeft size="80" color="#252A34"/>
                </button>
            </Link>
            <Link to={continuar}>
                <button className="btn-continuar btn-controles"> </button>
            </Link>
        </footer>
    )
}

export default BtnControles