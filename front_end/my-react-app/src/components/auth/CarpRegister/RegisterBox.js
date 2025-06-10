import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterBox({ onRegister, onGym, gimnasios }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [cedula, setCedula] = useState("");
  const [apellido, setApellido] = useState("");
  const [role, setRole] = useState("");

  const [selectedGym, setSelectedGym] = useState(""); // Nuevo estado para gimnasio
  
  const navigate = useNavigate();
  useEffect(() => {
   onGym(); // Llama a la función para obtener gimnasios cuando se monte
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación rápida del lado del cliente
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    setRole("Cliente")
    onRegister(username, email, password, passwordConfirm, cedula, apellido, role );
    };
  
  return (
    <div
    /*---->podria agregar otro campo usuario que sea unico paar inciar sesion y nombre que ya sea el que se muestra en perfilusuario





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
          placeholder="Apellidos"
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
        
        <select
          style = {{marginBottom: "10px", padding: "8px", borderRadius: 20,border: "none", width:"106px"  }}
          value={selectedGym} onChange={(e) => setSelectedGym(e.target.value)}>
            <option 
            value="">Gimnasios</option>
            {gimnasios.map((gim) => (
              <option key={gim.id} value={gim.id}>
                {gim.name}
              </option>
            ))}
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600" 
          type="submit" style={{ padding: "5px",marginBottom: "10px", borderRadius: 20,outline: "none", border: "none",width: "105px"  }}>
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
