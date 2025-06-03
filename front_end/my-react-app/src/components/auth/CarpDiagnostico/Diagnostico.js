import React from "react";
import DiagnosticoBox from "./DiagnosticoBox";

function Diagnostico({}) {
  const token = localStorage.getItem("token");
  const handleDiagnostico = async (edad,peso,altura,sexo,imc, porcentaje_grasa, actividad_fisica, objetivo_principal, tiempo_estimado, sesiones_por_semana,
        tiempo_por_sesion, descansos, experiencia, nivel_fuerza, nivel_resistencia, flexibilidad, lesion_trauma, tipo_cuerpo) => {
          const response = await fetch("http://127.0.0.1:8000/api/registrar-diagnostico/", {
          method: "POST",
          headers: { "Content-Type": "application/json",
                     "Authorization": `Token ${token}`,
           },
          body: JSON.stringify({
            edad,peso,altura,sexo,imc,porcentaje_grasa, actividad_fisica, 
            objetivo_principal, tiempo_estimado, sesiones_por_semana,
            tiempo_por_sesion, descansos, experiencia, nivel_fuerza, 
            nivel_resistencia, flexibilidad, lesion_trauma, tipo_cuerpo
          }),
    });
    
  };
    //apiii
  return <DiagnosticoBox onDiagnostico={handleDiagnostico} />;
}

export default Diagnostico;
