import React from 'react'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Registro from '../pages/Registro'
import Recepcion from '../pages/Recepcion'
import Cajas from '../pages/Cajas'
import Productos from '../pages/Productos'
import SubMenuRecepcion from '../pages/SubMenuRecepcion'
import Pallets from '../pages/Pallets'
import PrepararProductos from '../pages/PrepararProductos'

function Rutas() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="menu" element={<Menu/>} /> 
                <Route exact path="opciones-recepcion" element={<SubMenuRecepcion/>} />    
                <Route exact path="registrarse" element={<Registro/>} /> 
                <Route exact path="recepcion" element={<Recepcion/>} />
                <Route exact path="cajas" element={<Cajas/>} />
                <Route exact path="pallets" element={<Pallets/>} />
                <Route exact path="preparacion" element={<Productos/>} />
                <Route exact path="preparar-productos" element={<PrepararProductos/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas
