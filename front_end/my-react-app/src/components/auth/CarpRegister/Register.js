import React, { useState } from "react";
import RegisterBox from "./RegisterBox";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (username, email, password, passwordConfirm, cedula, apellido, role) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm: passwordConfirm, // 👈 este nombre exacto debe coincidir con el serializer
        cedula,
        apellido,
        role
      }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (response.ok) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      alert("Error al registrarse: " + JSON.stringify(data));
    }
  };
  const [gimnasios, setGimnasios] = useState([]); // Lista completa de gimnasios
  
  const handleGimnasios = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/obtener-gimnasios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGimnasios(data);
      } else {
        console.error("Error al obtener gimnasios");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };


  return <RegisterBox onRegister={handleRegister} onGym = {handleGimnasios} gimnasios = {gimnasios} />;
}

export default Register;
