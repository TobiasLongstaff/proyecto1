import React from 'react'
import { Link } from 'react-router-dom'
import { UilAngleLeft } from '@iconscout/react-unicons'
import '../BtnVolver/btnvolver.css'

const BtnVolver = ({volver}) =>
{
    return(
        <Link to={volver}>
            <button className="btn-volver btn-controles">
                <UilAngleLeft size="80" color="#252A34"/>
            </button>
        </Link>
    )
}

export default BtnVolver