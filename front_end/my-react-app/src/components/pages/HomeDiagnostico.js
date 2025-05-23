
import { useNavigate } from "react-router-dom"; // IMPORTANTE
import salir from "../../assets/salir.svg";
import "./Home.css"; // Estilos específicos para esta página
import Diagnostico from "../auth/CarpDiagnostico/Diagnostico"
import React from "react";
import info from "../../assets/info.png"
const HomeDiagnostico = ({}) => {
  const navigate = useNavigate();
  const goToInicio = () => {
    navigate("/dashboard");
  };
  const infoIMC = () => {
        alert("Para calcular tu IMC por favor divide tu peso en kg/ entre tu estatura en metros cuadrados, ejemplo: Pesa 70 kg y mide 1.75 m. Su IMC sería 70 / (1.75 * 1.75) = 22.9 ");
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
          <button style={{position: "absolute",zIndex: 1,marginTop: 255,border: "none",background: "none",
                               marginLeft: 349, }} 
          onClick ={infoIMC}
          >
          <img style={{width: 20,height: 20, }} 
                               src={info}/>
       </button>
  
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