import React from "react";
import Register from "../auth/CarpRegister/Register";
import "./Home.css"; // Estilos específicos para esta página
import fondo from "../../assets/registroImage.jpg";
import salir from "../../assets/salir.svg";
import logo from "../../assets/LogoFinal.png";
import { useNavigate } from "react-router-dom"; // IMPORTANTE
const Home = ({setToken}) => {
  const navigate = useNavigate();
  const goToInicio = () => {
    navigate("/dashboard");
  };


  return (
    <div className="home-container">
      {/* Imagen en el 70% de la izquierda */}
      <div className="image-container">
        <img src={fondo} alt="Fondo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Sección derecha (30%) con barra roja arriba */}
      <div className="right-container">
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
                      style={{ width: 200,
                        height: 200,
                        borderRadius: 100,
                         // Centra horizontalmente dentro del contenedor
                        marginTop: 200, 
                        marginLeft: -400
                         }}/>
                </div>

        

        {/* Login centrado antes */}
        <div style={{marginLeft: -250,
                    marginTop: "125px",
                 }} >
          <Register setToken={setToken} />
          
        </div>
        <div className="top-bar2"></div>
      </div>
      
      
    </div>
  );
};

export default Home;