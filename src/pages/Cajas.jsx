import React from 'react'
import Nav from '../components/Navegacion/Nav'
import BtnControles from '../components/BtnControles/BtnControles'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'

const Cajas = () =>
{
    return(
        <article>
            <Nav titulo="Cajas"/>
            <main className="container-body">
                <form className="container-form-cajas">
                    <label className="text-usuario">Usuario: Prueba</label>
                    <input type="text" className="textbox-genegal textbox-escanear-codigo" placeholder="Escanear Codigo"/>
                    <div className="container-contador-caja">
                        <img src={SvgBox} alt="caja"/>
                        <div className="container-contador">
                            <label>30</label>
                        </div>
                    </div>
                    <footer className="container-controles">
                        <BtnControles volver="/menu"/>
                    </footer> 
                </form>
            </main>
        </article>
    )
}

export default Cajas