import React from "react";
import backgroundImage from "../../assets/ImagenGymInicio.jpg"
function Header({ children }) {
  return (
    <div style={{
      width: "40%",
      height: "80vh",  // 80% de la pantalla
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {children}
    </div>
  );
}

export default Header;
//No se usa

