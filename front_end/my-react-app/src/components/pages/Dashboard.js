//import React from "react";

//function Dashboard() {
  //return (
    //<div>
      //<h1>Bienvenido al Dashboard</h1>
    //</div>
  //);
//}

//export default Dashboard;

import React from "react";
import fondo from "../../assets/FotoRegister.jpg";
import "./Home1.css";
import Logout from "../auth/CarpLogout/Logout"; // Asegúrate de que la ruta sea correcta

function Home() {
  return (
    <div className="outer-container">
      {/* Navbar dentro del panel rojo */}
      <nav className="navbar">
        <h1 className="logo">GYMAX</h1>
        <ul className="nav-links">
          <li><a href="#"></a></li>
          <li><a href="#">Entrenadores</a></li>
          <li><a href="#">Membresías</a></li>
          <li><a href="#">Gimnasios</a></li>
          <li><a href="#">Registrarse</a></li>
        </ul>
      </nav>

      {/* Panel blanco interno */}
      <div className="inner-container">
        {/* Imagen */}
        <img src={fondo} alt="Fondo" className="main-image" />
        
        {/* Texto */}
        <div className="text-container">
          <h2>"EL CAMBIO EMPIEZA POR EL PRIMER PASO"</h2>
          <p>Si quieres tener un entrenador personal, únete en el siguiente link.</p>
          <a href="#">Entra aquí y cambia tu físico</a>

          {/* Botones */}
          <div className="button-container">
            <button className="button">Rutina</button>
            <button className="button">Alimentación</button>
            <button className="button">Ejercicios</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


