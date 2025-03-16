import React, { useState } from "react";

function LoginBox({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
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
        <button type="submit" style={{ padding: "2px", background: "grey", color: "white", borderRadius: 20 }}>
          No tienes cuenta? Registrate
        </button>
      </form>
    </div>
  );
}

export default LoginBox;
