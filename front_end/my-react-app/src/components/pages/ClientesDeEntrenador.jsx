import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientesDeEntrenador.css";

const ClientesDeEntrenador = ({ token }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/entrenador/clientes/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes", error);
      });
  }, [token]);

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Mis Clientes</h1>
      </div>
      <div className="clientes-content">
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <div className="cliente-card" key={cliente.cliente_id}>
              <h2>{cliente.cliente_nombre}</h2>
              <p><strong>Rutina:</strong> {cliente.nombre_rutina}</p>
              <p><strong>Descripción:</strong> {cliente.descripcion_rutina}</p>
            </div>
          ))
        ) : (
          <p className="no-clientes">No tienes clientes asignados.</p>
        )}
      </div>
    </div>
  );
};

export default ClientesDeEntrenador;
