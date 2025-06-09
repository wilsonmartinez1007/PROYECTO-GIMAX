
import React, { useState, useEffect } from "react";
//cambio
function PerfilEntrenadorBox({ seccion: seccionActiva, onDatosChange }) {


    const [red_social, setRedSocial] = useState("");

    const [titulos_profesionales, setTitulosProfesionales] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [gimnasio_trabajado, setGymTrabajado] = useState("");

    const [anio_inicio, setAñoInicio]= useState("");
    const [cargos_anteriores, setCargosAnteriores]= useState("");
    const [ambitos_experiencia, setAmbitosExpe]= useState("");
    const [clientes_destacados, setClientesDesta]= useState("");
    const [especialidades, setEspecialidades] = useState([]);
    
    const [certificaciones, setCertificaciones] = useState([]);


     // PERSONAL
  useEffect(() => {
    if (seccionActiva === "Personal") {
      onDatosChange({ red_social });
    }
  }, [red_social, seccionActiva]);

  // PROFESIONAL
  useEffect(() => {
    if (seccionActiva === "Profesional") {
      onDatosChange({ titulos_profesionales, universidad, gimnasio_trabajado });
    }
  }, [titulos_profesionales, universidad, gimnasio_trabajado, seccionActiva]);

  // EXPERIENCIA
  useEffect(() => {
    if (seccionActiva === "Experiencia") {
      onDatosChange({
        anio_inicio,
        cargos_anteriores,
        ambitos_experiencia,
        clientes_destacados,
      });
    }
  }, [anio_inicio, cargos_anteriores, ambitos_experiencia, clientes_destacados, seccionActiva]);

  // ESPECIALIDADES
  useEffect(() => {
    if (seccionActiva === "Especialidades") {
      onDatosChange({ especialidades });
    }
  }, [especialidades, seccionActiva]);

  // CERTIFICACIONES
  useEffect(() => {
    if (seccionActiva === "Certificaciones") {
      onDatosChange({ certificaciones });
    }
  }, [certificaciones, seccionActiva]);

    let contenido;
  
    switch (seccionActiva) {
      case "Personal":
        contenido = (
          <div style={{ 
            // Centra horizontalmente dentro del contenedor
            display: "flex", flexDirection: "column",
            height:"260px" ,  
            width: "700px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            marginTop: -20, 
            }}>
            <input
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Nombres" />
            <input
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Apellidos" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Edad" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Correo Electronico" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {red_social}
             onChange={(e) => setRedSocial(e.target.value)}
             placeholder="Red Social"/>
             
          </div>//deberia en red social preguntar que red social tiene y hay si cual es el user
        );
        break;
      case "Profesional":
        contenido = (
            <div style={{ 
                // Centra horizontalmente dentro del contenedor
                display: "flex", flexDirection: "column",
                height:"260px" ,  
                width: "700px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                marginTop: -20, 
                }}>
            <select
              style={{ marginBottom: "10px", padding: "8px", border: "2px solid white",background: "transparent", outline: "none", width: "290px"}}
              value={titulos_profesionales}
              onChange={(e) => setTitulosProfesionales(e.target.value)}>
              <option value="">Titulos Porfesionales</option>
                    {[...Array(21)].map((_, i) => (
                        <option key={i + 0} value={i + 0}>{i + 0}</option>
                    ))}</select> 
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {universidad}
             onChange = {(e)=> setUniversidad(e.target.value)}
             placeholder="Universidad o Institucion" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value ={gimnasio_trabajado}
             onChange ={(e)=>setGymTrabajado(e.target.value)}
             placeholder="Gimnasios en los que ha trabajado" />
             
          </div>
        );
        break;
      case "Experiencia":
        contenido = (
            <div style={{ 
                // Centra horizontalmente dentro del contenedor
                display: "flex", flexDirection: "column",
                height:"260px" ,  
                width: "700px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                marginTop: -20, 
                }}>
            <select
              style={{ marginBottom: "10px", padding: "8px", border: "2px solid white",background: "transparent", outline: "none", width: "290px"}}
              value={anio_inicio}
              onChange={(e) => setAñoInicio(e.target.value)}>
              <option value="">Año de inicio como entrenador</option>
                    {[...Array(96)].map((_, i) => (
                        <option key={i + 1930} value={i + 1930}>{i + 1930}</option>
                    ))}</select> 
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {cargos_anteriores}
             onChange = {(e)=>setCargosAnteriores(e.target.value)}
             placeholder="Roles o cargos anteriores" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {ambitos_experiencia}
             onChange = {(e)=> setAmbitosExpe(e.target.value)}
             placeholder="Ámbitos de experiencia" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value ={clientes_destacados}
             onChange={(e)=>setClientesDesta(e.target.value)}
             placeholder="Clientes destacados o logros" />
          </div>
        );
        break;
      case "Especialidades":
        const especialidadesDisponibles = [
          "Entrenamiento funcional",
          "Musculación / Hipertrofia",
          "Pérdida de grasa",
          "Preparación física para deportes",
          "CrossFit",
          "Calistenia",
          "Movilidad y flexibilidad",
          "Rehabilitación de lesiones",
          "Entrenamiento para adultos mayores",
          "Entrenamiento para mujeres embarazadas",
          "Cardiovascular / Resistencia",
          "Powerlifting",
          "Entrenamiento militar",
          "Bodybuilding / Culturismo",
          "Pilates",
        ];
        contenido = (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
            height:"260px" ,  
            width: "700px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            marginTop: -20
          }}>
            
            {especialidadesDisponibles.map((esp) => (
              <button
                type="button" 
                key={esp}
                onClick={() => {
                  setEspecialidades((prev) =>
                    prev.includes(esp)
                      ? prev.filter((item) => item !== esp)
                      : [...prev, esp]
                  );
                }}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: especialidades.includes(esp) ? "#007bff" : "#f0f0f0",
                  color: especialidades.includes(esp) ? "white" : "black",
                  cursor: "pointer",
                  textAlign: "center",
                  whiteSpace: "normal", // Permite que el texto se divida en varias líneas
                  wordWrap: "break-word" // Rompe palabras largas si es necesario
                }}
              >
                {esp}
              </button>
            ))}
          </div>
       
  );
        break;
      case "Certificaciones":
        contenido = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "260px",
              width: "700px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: -20,
              overflow: "hidden", // No permitir scroll aquí directamente
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Certificaciones en PDF</h3>

            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => {
                const nuevosArchivos = Array.from(e.target.files);
                setCertificaciones((prev) => [...prev, ...nuevosArchivos]);
              }}
              style={{ marginBottom: "15px", border: "none" }}
            />

            <div
              style={{
                overflowY: "auto",

              }}
            >
              {certificaciones.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {certificaciones.map((archivo, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                        padding: "8px",
                        borderRadius: "5px",
                        background: "#F7F2F2",
                        width: "650px"
                      }}
                    >
              
                      <span style={{ maxWidth: "80%",overflowWrap: "break-word", }}>
                        {archivo.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setCertificaciones((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                          
                        }}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#666" }}>
                  No has agregado certificaciones aún.
                </p>
              )}
            </div>
          </div>
        );
        break;

      default:
        contenido = null;
    }
  
    return (
      <div>
        <form>
          {contenido}
          
        </form>
        
          
        
      </div>
    );
  }

export default PerfilEntrenadorBox;
