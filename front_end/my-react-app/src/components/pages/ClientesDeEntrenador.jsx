import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ClientesDeEntrenador.css";
import RutinasModal from "./RutinasModal";
import EstadisticasCliente from "./EstadisticasCliente"; // Importa el nuevo componente

const ClientesDeEntrenador = ({ token }) => {
  const [clientes, setClientes] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  // viewMode puede ser "rutinas" o "estadisticas"
  const menuRef = useRef();

  // Carga inicial de clientes
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/entrenador/clientes/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Error al obtener los clientes", error));
  }, [token]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Al pulsar “Rutinas” en el menú desplegable
  const handleRutinas = (cliente) => {
    setSelectedClient(cliente);
    setViewMode("rutinas");
    setOpenMenuId(null);
  };

  // Al pulsar “Estadísticas” en el menú desplegable
  const handleEstadisticas = (cliente) => {
    setSelectedClient(cliente);
    setViewMode("estadisticas");
    setOpenMenuId(null);
  };

  // Cerrar cualquier vista (modal o stats)
  const handleCloseView = () => {
    setSelectedClient(null);
    setViewMode(null);
  };

  return (
    <div className="clientes-wrapper">
      <div className="clientes-header">
        <h1>Mis Clientes</h1>
      </div>

      <div className="clientes-content">
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <div className="cliente-card" key={cliente.cliente_id}>
              <div className="cliente-header">
                <h2>{cliente.cliente_nombre}</h2>
                <button
                  className="menu-button"
                  onClick={() => handleMenuToggle(cliente.cliente_id)}
                >
                  &#x22EE;
                </button>
                {openMenuId === cliente.cliente_id && (
                  <ul className="dropdown-menu" ref={menuRef}>
                    <li className="disabled">Diagnóstico</li>
                    <li className="disabled">Información personal</li>
                    <li onClick={() => handleRutinas(cliente)}>Rutinas</li>
                    <li onClick={() => handleEstadisticas(cliente)}>Estadísticas</li>
                  </ul>
                )}
              </div>
              <p>
                <strong>Rutina:</strong> {cliente.nombre_rutina}
              </p>
              <p>
                <strong>Descripción:</strong> {cliente.descripcion_rutina}
              </p>
            </div>
          ))
        ) : (
          <p className="no-clientes">No tienes clientes asignados.</p>
        )}
      </div>

      {/* Renderiza RutinasModal o EstadisticasCliente según viewMode */}
      {selectedClient && viewMode === "rutinas" && (
        <RutinasModal
          token={token}
          cliente={selectedClient}
          onClose={handleCloseView}
        />
      )}

      {selectedClient && viewMode === "estadisticas" && (
        <div className="stats-container">
          <button className="close-stats" onClick={handleCloseView}>
            ✖
          </button>
          <EstadisticasCliente
            token={token}
            clientId={selectedClient.cliente_id}
          />
        </div>
      )}
    </div>
  );
};

export default ClientesDeEntrenador;
