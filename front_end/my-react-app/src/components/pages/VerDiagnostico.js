import React, { useState, useEffect } from "react";
import fondo from "../../assets/FotoRegister.jpg";
import "./Home1.css";

function VerDiagnostico() {
  const [usuarios, setUsuarios] = useState([]);
  const [diagnostico, setDiagnostico] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/usuarios/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Hubo un problema con la petición:", error));
  }, []);

  const cargarDiagnostico = (userId) => {
    fetch(`http://localhost:8000/api/diagnostico/${userId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Diagnóstico no encontrado");
        }
        return response.json();
      })
      .then((data) => setDiagnostico(data))
      .catch((error) => {
        console.error("Error al obtener el diagnóstico:", error);
        setDiagnostico(null);
      });
  };

  return (
    <div className="outer-container">
      <nav className="navbar">
        <h1 className="logo" style={{ fontSize: "40px", fontWeight: "bold" }}>
          GYMAX
        </h1>
      </nav>

      <div className="inner-container" style={{ display: "flex", gap: "40px" }}>
        <img
          style={{ borderRadius: 20, height: 400 }}
          src={fondo}
          alt="Fondo"
          className="main-image"
        />

        <div className="text-container">
          <h2>Lista de Usuarios</h2>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                <div className="button-container">
                  <button className="button" onClick={() => cargarDiagnostico(usuario.id)}>
                    {usuario.username}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {diagnostico && (
  <div className="diagnostico-box-doble">
    <h3>Diagnóstico de {diagnostico.user}</h3>

    <div className="columnas">
      {/* Columna izquierda */}
      <div className="columna">
        <p><strong>Edad:</strong> {diagnostico.edad}</p>
        <p><strong>Peso:</strong> {diagnostico.peso} kg</p>
        <p><strong>Altura:</strong> {diagnostico.altura} m</p>
        <p><strong>IMC:</strong> {diagnostico.imc}</p>
        <p><strong>Grasa corporal:</strong> {diagnostico.porcentaje_grasa}%</p>
        <p><strong>Sexo:</strong> {diagnostico.sexo}</p>
        <p><strong>Actividad física:</strong> {diagnostico.actividad_fisica}</p>
        <p><strong>Objetivo principal:</strong> {diagnostico.objetivo_principal}</p>
        <p><strong>Tiempo estimado:</strong> {diagnostico.tiempo_estimado}</p>
        <p><strong>Sesiones por semana:</strong> {diagnostico.sesiones_por_semana}</p>
      </div>

      {/* Columna derecha */}
      <div className="columna">
        <p><strong>Tiempo por sesión:</strong> {diagnostico.tiempo_por_sesion}</p>
        <p><strong>Descansos:</strong> {diagnostico.descansos}</p>
        <p><strong>Experiencia:</strong> {diagnostico.experiencia}</p>
        <p><strong>Nivel de fuerza:</strong> {diagnostico.nivel_fuerza}</p>
        <p><strong>Nivel de resistencia:</strong> {diagnostico.nivel_resistencia}</p>
        <p><strong>Flexibilidad:</strong> {diagnostico.flexibilidad}</p>
        <p><strong>Lesiones/Traumas:</strong> {diagnostico.lesion_trauma}</p>
        <p><strong>Tipo de cuerpo:</strong> {diagnostico.tipo_cuerpo}</p>
        <p><strong>Creado:</strong> {new Date(diagnostico.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default VerDiagnostico;

