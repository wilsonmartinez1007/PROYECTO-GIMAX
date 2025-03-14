import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import Login from "./components/Login";

function App() {
  const [token, setToken]= useState(localStorage.getItem("token"));
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  return (
    <div>
      {token ? <h2>Bienvenido</h2> : <Login setToken={setToken} />}
    </div>
  );
}

export default App;
