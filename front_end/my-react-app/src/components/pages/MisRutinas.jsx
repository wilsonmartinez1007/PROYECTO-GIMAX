import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MisRutinas.css";

const MisRutinas = ({ token }) => {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/rutinas/mias/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      setRutinas(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener las rutinas", error);
    });
  }, [token]);

  return (
    <div className="rutinas-wrapper">
      <header className="rutinas-header">
        <h1>Gestión de Rutinas</h1>
      </header>
      <div className="rutinas-grid">
        {rutinas.length > 0 ? (
          rutinas.map((rutina) => (
            <div className="rutina-card" key={rutina.id}>
              <h2>{rutina.name}</h2>
              <p className="descripcion">{rutina.description}</p>
              <div className="ejercicios">
                {rutina.exercises.map((exercise, index) => (
                  <div className="ejercicio" key={index}>
                    <h3>{exercise.exercise.name}</h3>
                    <p><strong>Series:</strong> {exercise.sets}</p>
                    <p><strong>Repeticiones:</strong> {exercise.reps}</p>
                    <p><strong>Descanso:</strong> {exercise.rest_time}s</p>
                    <p><strong>Día:</strong> {exercise.day}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="mensaje-no-rutinas">No tienes rutinas asignadas.</p>
        )}
      </div>
    </div>
  );
};

export default MisRutinas;
