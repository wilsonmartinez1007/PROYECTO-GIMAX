
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
import HomeOlvidecontra from "./components/pages/HomeOlvideContra";
import HomeMenuCliente from "./components/pages/HomeMenuCliente";
import CreateExercise from "./components/pages/CreateExercise";
import EstadisticasCliente from "./components/pages/EstadisticasCliente";
import EstadisticasEntrenador from "./components/pages/EstadisticasEntrenador";
import Pagos from "./components/pages/Pagos";
import Planes from './components/pages/Planes';
import Checkout from './components/pages/Checkout';
import Suscripcion from './components/pages/Suscripcion';
import VerDiagnostico from './components/pages/VerDiagnostico';



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
        <Route path="/RecuperarContraseña" element={<HomeOlvidecontra/>}/>
        <Route path="/MenuCliente" element={<HomeMenuCliente/>}/>
        <Route path="/ejercicios/crear" element={<CreateExercise token={token} />} />
        <Route path="/PerEntrenador" element={<HomePerEntrenador token={token} />} />
        <Route path="/EstadisticasC" element={<EstadisticasCliente token={token} />} />
        <Route path="/EstadisticasE" element={<EstadisticasEntrenador token={token} />} />
        <Route path="/Pagos" element={<Pagos token={token} />} />
        <Route path="/Planes" element={<Planes token={token} />} />
        <Route path="/Checkout" element={<Checkout token={token} />} />
        <Route path="/Suscripcion" element={<Suscripcion token={token} />} />
        <Route path="/VerDiagnostico" element={<VerDiagnostico token={token} />} />
        

import HomeDiagnostico from "./components/pages/HomeDiagnostico";
import HomeOlvidecontra from "./components/pages/HomeOlvideContra";
import HomeMenuCliente from "./components/pages/HomeMenuCliente"

      </Routes>
    </Router>
  );
}

export default App;
