import React from "react";
import RegisterBox from "./RegisterBox";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (username, email, password, passwordConfirm) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm: passwordConfirm, // 👈 este nombre exacto debe coincidir con el serializer
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

  return <RegisterBox onRegister={handleRegister} />;
}

export default Register;
