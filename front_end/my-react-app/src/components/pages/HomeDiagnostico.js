
import { useNavigate } from "react-router-dom";
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
      
  //cambio
    return (
      <div>
  
        {/* Sección derecha (30%) con barra roja arriba */}
        <div>
          {/* Barra roja ajustada */}
          <div className="top-bar"></div>
          <div className="logo-salir">
          <button 
              onClick={goToInicio} 
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
              style={{outline: "none",padding: "10px",borderRadius: 10,border: "none",}}>
              OMITIR
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
          <button style={{position: "absolute",zIndex: 1,marginTop: 443,border: "none",background: "none",
                               marginLeft: 349, }} 
          onClick ={infoIMC}
          >
          <img style={{width: 20,height: 20, }} 
                               src={info}/>
       </button>
          <div className="top-bar2"></div>
        </div>
        
        
      </div>
    );
  };
  
  export default HomeDiagnostico;