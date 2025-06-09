import React from "react";
import LoginBox from "./LoginBox";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        // Guardar token y rol en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setToken(data.token);
        console.log("Token guardado:", data.token);
        console.log("ROL RECIBIDO:", data.role);
        console.log("Respuesta del servidor:", data);



        // Redirigir según rol
        if (data.role === "cliente") {
          navigate("/MenuCliente");
        } else if (data.role === "entrenador") {
          navigate("/dashboard");
        } else {
          // Rol desconocido: ir al dashboard por defecto
          navigate("/dashboard");
        }
      } else {
        alert("Error en las credenciales");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Ocurrió un error. Intenta de nuevo más tarde.");
    }
  };

  return <LoginBox onLogin={handleLogin} />;
}

export default Login;
