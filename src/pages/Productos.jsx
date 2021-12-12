import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Navegacion/Nav'
import BtnControles from '../components/BtnControles/BtnControles'
import '../styles/productos.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const Productos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const textboxCodigo = React.createRef()

    useEffect(()=>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            textboxCodigo.current.focus()
        }
    })

    if(idsession)
        return(
            <article>
                <Nav titulo="Productos"/>
                <main className="container-body">
                    <form className="container-form">
                        <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                        <label>Codigo de Caja: 1000000</label>
                        <input type="text" ref={textboxCodigo} className="textbox-genegal textbox-escanear-codigo" placeholder="Escanear Codigo"/>
                        <div className="container-info-productos">
                            <div>
                                <label>Fecha Vencimiento</label>
                                <input type="date" className="textbox-genegal textbox-date" required/>
                            </div>
                            <input type="text" className="textbox-genegal textbox-peso" placeholder="Peso"/>
                        </div>
                        <textarea className="textbox-genegal textarea-general" placeholder="Descripcion"></textarea>
                        <footer className="container-controles">
                            <BtnControles volver="/menu"/>
                            <button type="submit" className="btn-continuar btn-controles"></button> 
                        </footer> 
                    </form>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Productos