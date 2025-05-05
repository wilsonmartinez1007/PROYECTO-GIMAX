
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import HomeRegister from "./components/pages/HomeRegister";
import Dashboard from "./components/pages/Dashboard";
import HomePerEntrenador from "./components/pages/HomePerEntrenador";
import CreateWorkoutForm from "./components/pages/CreateWorkoutForm";
import MisRutinas from "./components/pages/MisRutinas";
import ClientesDeEntrenador from "./components/pages/ClientesDeEntrenador";
import HomeDiagnostico from "./components/pages/HomeDiagnostico";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token")||null);//estado  para  el token
  useEffect(() => {
    localStorage.setItem("token", token); // Guarda el token en localStorage
  }, [token]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/login" element={<Home setToken={setToken} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Home setToken={setToken} />} />
        <Route path="/register" element={<HomeRegister />} />
        <Route path="/PerfilEntrenador" element={<HomePerEntrenador/>}/>
        <Route path="/crear-rutina" element={token ? <CreateWorkoutForm token={token} /> : <Home setToken={setToken} />} />
        <Route path="/mis-rutinas" element={token ? <MisRutinas token={token} /> : <Home setToken={setToken} />} />
        <Route path="/clientes" element={token ? <ClientesDeEntrenador token={token} /> : <Home setToken={setToken} />} />
        <Route path="/Diagnostico" element={<HomeDiagnostico/>}/>
      </Routes>
    </Router>
  );
}

export default App;
