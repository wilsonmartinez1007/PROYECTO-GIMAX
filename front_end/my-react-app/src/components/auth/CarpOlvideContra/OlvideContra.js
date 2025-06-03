import {React, useState} from "react";
import OlvideContraBox from "./OlvideContraBox";
import { data } from "react-router-dom";

function OlvideContraseña() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  
  const handleBuscar = async (cedula) => {
    const response = await fetch("http://127.0.0.1:8000/api/buscar-usuario/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });
  

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
 
    if (response.ok) {
      setEmail(data.email)
      alert(`Correo encontrado: ${data.email}`); 
    } else {
      alert(data.error || "Cédula no encontrada");
    }
  };
  const handleCodigo = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/codigo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // cuerpo vacío
    });

    const data = await response.json();
    console.log("Código generado:", data.codigo);
    alert(`Cdodigo: ${data.codigo}`)
    setCodigo(data.codigo)
  };
  return <OlvideContraBox onBuscar={handleBuscar} email={email} onCodigo = {handleCodigo} codigo ={codigo}/>;
}

export default OlvideContraseña;
