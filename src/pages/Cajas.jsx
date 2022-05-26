import React from 'react'
import Nav from '../components/Navegacion/Nav'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'
import Loading from '../components/Loading/Loading'
import BtnControles from '../components/BtnControles/BtnControles'
import BtnDeshacer from '../components/BtnDeshacer/BtnDeshacer'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useRecepcion } from '../hooks/useRecepcion'

const Cajas = () =>
{
    const { autenticacion } = useAutenticacion()
    const { changeCaja, formCaja, infoCaja } = useRecepcion()

    const handelChange = e =>
    {
        changeCaja(e.target.value)
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Cajas"/>
                <main className="container-body">
                    <form className="container-form-cajas">
                        <label className="animacion-1">Codigo Caja: {infoCaja.cod_caja}</label>
                        <input 
                            autoComplete="off" 
                            type="text" 
                            className="textbox-genegal textbox-escanear-codigo animacion-1" 
                            name="cod_caja" 
                            onChange={handelChange} 
                            placeholder="Escanear Codigo" 
                            autoFocus
                            value={formCaja.cod_caja}
                        />
                        <label className="animacion-1">Codigo Pallet: {infoCaja.cod_pallet}</label>
                        <p className="animacion-1">Descripcion: {infoCaja.descripcion}</p>
                        <label className="animacion-1">Kilos: {infoCaja.kilos}</label>
                        <label className="animacion-1">Vencimiento: {infoCaja.vencimiento}</label>
                        <div className="container-cantidad animacion-1">
                            <label>Cantitad:</label>
                            <div className="container-contador-caja">
                                <img src={SvgBox} alt="caja"/>
                                <div className="container-contador">
                                    <label>{infoCaja.cantidad}</label>
                                </div>
                            </div>
                        </div>
                        <BtnDeshacer pantalla="caja" codigo={infoCaja.cod_caja}/>
                        <BtnControles usuario={autenticacion.id} />
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Cajas