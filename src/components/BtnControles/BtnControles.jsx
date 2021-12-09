import React from 'react'
import { Link } from 'react-router-dom'
import { UilAngleLeft } from '@iconscout/react-unicons'
import '../BtnControles/btncontroles.css'

const BtnControles = ({volver}) =>
{
    return(
        <Link to={volver}>
            <button className="btn-volver btn-controles">
                <UilAngleLeft size="80" color="#252A34"/>
            </button>
        </Link>
    )
}

export default BtnControles