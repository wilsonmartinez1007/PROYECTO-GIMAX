import React from "react";
import DiagnosticoBox from "./DiagnosticoBox";

function Diagnostico({}) {
  const handleDiagnostico = async (edad,peso,altura,sexo,imc, grasaCor, acFisica, objetivo, tiempoEstimado, cantSesiones,
        tiempoPorSesion, descansos, experiencia, nivelFuerza, nivelResistencia, movimiento, lesion, tipoCuerpo) => {
    
  };
    //apiii
  return <DiagnosticoBox onDiagnostico={handleDiagnostico} />;
}

export default Diagnostico;
