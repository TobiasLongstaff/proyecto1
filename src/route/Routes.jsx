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
import Preparacion from '../pages/Preparacion'
import TablaProductos from '../pages/TablaProductos'
import Eliminar from '../pages/Eliminar'
import AprobarUsuarios from '../pages/AprobarUsuarios'
import Pedidos from '../pages/Pedidos'
import Preparados from '../pages/Preparados'
import ProductosPedidos from '../pages/ProductosPedidos'
import ProductosPreparados from '../pages/ProductosPreparados'
import Configuracion from '../pages/Configuracion'
import PdfEtiqueta from '../pages/PdfEtiqueta'
import Devolucion from '../pages/Devolucion'
import AsociarPedido from '../pages/AsociarPedido'
import AsociarCodigo from '../pages/AsociarCodigo'
import CajasFaltantes from '../pages/CajasFaltantes'
import Stock from '../pages/Stock'


function Rutas() 
{
    return (
        <BrowserRouter>
            <Routes>
                {/* Usuario */}
                <Route exact path="/" element={<Login/>} />
                <Route exact path="registrarse" element={<Registro/>} /> 
                <Route exact path="menu" element={<Menu/>} /> 
                {/* Recepcion */}
                <Route exact path="recepcion" element={<Recepcion/>} />
                <Route exact path="opciones-recepcion" element={<SubMenuRecepcion/>} />    
                {/* --Op */}
                <Route exact path="pallets" element={<Pallets/>} />
                <Route exact path="cajas" element={<Cajas/>} />
                
                <Route exact path="productos" element={<Productos/>} />
                <Route exact path="preparar-productos" element={<PrepararProductos/>} />
                <Route exact path="preparacion" element={<Preparacion/>} />
                <Route exact path="tabla-productos" element={<TablaProductos/>} />
                <Route exact path="eliminar" element={<Eliminar/>} />
                <Route exact path="pedidos" element={<Pedidos/>} />
                <Route exact path="preparados" element={<Preparados/>} />
                <Route exact path="aprobar-usuarios/:mail/:hash/:nombre" element={<AprobarUsuarios/>} />
                <Route exact path="productos-pedidos/:id_pedido" element={<ProductosPedidos/>} />
                <Route exact path="productos-preparados/:id_pedido" element={<ProductosPreparados/>} />
                <Route exact path="configuracion" element={<Configuracion/>} />
                <Route exact path="etiqueta/:id_pedido" element={<PdfEtiqueta/>} />
                <Route exact path="devolucion" element={<Devolucion/>} />
                <Route exact path="asociar-pedido" element={<AsociarPedido/>} />
                <Route exact path="asociar-codigo" element={<AsociarCodigo/>} />
                <Route exact path="cajas-faltantes" element={<CajasFaltantes/>} />
                <Route exact path="stock" element={<Stock/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas
