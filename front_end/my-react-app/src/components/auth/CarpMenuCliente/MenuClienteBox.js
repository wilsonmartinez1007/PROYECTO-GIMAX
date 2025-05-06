import React from "react";
import { useNavigate } from "react-router-dom";

function DiagnosticoBox({seccion}) {
    const navigate = useNavigate();
    const goToCerrar = () => {
        navigate("/login");
      };

      let contenido;
  
      switch (seccion) {
        case "Personal":
          contenido = (
            <div>
              
            </div>
          );
          break;
        case "Profesional":
          contenido = (
              <div>
            </div>
          );
          break;
        case "Experiencia":
          contenido = (
              <div>
            </div>
          );
          break;
        case "Especialidades":
          contenido = (
              <div>
            </div>
          );
          break;
        case "Certificaciones":
          contenido = (
              <div>
            </div>
          );
          break;
        default:
          contenido = null;
    }

    return (
        <div style={{ height:"0vh"}}>
    
        <div style={{ 
            // Centra horizontalmente dentro del contenedor
            display: "flex", flexDirection: "column",
            position: "absolute",zIndex: 1,
            padding: "20px",
            marginTop: -260, 
            marginLeft: 795,
            }}>
            <select style={{
            
            width: "50px",height:"50px",marginBottom: "30px", padding: "8px",border: "none", borderRadius: 60,outline: "none"   }}  
                >
                <option>P</option>
                <option value="cliente">..</option>
                <option value="entrenador">..</option>
                <option
                 onClick={goToCerrar}
                 value="admin">Cerrar Cesion</option>
                </select>
            
          </div>
          <div>
        <form>
            {contenido}
        </form>
        </div>
    </div>
    
    );
  }

export default DiagnosticoBox;
