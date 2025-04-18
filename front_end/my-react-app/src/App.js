
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import HomeRegister from "./components/pages/HomeRegister";
import Dashboard from "./components/pages/Dashboard";

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
      </Routes>
    </Router>
  );
}

export default App;
