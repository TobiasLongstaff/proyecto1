import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Registro from '../pages/Registro'
import Recepcion from '../pages/Recepcion'
import Cajas from '../pages/Cajas'
import Productos from '../pages/Productos'

function Rutas() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="menu" element={<Menu/>} />     
                <Route exact path="registrarse" element={<Registro/>} /> 
                <Route exact path="recepcion" element={<Recepcion/>} />
                <Route exact path="cajas" element={<Cajas/>} />
                <Route exact path="productos" element={<Productos/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas
