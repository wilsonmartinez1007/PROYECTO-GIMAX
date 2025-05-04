
import React from "react";

function PerfilEntrenadorBox({ seccion }) {
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
             placeholder="Red Social" />
          </div>
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
             placeholder="Titulos Profesionales" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Universidad o Institucion" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Años Experiencia Laboral" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Gimnasios en los que ha trabajado" />
             <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
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
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Año de inicio como entrenador" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Roles o cargos anteriores" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Ámbitos de experiencia" />
            <input 
             style ={{marginBottom: "10px", padding: "8px",border: "2px solid white",outline: "none" }}
             placeholder="Clientes destacados o logros" />
          </div>
        );
        break;
      case "Especialidades":
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
