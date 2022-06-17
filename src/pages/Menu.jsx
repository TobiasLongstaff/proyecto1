import React from 'react'
import '../styles/menu.css'
import {useAutenticacion} from '../hooks/useAutenticacion'
import MenuDescktop from '../components/MenuDescktop/MenuDescktop'
import MenuMovil from '../components/MenuMovil/MenuMovil'
import Loading from '../components/Loading/Loading'

const Menu = () =>
{
    const { autenticacion } = useAutenticacion()

    if(autenticacion.autenticado)
        if(autenticacion.tipo == 'admin' || autenticacion.tipo == 'estandar')
            return(<MenuDescktop/>)
        return(<MenuMovil/>)     
    return(<Loading/>)        
}

export default Menu