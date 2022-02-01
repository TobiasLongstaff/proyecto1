import React, { useEffect } from 'react'

const Etiqueta = () =>
{
    useEffect(() =>
    {
        if(typeof window.orientation !== "undefined")
        {
            document.getElementById('enlaceDescargarPdf').click();
            window.close();
        }
    })

    return(
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
            <object
            data="prueba.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
            >
                <br />
                <a href="prueba.pdf" id="enlaceDescargarPdf" download="prueba.pdf">
                    Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo
                </a>
            </object>
        </div>
    )
}

export default Etiqueta