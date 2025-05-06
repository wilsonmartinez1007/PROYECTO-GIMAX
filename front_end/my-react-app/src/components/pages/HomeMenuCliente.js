import "../pages/Home.css"; // Estilos específicos para esta página
import MenuCliente from "../auth/CarpMenuCliente/MenuCliente"
import React, { useState } from "react";

const HomeMenuCliente = ({}) => {
  const [seccionActiva, setSeccionActiva] = useState("Personal");
    return (
      <div>
  
        {/* Sección derecha (30%) con barra roja arriba */}
        <div>
          {/* Barra roja ajustada */}
          <div className="top-bar"></div>  
          <div style={{ 
                           // Centra horizontalmente dentro del contenedor
                        height:"30px" ,  
                        width: "1200px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        
                        marginTop: 200, 
                        marginLeft: 100
                           }}>
            <button onClick={() => setSeccionActiva("Personal")} 
                    type="submit" 
                    style={{marginRight: "150px",color: seccionActiva === "Personal" ? "gray" : "black", padding: "5px",border: "none",outline: "none",background: "transparent", textAlign: "center" }}>
            Personal
            </button>
            <button onClick={() => setSeccionActiva("Profesional")} 
                    type="submit" 
                    style={{marginRight: "150px",color: seccionActiva === "Profesional" ? "gray" : "black", padding: "5px",border: "none",outline: "none",background: "transparent", textAlign: "center" }}>
            Profesional
            </button>
            <button onClick={() => setSeccionActiva("Experiencia")} 
                    type="submit" 
                    style={{marginRight: "150px",color: seccionActiva === "Experiencia" ? "gray" : "black", padding: "5px",border: "none",outline: "none",background: "transparent", textAlign: "center" }}>
            Experiencia
            </button>
            <button onClick={() => setSeccionActiva("Especialidades")} 
                    type="submit" 
                    style={{marginRight: "150px",color: seccionActiva === "Especialidades" ? "gray" : "black", padding: "5px",border: "none",outline: "none",background: "transparent", textAlign: "center" }}>
            Especialidades
            </button>
            <button onClick={() => setSeccionActiva("Certificaciones")} 
                    type="submit" 
                    style={{marginRight: "100px",color: seccionActiva === "Ceertificados" ? "gray" : "black", padding: "5px", border: "none",outline: "none",background: "transparent", textAlign: "center" }}>
            Certificaciones
            </button>
            
          </div>
          <div style={{ 
                           // Centra horizontalmente dentro del contenedor
                          marginTop: 50, 
                          marginLeft: 600
                           }}>
            <MenuCliente seccion={seccionActiva}/>
          </div>
  
          
          <div className="top-bar2"></div>
        </div>
        
        
      </div>
    );
  };
  
  export default HomeMenuCliente;