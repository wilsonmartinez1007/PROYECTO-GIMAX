
import React, { useState } from "react";

function PerfilEntrenadorBox({ seccion }) {


    const [redSocial, setRedSocial] = useState("");

    const [titulosProfesional, setTitulosProfesionales] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [añosExperiencia, setAñosExpe] = useState("");
    const [gymTrabajado, setGymTrabajado] = useState("");
    const [tipoServicio, setServicio] = useState("");

    const [añoInicio, setAñoInicio]= useState("");
    const [cargosAnteriores, setCargosAnteriores]= useState("");
    const [ambitosExpe, setAmbitosExpe]= useState("");
    const [clientesDesta, setClientesDesta]= useState("");
    const [especialidades, setEspecialidades] = useState([]);/*<input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Entrenamiento funcional" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Musculacion/ Hipertrofia" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Perdida de grasa" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Preparacion fisica para deportes" />
    const [entrenamientoFuncional, setEntreFunci]= useState("");
    const [Mus, setCargosAnteriores]= useState("");
    const [ambitosExpe, setAmbitosExpe]= useState("");
    const [clientesDesta, setClientesDesta]= useState("");*/


    let contenido;
  
    switch (seccion) {
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
             value = {redSocial}
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
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {titulosProfesional}
             onChange ={(e) => setTitulosProfesionales(e.target.value)}
             placeholder="Titulos Profesionales" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {universidad}
             onChange = {(e)=> setUniversidad(e.target.value)}
             placeholder="Universidad o Institucion" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {añosExperiencia}
             onChange = {(e)=>setAñosExpe(e.target.value)}
             placeholder="Años Experiencia Laboral" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value ={gymTrabajado}
             onChange ={(e)=>setGymTrabajado(e.target.value)}
             placeholder="Gimnasios en los que ha trabajado" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {tipoServicio}
             onChange={(e) => setServicio(e.target.value)}             
             placeholder="Tipo de servicios ofrecidos" />
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
              value={añoInicio}
              onChange={(e) => setAñoInicio(e.target.value)}>
              <option value="">Año de inicio como entrenador</option>
                    {[...Array(96)].map((_, i) => (
                        <option key={i + 1930} value={i + 1930}>{i + 1930}</option>
                    ))}</select> 
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {cargosAnteriores}
             onChange = {(e)=>setCargosAnteriores(e.target.value)}
             placeholder="Roles o cargos anteriores" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value = {ambitosExpe}
             onChange = {(e)=> setAmbitosExpe(e.target.value)}
             placeholder="Ámbitos de experiencia" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             value ={clientesDesta}
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
             placeholder="Nombre del curso/Certificacion" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Institucion que la otorga" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Decha de obtencion" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Duracion o nivel(si aplica)" />
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
