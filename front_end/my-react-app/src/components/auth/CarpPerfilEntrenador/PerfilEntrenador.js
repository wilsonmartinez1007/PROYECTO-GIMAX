import React, { useState } from "react";
import PerfilEntrenadorBox from "./PerfilEntrenadorBox";

const PerfilEntrenador = ({ subirImagen, seccion }) => {
  const [formularioCompleto, setFormularioCompleto] = useState({});

const manejarCambioDatos = (datos) => {
  setFormularioCompleto(prev => ({
    ...prev,
    ...datos
  }));
};

  const manejarEnvio = async () => {
    try {
      const formData = new FormData();

      // Adjuntar imagen si está disponible (verifica si es una URL temporal o un archivo real)
      if (subirImagen) {
        formData.append("imagen", subirImagen);
      }
      

      // Agregar todos los campos del formulario al FormData
      for (const key in formularioCompleto) {
        if (["imagen_perfil", "certificaciones", "especialidades"].includes(key)) continue;

        const valor = formularioCompleto[key];
        if (Array.isArray(valor)) {
          valor.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        } else {
          formData.append(key, valor);
        }
      }
      // ✅ Agregar manualmente los campos especiales:
      if (formularioCompleto.certificaciones instanceof File) {
        formData.append("certificaciones", formularioCompleto.certificaciones);
      }

      if (Array.isArray(formularioCompleto.especialidades)) {
        formData.append("especialidades", JSON.stringify(formularioCompleto.especialidades));
      }

      // Realizar POST al backend Django
      const token = localStorage.getItem("token");
      const respuesta = await fetch("http://localhost:8000/api/perfil-entrenador/", {
        method: "POST",
        body: formData,
        headers: {
                     "Authorization": `Token ${token}`,
           },
      });
      
      const textoRespuesta = await respuesta.text(); // leer como texto sin parsear

      if (respuesta.ok) {
        alert("Perfil enviado correctamente");
      } else {
        alert("Error al enviar el perfil: " + textoRespuesta);
        console.error("Error al enviar perfil:", textoRespuesta);
      }
    } catch (error) {
      alert("Error en el envío: " + error.message);
      console.error(error);
    }
    
  
  };

  return (
    <div>
      {/* Muestra el contenido dinámico según la sección */}
      <PerfilEntrenadorBox seccion={seccion} onDatosChange={manejarCambioDatos} />

      {/* Botón para enviar al backend */}
      <button
        onClick={manejarEnvio}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Guardar Perfil
      </button>
    </div>
  );
};

export default PerfilEntrenador;
