import React from "react";
import '../styles/recepcion.css'
import Nav from '../components/Navegacion/Nav'
import BtnControles from "../components/BtnControles/BtnControles";

const Recepcion = () =>
{
    return(
        <article>
            <Nav titulo="Recepcion"/>
            <main className="container-body">
                <form className="container-form">
                    <label className="text-usuario">Usuario: Prueba</label>
                    <input type="text" className="textbox-genegal" placeholder="N° Documento" required/>
                    <div>
                        <label>Fecha del documento</label>
                        <input type="date" className="textbox-genegal" required/>                    
                    </div>
                    <div>
                        <label>Fecha de llegada</label>
                        <input type="date" className="textbox-genegal" disabled required/>                    
                    </div>
                    <textarea className="textbox-genegal textarea-general" placeholder="Observacion"></textarea>                    
                </form>
                <BtnControles volver="/menu" continuar="/cajas" />
            </main>
        </article>
    )
}

export default Recepcion