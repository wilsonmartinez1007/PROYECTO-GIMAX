import React, { useState } from "react";
import "./ClienteCard.css"; // para estilos personalizados

const ClienteCard = ({ cliente, onRutinasClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRutinasClick = () => {
    setMenuOpen(false);
    onRutinasClick(cliente);
  };

  return (
    <div className="cliente-card">
      <h2>{cliente.cliente_nombre}</h2>
      <p><strong>Rutina:</strong> {cliente.nombre_rutina}</p>
      <p><strong>Descripción:</strong> {cliente.descripcion_rutina}</p>

      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          ⋮
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <div className="menu-item" onClick={() => setMenuOpen(false)}>Diagnóstico</div>
            <div className="menu-item" onClick={() => setMenuOpen(false)}>Información Personal</div>
            <div className="menu-item" onClick={handleRutinasClick}>Rutinas</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteCard;
