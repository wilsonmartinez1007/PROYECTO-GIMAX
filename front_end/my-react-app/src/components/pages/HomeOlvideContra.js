
import { useNavigate } from "react-router-dom"; 
import "../pages/Home.css"; // Estilos específicos para esta página
import OlvideContra from "../auth/CarpOlvideContra/OlvideContra"
import React from "react";

const HomeOlvidecontra = ({}) => {
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
          <div style={{ 
                           // Centra horizontalmente dentro del contenedor
                          marginTop: 50, 
                          marginLeft: 600
                           }}>
            <OlvideContra/>
          </div>
  
          
          <div className="top-bar2"></div>
        </div>
        
        
      </div>
    );
  };
  
  export default HomeOlvidecontra;