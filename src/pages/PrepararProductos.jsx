import React, { useEffect } from 'react'
import Nav from '../components/Navegacion/Nav'
import { UilUploadAlt} from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import BtnVolver from '../components/BtnVolver/BtnVolver'
import '../styles/preparacionProductos.css'
import Cookies from 'universal-cookie'
import FilasTabla from '../components/FilasTabla/FilasTabla'
import url from '../services/Settings'
import useFetchGET from '../hooks/useFetchGET'

const cookies = new Cookies()

const PrepararProductos = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const { data } = useFetchGET(`${url+'obtener-productos-activos.php'}`)

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
    },[])

    return(
        <article>
            <Nav titulo="Productos"/>
            <main className="container-body">
                <div className="container-form-cajas">
                    <label className="text-usuario">Usuario: {cookies.get('nombre')}</label>
                    <label>Productos escaneados:</label>
                    <div>
                        <div className="tbl-header">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Descripcion</th>
                                        <th className="td-btn">Controles</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content">
                            <table>
                                <tbody>
                                    { data.map((fila) =>
                                    (
                                        <FilasTabla
                                            key={fila.id}
                                            {...fila}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>                        
                    </div>
                    <footer className="container-controles">
                        <BtnVolver volver="/preparacion"/>
                        <button type="button" className="btn-continuar btn-controles">
                            <UilUploadAlt size="60" color="white"/>
                        </button> 
                    </footer> 
                </div>
            </main>
        </article>
    )
}

export default PrepararProductos