/*import React, { useState } from "react";
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

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Respuesta no JSON:", text);
        alert("Confirme sus datos por favor");
        return;
      }

      if (response.ok) {
        const rol = await obtenerRolUsuario(data.token);
        
        if (rol !== "cliente") {
          navigate("/dashboard");
        } else if (data.mensaje === "nop") {
          navigate("/Diagnostico");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.error || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Error de red o del servidor.");
    }
  };
  

  const obtenerRolUsuario = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/obtener-rol/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,  
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.role;
      } else {
        console.error("No se pudo obtener el rol del usuario.");
        return "exe";
      }
    } catch (error) {
      console.error("Error de red al obtener el rol:", error);
      return null;
    }
  };

  return <LoginBox onLogin={handleLogin}/>;
}

export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginBox({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    
  };

  const goToRegister = () => {
    navigate("/register");
  };
  const goToRecuperar = () => {
    navigate("/RecuperarContraseña");
  };
  

  return (
    <div>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px", borderRadius: 20,border: "2px solid white",outline: "none"   }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "30px", padding: "8px",borderRadius: 20,border: "2px solid white",outline: "none" }}
        />
        <button type="submit" style={{padding: "8px", marginBottom: "10px",padding: "2px", background: "#D3D3D3", color: "black", borderRadius: 20, borderColor: 'black',border: "none",outline: "none", width: "125px" }}>
          Iniciar Sesión
        </button>
        <button
         onClick={goToRegister}
         type="submit" style={{marginBottom: "10px", padding: "2px", color: "#03a9f4", borderRadius: 20,border: "none",outline: "none",background: "transparent", textAlign: "left" }}>
          No tienes cuenta? Registrate
        </button>
        <button 
         onClick={goToRecuperar}
         type="submit" style={{ marginBottom: "10px", padding: "2px", color: "#03a9f4", borderRadius: 20,border: "none",outline: "none",background: "transparent",textAlign: "left"  }}>
         Olvide mi contraseña
        </button>
      </form>
    </div>
  );
}

export default LoginBox;

views.py:  
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        try:
            diagnostico = Diagnostico.objects.get(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        except Diagnostico.DoesNotExist:
            return Response({
                "token": token.key,
                "mensaje": "nop"
            },  status=status.HTTP_200_OK)
        #mal -->return Response({"diagnostico": diagnostico.edad}, status=status.HTTP_200_OK)
        #token, _ = Token.objects.get_or_create(user=user)
        #return Response({"token": token.key}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
*/