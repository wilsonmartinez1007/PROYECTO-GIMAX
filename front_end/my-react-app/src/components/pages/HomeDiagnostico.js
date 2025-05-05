
import { useNavigate } from "react-router-dom"; // IMPORTANTE
import salir from "../../assets/salir.svg";
import "./Home.css"; // Estilos específicos para esta página
import Diagnostico from "../auth/CarpDiagnostico/Diagnostico"
import React from "react";

const HomeDiagnostico = ({}) => {
  const navigate = useNavigate();
  const goToInicio = () => {
    navigate("/dashboard");
  };
  
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
            <div style={{ position: "absolute",
                          marginTop: -130, 
                          marginLeft: 100,
                          fontSize: "40px",             // Tamaño de letra
                          fontFamily: "'Fugaz One', cursive", // Tipo de letra
                          fontWeight: "bold"            // Grosor
                           }}>
                            
                Diagnostico
                
            </div>
          <div style={{ 
                           // Centra horizontalmente dentro del contenedor
                          marginTop: 50, 
                          marginLeft: 600
                           }}>
            <Diagnostico/>
          </div>
  
          <button
          type="submit" style={{position: "absolute",zIndex: 1,marginTop: 490, marginLeft: 550,marginBottom: "10px",padding: "2px", background: "#D3D3D3", color: "black", borderRadius: 20, borderColor: 'black',border: "2px solid black",outline: "none", width: "125px" }}>
         guardar
       </button>
          
          <div className="top-bar2"></div>
        </div>
        
        
      </div>
    );
  };
  
  export default HomeDiagnostico;