import React,{ useEffect, useState } from 'react'
import ohrapampa from '../img/ohrapampa.png'
import '../styles/etiqueta.css'
import { useNavigate, useParams } from "react-router-dom";
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies()

const PdfEtiqueta = () => 
{
    const [data, setData] = useState([])
    let navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    let { id_pedido }  = useParams()
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            fetchResource()
        }
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
                <main>
                    <div className="container-info-etiqueta">
                        <div className="container-img-etiqueta">
                            <img src={ohrapampa} className="img-etiqueta"></img>
                        </div>
                        <div className="container-info-cliente-etiqueta">
                            <label>Num pedido: {data[0].num_pedido}</label>
                            <label>Direccion: {data[0].direccion}</label>
                            <label>Cliente: {data[0].cliente}</label>
                            <label>Peso total: {data[0].peso_total}</label>
                        </div>
                    </div>
                    <h1 className="text-titulo-etiqueta">COMBO CELEBRACION</h1>
                    {data.map((fila) =>
                    (
                        <h2 key={fila.id}>{fila.descripcion}..............{fila.cantidad}UNITS</h2>  
                    ))}           
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}     

export default PdfEtiqueta