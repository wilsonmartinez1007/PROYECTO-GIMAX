import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterBox({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [cedula, setCedula] = useState("");
  const [apellido, setApellido] = useState("");
  const [role, setRole] = useState("");
  
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación rápida del lado del cliente
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (role === "") {
    alert("Por favor selecciona un tipo de usuario válido.");
    return;
  }
  onRegister(username, email, password, passwordConfirm, cedula, apellido, role );
    };

  return (
    <div
    /*
    Lo siguiente es para que se vea como un panel blanco y dentro esten los datos
    style={{
      width: "300px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      textAlign: "center"
    }}*/
      >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="text"
          placeholder="Cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        
        <select style={{marginBottom: "30px", padding: "8px",border: "none", borderRadius: 20,outline: "none"   }} //esto devo quitarlo 
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}>
          <option>Tipo de Usuario</option>
          <option value="cliente">Cliente</option>
          <option value="entrenador">Entrenador</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" style={{ marginBottom: "10px",padding: "2px", background: "#D3D3D3", color: "black", borderRadius: 20, borderColor: 'black',border: "2px solid black",outline: "none", width: "125px"  }}>
          Registrarme
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{marginBottom: "10px", padding: "2px", color: "#03a9f4", borderRadius: 20,border: "none",outline: "none",background: "transparent", textAlign: "left" }}>
          Volver a iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default RegisterBox;
