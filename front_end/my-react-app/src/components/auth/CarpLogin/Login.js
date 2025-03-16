import React from "react";
import LoginBox from "./LoginBox";
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
  const navigate = useNavigate();
  const handleLogin = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      console.log("Token guardado:", data.token);
      navigate("/dashboard"); 
    } else {
      alert("Error en las credenciales");
    }
  };

  return (
    /*
    <LoginContainer>
    <LoginBox onLogin={handleLogin} />   --->Siquiero usar Login Container 
    </LoginContainer>
    */
    
      <LoginBox onLogin={handleLogin} />
    
  );
}

export default Login;
