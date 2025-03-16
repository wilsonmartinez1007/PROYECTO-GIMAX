import React from "react";
import Login from "../auth/CarpLogin/Login";
import "./Home.css"; // Estilos específicos para esta página
import fondo from "../../assets/ImagenGymInicio.jpg";
import logo from "../../assets/LogoGym.png";
import { useNavigate } from "react-router-dom"; // IMPORTANTE
const Home = ({setToken}) => {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token"); // Elimina el token
    setToken(null);
    navigate("/"); // Redirige a la página principal
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
            onClick={handleExit} 
            style={{ padding: "6px", background: "red", color: "white", borderRadius: 5, cursor: "pointer" }}
          >
            X
          </button>
        
        </div>
        <div className="logo-container">
        <img src={logo} alt="Logo" />
        </div>

        

        {/* Login centrado antes */}
        <div className="login-container">
          <Login setToken={setToken} />
          
        </div>
        <div className="top-bar2"></div>
        /
        
      </div>
      
      
    </div>
  );
};

export default Home;