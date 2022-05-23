import React,{ useEffect, useState } from 'react'
import ohrapampa from '../img/ohrapampa.png'
import '../styles/etiqueta.css'
import { useParams } from "react-router-dom"
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import QRCode from 'react-qr-code'
import { useAutenticacion } from '../hooks/useAutenticacion'

const cookies = new Cookies()

const PdfEtiqueta = () => 
{
    const { autenticacion } = useAutenticacion()
    const [data, setData] = useState([])
    const [ loading, setLoading ] = useState(true)
    let { id_pedido }  = useParams()

    useEffect(() =>
    {
        fetchResource()
    },[])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-productos-pedidos.php?id='+id_pedido)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    if(!loading)
        return(
            <article className="container-etiqueta">
                <main className="container-body-etiqueta">
                    <div className="container-info-etiqueta">
                        <div className="container-img-etiqueta">
                            <img src={ohrapampa} className="img-etiqueta"></img>
                        </div>
                        <div className="separador"></div>
                        <div className="container-info-cliente-etiqueta">
                            <label>Numero de pedido: {data[0].num_pedido}</label>
                            <label>Cliente: {data[0].cliente}</label>
                            <label>Direccion: {data[0].direccion}</label>
                            <label>Codigo postal: {data[0].cod_postal}</label>
                            <label>Telefono: {data[0].telefono}</label>
                            <label>Ciudad: {data[0].ciudad}</label>
                        </div>
                    </div>
                    <h1 className="text-titulo-etiqueta">COMBO PERSONALIZADO</h1>
                    <div className="container-info-cortes">
                        {data.map((fila) =>
                        (
                            <label className="text-corte" key={fila.id}>{fila.cantidad} - {fila.descripcion}</label>  
                        ))}                     
                    </div>
                    <div className="container-footer-etiqueta">
                        <QRCode value={data[0].cod_pedido} size={100} bgColor="#00000" fgColor="#fff" level="H" />
                        <div className="container-text-peso">
                            <label>Peso total: {data[0].peso_total}</label>  
                        </div>        
                    </div>
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}     

export default PdfEtiqueta