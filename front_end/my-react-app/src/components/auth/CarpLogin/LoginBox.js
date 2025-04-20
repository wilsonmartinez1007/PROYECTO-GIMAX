import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginBox({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{
      width: "300px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      textAlign: "center"
    }}>
      <h2>Iniciar Sesión</h2>
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
        <button type="submit" style={{ padding: "2px", background: "grey", color: "white", borderRadius: 20 }}>
          Iniciar Sesión
        </button>
      </form>
      <button
        onClick={goToRegister}
        style={{ marginTop: "10px", padding: "2px", background: "blue", color: "white", borderRadius: 20 }}
      >
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default LoginBox;
