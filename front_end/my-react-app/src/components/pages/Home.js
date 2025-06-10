import React from "react";
import Login from "../auth/CarpLogin/Login";
import "./Home.css"; // Estilos específicos para esta página
import fondo from "../../assets/LoginImage.jpg";
import logo from "../../assets/LogoFinal.png";
const Home = ({setToken}) => {


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
        
        </div>
        <div className="logo-container">
        <img src={logo} alt="Logo"
              style={{ width: 200,
                height: 200,
                borderRadius: 100,
                 // Centra horizontalmente dentro del contenedor
                marginTop: -50, 
                marginLeft: -200
                 }}/>
        </div>

        

        {/* Login centrado antes */}
        <div style={{marginLeft: -350,
                    marginTop: "125px",
                 }} >
          <Login setToken={setToken} />
          
        </div>
        <div className="top-bar2"></div>
      </div>
      
      
    </div>
  );
};

export default Home;