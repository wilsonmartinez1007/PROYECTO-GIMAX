import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORTANTE

function RegisterBox({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, password);
  };
//cambie aquie todo
  return (
    <div style={{
      width: "300px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      textAlign: "center"
    }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        
        <button type="submit" style={{ padding: "6px", background: "grey", color: "white", borderRadius: 20 }}>
          Registrarme
        </button>
        
        {/* Botón corregido */}
        <button 
          type="button"
          onClick={() => navigate("/login")} 
          style={{ padding: "6px", background: "grey", color: "white", borderRadius: 20, marginTop: "10px" }}>
          Volver a iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default RegisterBox;
