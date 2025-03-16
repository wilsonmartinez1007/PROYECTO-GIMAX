/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layoud/Navbar";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
*/
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/auth/CarpRegister/Register";

function App() {
  const [token, setToken] = useState(null);//estado  para  el token
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Home setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
