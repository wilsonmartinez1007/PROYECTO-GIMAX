import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ClientesDeEntrenador.css";
import RutinasModal from "./RutinasModal";
import EstadisticasCliente from "./EstadisticasCliente";

const ClientesDeEntrenador = ({ token }) => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const menuRef = useRef();

  // Carga inicial de clientes
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/entrenador/clientes/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setClientes(response.data);
        setFilteredClientes(response.data);
      })
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

  // Filtrado de búsqueda
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredClientes(clientes);
      return;
    }
    setFilteredClientes(
      clientes.filter((c) =>
        c.cliente_nombre.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleRutinas = (cliente) => {
    setSelectedClient(cliente);
    setViewMode("rutinas");
    setOpenMenuId(null);
  };

  const handleEstadisticas = (cliente) => {
    setSelectedClient(cliente);
    setViewMode("estadisticas");
    setOpenMenuId(null);
  };

  const handleCloseView = () => {
    setSelectedClient(null);
    setViewMode(null);
  };

  return (
    <div className="clientes-wrapper">
      {/* Header */}
      <div className="clientes-header">
        <h1>Mis Clientes</h1>
      </div>

      {/* Buscador */}
      <div className="clientes-search-container">
        <input
          type="text"
          placeholder="Buscar cliente por nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="clientes-search"
        />
      </div>

      {/* Listado de tarjetas */}
      <div className="clientes-content">
        {filteredClientes.length > 0 ? (
          filteredClientes.map((cliente) => (
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
                    <li onClick={() => handleEstadisticas(cliente)}>
                      Estadísticas
                    </li>
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
          <p className="no-clientes">No hay clientes que coincidan.</p>
        )}
      </div>

      {/* Modal de Rutinas */}
      {selectedClient && viewMode === "rutinas" && (
        <RutinasModal
          token={token}
          cliente={selectedClient}
          onClose={handleCloseView}
        />
      )}

      {/* Panel de Estadísticas */}
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
