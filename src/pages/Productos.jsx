import React from 'react'
import Nav from '../components/Navegacion/Nav'
import BtnControles from '../components/BtnControles/BtnControles'
import '../styles/productos.css'

const Productos = () =>
{
    return(
        <article>
            <Nav titulo="Productos"/>
            <main className="container-body">
                <form className="container-form">
                    <label className="text-usuario">Usuario: Prueba</label>
                    <label>Codigo de Caja: 1000000</label>
                    <input type="text" className="textbox-genegal" placeholder="Escanear Codigo"/>
                    <div className="container-info-productos">
                        <div>
                            <label>Fecha Vencimiento</label>
                            <input type="date" className="textbox-genegal textbox-date" required/>
                        </div>
                        <input type="text" className="textbox-genegal textbox-peso" placeholder="Peso"/>
                    </div>
                    <textarea className="textbox-genegal textarea-general" placeholder="Descripcion"></textarea>
                </form>
                <BtnControles volver="/cajas" continuar="/menu"/>
            </main>
        </article>
    )
}

export default Productos