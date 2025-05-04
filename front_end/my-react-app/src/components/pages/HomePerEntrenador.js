
import { useNavigate } from "react-router-dom"; // IMPORTANTE
import salir from "../../assets/salir.svg";
import "./Home.css"; // Estilos específicos para esta página
import logo from "../../assets/fotoSinRostro.jpg";
import PerfilEntrenador from "../auth/CarpPerfilEntrenador/PerfilEntrenador"
import React, { useState } from "react";

const HomePerEntrenador = ({}) => {
    const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState("Personal");

  const goToInicio = () => {
    navigate("/dashboard");
  };

  const botones = ["Personal", "Profesional", "Experiencia", "Especialidades", "Certificaciones"];

  
    return (
      <div>
  
        {/* Sección derecha (30%) con barra roja arriba */}
        <div>
          {/* Barra roja ajustada */}
          <div className="top-bar"></div>
          <div className="logo-salir">
          <button 
                      onClick={goToInicio} 
                      style={{outline: "none",border: "none",background: "transparent"}}
                    >
                     <img src={salir}/>
                    </button>
                  
          
          </div>
          <div className="logo-container">
                  <img src={logo} alt="Logo"
                        style={{ width: 300,
                          height: 300,
                          borderRadius: 20,
                           // Centra horizontalmente dentro del contenedor
                          marginTop: 200, 
                          marginLeft: -595
                           }}/>
                  </div>
            <div style={{ position: "absolute",
                          marginTop: -130, 
                          marginLeft: 100,
                          fontSize: "40px",             // Tamaño de letra
                          fontFamily: "'Fugaz One', cursive", // Tipo de letra
                          fontWeight: "bold"            // Grosor
                           }}>
                Informacion Entrenador
                
            </div>
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
            <PerfilEntrenador seccion={seccionActiva}/>
          </div>
          <div className="top-bar2"></div>
        </div>
        
        
      </div>
    );
  };
  
  export default HomePerEntrenador;