import React from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../../assets/FotoRegister.jpg";
import "./Home1.css";
import Logout from "../auth/CarpLogout/Logout";

function Home({ setToken, token }) {
  const navigate = useNavigate();

  const irACrearRutina = () => {
    navigate("/crear-rutina");
  };

  const irAPlanes = () => {
    navigate("/Planes");
  };


  const irAEntrenador = () => {
    navigate("/PerEntrenador");
  };

  const irAEjercicio = () => {
    navigate("/ejercicios/crear");
  };
  const irAClientes = () => {
    navigate("/clientes");
  };
  const VerUsuarios = () => {
    navigate("/VerDiagnostico");
  };

  return (
    <div className="outer-container">
      <nav className="navbar">
        <h1 
          style={{   fontSize: "40px", 
                     fontWeight: "bold" 
                            }}
          className="logo">GYMAX</h1>
        <ul className="nav-links">
          <li><Logout /></li> 
        </ul>
      </nav>

      <div className="inner-container">
        <img 
          style ={{
                borderRadius: 20,}}
          src={fondo} alt="Fondo" className="main-image" />
        
        <div className="text-container">
          <h2>"EL CAMBIO EMPIEZA POR EL PRIMER PASO"</h2>
          

          <div className="button-container">
            <button className="button" onClick={irACrearRutina}>Rutina</button>
            <button className="button" onClick={irAClientes}>Clientes</button>
            <button className="button" onClick={irAEjercicio}>Ejercico</button>
            <button className="button" onClick={irAEntrenador}>Perfil</button>
            <button className="button" onClick={irAPlanes}>Planes</button>
            <button className="button" onClick={VerUsuarios}>Diagnosticos</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
