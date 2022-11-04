import React, { useEffect, useState } from "react";
import NavDektop from "../components/NavegacionDesktop/NavDesktop";
import { Link } from "react-router-dom";
import url from "../services/Settings";
import {
  UilExclamationCircle,
  UilPackage,
  UilPrint,
  UilCheckCircle,
} from "@iconscout/react-unicons";
import { useAutenticacion } from "../hooks/useAutenticacion";
import Loading from "../components/Loading/Loading";

const Preparados = () => {
  const { autenticacion } = useAutenticacion();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {
    try {
      let res = await fetch(url + "obtener-pedidos-preparados.php");
      let datos = await res.json();
      if (typeof datos !== "undefined") {
        setData(datos);
        setLoading(false);
      }
      console.log(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const imprimir = (id_pedido) => {
    let ventana = window.open(
      "http://pampa.parcelpicker.com.ar/etiqueta/" + id_pedido,
      "PRINT",
      "height=600,width=1000"
    );
    // let ventana = window.open(
    //   "http://localhost:3000/etiqueta/" + id_pedido,
    //   "PRINT",
    //   "height=600,width=1000"
    // );
    ventana.document.close();
    ventana.focus();
    ventana.onload = setTimeout(function () {
      ventana.print();
    }, 2000);
  };

  if (autenticacion.autenticado)
    return (
      <article>
        <NavDektop titulo="Preparados" />
        <main className="container-page-web">
          <div className="tbl-header-web">
            <table>
              <thead>
                <tr className="tr-head-web">
                  <th className="th-cant-web">#</th>
                  <th className="th-cant-web">ID</th>
                  <th>Cliente</th>
                  <th>Direccion</th>
                  <th>Ciudad</th>
                  <th className="th-estado">Estado</th>
                  <th className="th-controles">Controles</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content-web">
            <table>
              <tbody>
                {loading ? (
                  <tr className="tr-load">
                    <td>
                      <div className="loader">Loading...</div>
                    </td>
                  </tr>
                ) : (
                  data.map((fila) => (
                    <tr key={fila.id} className="tr-web">
                      <td className="td-cant-web">{fila.num_pedido}</td>
                      <td className="td-cant-web">{fila.id_pedido}</td>
                      <td className="text-tabla-desc">
                        <p>{fila.cliente}</p>
                      </td>
                      <td className="text-tabla-desc">
                        <p>{fila.direccion}</p>
                      </td>
                      <td>{fila.ciudad}</td>
                      <td className="td-estado">
                        {fila.estado == 1 ? (
                          <UilExclamationCircle size="25" color="#ff7777" />
                        ) : (
                          <UilCheckCircle size="25" color="#23e780" />
                        )}
                      </td>
                      <td className="td-controles">
                        <Link to={"/productos-preparados/" + fila.id}>
                          <button className="btn-tabla-productos">
                            <UilPackage size="25" color="white" />
                          </button>
                        </Link>
                        <button
                          className="btn-tabla-imprimir"
                          onClick={() => imprimir(fila.id)}
                        >
                          <UilPrint size="25" color="white" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </article>
    );
  return <Loading />;
};

export default Preparados;
