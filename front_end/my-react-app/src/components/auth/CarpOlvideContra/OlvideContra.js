import {React, useState} from "react";
import OlvideContraBox from "./OlvideContraBox";

function OlvideContraseña() {
  const [email, setEmail] = useState("");
  
  const handleBuscar = async (cedula) => {
    const response = await fetch("http://127.0.0.1:8000/api/buscar-usuario/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });
  

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
    if (response.ok && data.email) {
      setEmail(data.email);
      alert(`Correo fue encontraduuuu: ${data.email}`);
      return true;
    } else {
      alert("Cédula no encontrada");
      return false;
    }
  };
  const handleCodigo = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/codigo/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const data = await response.json();
  console.log("Código generado:", data.codigo);
  return data.codigo;      // importante: retornar el código
  };

  const handleCambiarContraseña = async (cedula, nuevaContraseña) => {
    const response = await fetch("http://127.0.0.1:8000/api/cambiar-contraseña/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula: cedula, nueva_contraseña: nuevaContraseña }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Contraseña actualizada con éxito");
    } else {
      alert(data.error || "Error al cambiar la contraseña");
    }
  };
  return <OlvideContraBox onBuscar={handleBuscar} email={email} onCodigo = {handleCodigo} OnCambiarContra = {handleCambiarContraseña}/>;
}

export default OlvideContraseña;
