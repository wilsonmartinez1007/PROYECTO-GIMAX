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
  const goToRecuperar = () => {
    navigate("/RecuperarContraseña");
  };
  

  return (
    <div>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "30px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
        />
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
          type="submit" style={{ marginBottom: "10px",padding: "6px", color: "black", borderRadius: 20, borderColor: 'black',border: "none",outline: "none", width: "125px" }}>
          Iniciar Sesión
        </button>
        <button
         onClick={goToRegister}
         type="submit" style={{marginBottom: "10px", padding: "2px", color: "#03a9f4", borderRadius: 20,border: "none",outline: "none",background: "transparent", textAlign: "left" }}>
          No tienes cuenta? Registrate
        </button>
        <button 
         onClick={goToRecuperar}
         type="submit" style={{ marginBottom: "10px", padding: "2px", color: "#03a9f4", borderRadius: 20,border: "none",outline: "none",background: "transparent",textAlign: "left"  }}>
         Olvide mi contraseña
        </button>
      </form>
    </div>
  );
}

export default LoginBox;
