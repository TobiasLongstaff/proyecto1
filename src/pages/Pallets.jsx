import React from 'react'
import Nav from '../components/Navegacion/Nav'
import SvgBox from '../img/box-solid.svg'
import '../styles/cajas.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import BtnControles from '../components/BtnControles/BtnControles'
import BtnDeshacer from '../components/BtnDeshacer/BtnDeshacer'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useRecepcion } from '../hooks/useRecepcion'

const cookies = new Cookies()

const Pallets = () =>
{
    const { autenticacion } = useAutenticacion()
    const { infoPallet, changePallet, formPallet } = useRecepcion()

    const handelChange = e =>
    {
        changePallet(e.target.value)
    }

    if(autenticacion.autenticado)
        return(
            <article>
                <Nav titulo="Pallets"/>
                <main className="container-body">
                    <form className="container-form-cajas">
                        <label className="text-usuario animacion-2">Usuario: {cookies.get('nombre')}</label>
                        <input 
                            autoComplete="off" 
                            type="text" 
                            className="textbox-genegal textbox-escanear-codigo animacion-2" 
                            name="cod_pallet" 
                            onChange={handelChange} 
                            placeholder="Escanear Codigo"
                            value={formPallet.cod_pallet}
                            autoFocus
                        />
                        <label className="animacion-2">Pallet cargado: {infoPallet.pallet}</label>
                        <label className="animacion-2">Cantitad de cajas:</label>
                        <div className="container-contador-caja animacion-2">
                            <img src={SvgBox} alt="caja"/>
                            <div className="container-contador">
                                <label>{infoPallet.cantidad}</label>
                            </div>
                        </div>
                        <BtnDeshacer codigo={infoPallet.pallet} pantalla="pallet"/>
                        <BtnControles usuario={autenticacion.id}/>
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Pallets