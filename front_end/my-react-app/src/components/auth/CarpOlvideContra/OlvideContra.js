import React from "react";
import OlvideContraBox from "./OlvideContraBox";

function OlvideContraseña() {


  const handleBuscar = async (cedula) => {
    const response = await fetch("http://127.0.0.1:8000/api/buscar-usuario/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (response.ok) {
      alert(`Correo encontrado: ${data.email}`); 
    } else {
      alert(data.error || "Cédula no encontrada");
    }
  };

  return <OlvideContraBox onBuscar={handleBuscar} />;
}

export default OlvideContraseña;
