import React from "react";
import RegisterBox from "./RegisterBox";
import { useNavigate } from "react-router-dom";


function Register(){
    const navigate = useNavigate();
    const handleRegister = async(username, password)=>{
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password}),
          });
      
          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          if (response.ok) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            navigate("/login"); // Redirige al login después de registrarse---> por el momento no se redirigio solo pero si guardo
        } else {
            alert("Error al registrarse: " + JSON.stringify(data));
        }
          
        };
        return (
            <RegisterBox onRegister ={handleRegister}/>

        )

}
export default Register;