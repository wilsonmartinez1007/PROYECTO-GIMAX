// src/components/pages/MisRutinas.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseModal from "./ExerciseModal";
import "./MisRutinas.css";

const MisRutinas = ({ token }) => {
  const [rutinas, setRutinas] = useState([]);
  const [progressByRutina, setProgressByRutina] = useState({});
  const [satisfactionByRutina, setSatisfactionByRutina] = useState({});
  const [fatigueByRutina, setFatigueByRutina] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(null);

  // 1) Cargar todas las rutinas del usuario
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/rutinas/mias/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => {
        console.log("[DEBUG Rutinas] data:", res.data);
        setRutinas(res.data);
      })
      .catch(err => console.error("Error al obtener rutinas", err));
  }, [token]);

  // 2) Por cada rutina, cargar el progreso de hoy (checkbox + sat/fat)
  useEffect(() => {
    if (!token) return;

    rutinas.forEach(rutina => {
      axios
        .get(`http://localhost:8000/api/rutinas/${rutina.id}/progress/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(res => {
          console.log(`[DEBUG Progress GET] rutinaId=${rutina.id} data:`, res.data);
          // res.data es un array de { workout_exercise, completed, satisfaction, fatigue }
          const progMap = {};
          let valorSat = null;
          let valorFat = null;

          res.data.forEach(entry => {
            progMap[entry.workout_exercise] = entry.completed;
            // Si entry.satisfaction no es null, lo guardamos (solo el primero)
            if (entry.satisfaction !== null && valorSat === null) {
              valorSat = entry.satisfaction;
              valorFat = entry.fatigue;
            }
          });

          // Si no encontramos ningún entry con sat/fat, usamos valores por defecto:
          if (valorSat === null) {
            valorSat = 5;
            valorFat = 1;
          }

          setProgressByRutina(prev => ({
            ...prev,
            [rutina.id]: progMap
          }));
          setSatisfactionByRutina(prev => ({
            ...prev,
            [rutina.id]: valorSat
          }));
          setFatigueByRutina(prev => ({
            ...prev,
            [rutina.id]: valorFat
          }));
        })
        .catch(err => console.error("Error al obtener progreso", err));
    });
  }, [rutinas, token]);

  // 3) Mostrar modal al hacer clic en un ejercicio
  const handleExerciseClick = exercise => {
    setSelectedExercise(exercise);
  };

  // 4) Cuando se marca/desmarca un checkbox (“este ejercicio ya lo hice”)
  const handleCheckboxChange = (rutinaId, weId) => {
    const current = progressByRutina[rutinaId]?.[weId] || false;
    const sat = satisfactionByRutina[rutinaId] ?? 5;
    const fat = fatigueByRutina[rutinaId] ?? 1;

    console.log(
      `[DEBUG Progress POST-Checkbox] rutinaId=${rutinaId}, weId=${weId}, completed=${!current}, sat=${sat}, fat=${fat}`
    );

    axios
      .post(
        `http://localhost:8000/api/rutinas/${rutinaId}/progress/`,
        {
          workout_exercise: weId,
          completed: !current,
          satisfaction: sat,
          fatigue: fat
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(res => {
        setProgressByRutina(prev => ({
          ...prev,
          [rutinaId]: {
            ...prev[rutinaId],
            [weId]: res.data.completed
          }
        }));
      })
      .catch(err =>
        console.error("Error al actualizar progreso (checkbox)", err.response?.data)
      );
  };

  // 5) Cuando el usuario cambia el slider de satisfacción
  const handleSatisfactionChange = (rutinaId, nuevoValor) => {
    // 5.1) Actualizamos el estado local
    setSatisfactionByRutina(prev => ({
      ...prev,
      [rutinaId]: nuevoValor
    }));

    // 5.2) Encontrar “ejercicio principal”: el primero de la lista
    const principal = rutinas.find(r => r.id === rutinaId)?.exercises?.[0]?.id;
    if (!principal) return;

    // 5.3) Saber si ese ejercicio principal está marcado o no
    const estaCompleto = progressByRutina[rutinaId]?.[principal] || false;
    const fatActual = fatigueByRutina[rutinaId] ?? 1;

    console.log(
      `[DEBUG Progress POST-SliderSat] rutinaId=${rutinaId}, weId=${principal}, completed=${estaCompleto}, sat=${nuevoValor}, fat=${fatActual}`
    );

    // 5.4) Enviar POST para actualizar el registro “principal”
    axios
      .post(
        `http://localhost:8000/api/rutinas/${rutinaId}/progress/`,
        {
          workout_exercise: principal,
          completed: estaCompleto,
          satisfaction: nuevoValor,
          fatigue: fatActual
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .catch(err => console.error("Error al guardar satisfacción", err));
  };

  // 6) Cuando el usuario cambia el slider de fatiga
  const handleFatigueChange = (rutinaId, nuevoValor) => {
    // 6.1) Actualizamos el estado local
    setFatigueByRutina(prev => ({
      ...prev,
      [rutinaId]: nuevoValor
    }));

    // 6.2) Mismo “ejercicio principal”
    const principal = rutinas.find(r => r.id === rutinaId)?.exercises?.[0]?.id;
    if (!principal) return;

    const estaCompleto = progressByRutina[rutinaId]?.[principal] || false;
    const satActual = satisfactionByRutina[rutinaId] ?? 5;

    console.log(
      `[DEBUG Progress POST-SliderFat] rutinaId=${rutinaId}, weId=${principal}, completed=${estaCompleto}, sat=${satActual}, fat=${nuevoValor}`
    );

    // 6.3) Enviar POST para actualizar el registro “principal”
    axios
      .post(
        `http://localhost:8000/api/rutinas/${rutinaId}/progress/`,
        {
          workout_exercise: principal,
          completed: estaCompleto,
          satisfaction: satActual,
          fatigue: nuevoValor
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .catch(err => console.error("Error al guardar fatiga", err));
  };

  // 7) Dibujar la barra de progreso
  const renderProgressBar = rutina => {
    const map = progressByRutina[rutina.id] || {};
    const total = Array.isArray(rutina.exercises) ? rutina.exercises.length : 0;
    const done = Object.values(map).filter(Boolean).length;
    // 7.1) Si total === 0, percent = 0
    const percent = total ? Math.round((done / total) * 100) : 0;

    // 7.2) También imprimimos un log para ver cuántos “done” y “total” hay:
    console.log(`[DEBUG ProgressBar] rutinaId=${rutina.id} done=${done} total=${total} percent=${percent}`);

    return (
      <div className="progress-container">
        <progress value={percent} max={100} />
        <span>{percent}% completado</span>
      </div>
    );
  };

  // 8) Emoji según valor de satisfacción (1–10)
  const renderEmoji = value => (value <= 3 ? "😢" : value <= 7 ? "😐" : "😄");

  return (
    <div className="rutinas-wrapper">
      <header className="rutinas-header">
        <h1>Gestión de Rutinas</h1>
      </header>

      <div className="rutinas-grid">
        {rutinas.map(rutina => (
          <div className="rutina-card" key={rutina.id}>
            <h2 className="rutina-title">{rutina.name}</h2>
            <p className="descripcion">{rutina.description}</p>

            {renderProgressBar(rutina)}

            <div className="ejercicios">
              {rutina.exercises.map(
                ({ id: weId, exercise, sets, reps, rest_time, day }) => (
                  <div className="ejercicio" key={weId}>
                    <div className="exercise-header">
                      <h3
                        className="exercise-clickable"
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        {exercise.name}
                      </h3>
                      <input
                        type="checkbox"
                        checked={!!progressByRutina[rutina.id]?.[weId]}
                        onChange={() => handleCheckboxChange(rutina.id, weId)}
                      />
                    </div>
                    <p>
                      <strong>Series:</strong> {sets}
                    </p>
                    <p>
                      <strong>Reps:</strong> {reps}
                    </p>
                    <p>
                      <strong>Descanso:</strong> {rest_time}s
                    </p>
                    <p>
                      <strong>Día:</strong> {day}
                    </p>
                  </div>
                )
              )}
            </div>


            <div className="satisfaction-container">
              <label htmlFor={`sat-${rutina.id}`}>¿Cómo te sentiste?</label>
              <input
                id={`sat-${rutina.id}`}
                type="range"
                min="1"
                max="10"
                value={satisfactionByRutina[rutina.id] || 5}
                onChange={e =>
                  handleSatisfactionChange(
                    rutina.id,
                    parseInt(e.target.value, 10)
                  )
                }
              />
              <span className="emoji">
                {renderEmoji(satisfactionByRutina[rutina.id] || 5)}
              </span>
            </div>

            <div className="fatigue-container">
              <label htmlFor={`fat-${rutina.id}`}>Fatiga/Dolor:</label>
              <input
                id={`fat-${rutina.id}`}
                type="range"
                min="1"
                max="5"
                value={fatigueByRutina[rutina.id] || 1}
                onChange={e =>
                  handleFatigueChange(rutina.id, parseInt(e.target.value, 10))
                }
              />
              <span className="fatigue-level">
                {fatigueByRutina[rutina.id] || 1}
              </span>
            </div>
          </div>
        ))}
        {rutinas.length === 0 && (
          <p className="mensaje-no-rutinas">No tienes rutinas asignadas.</p>
        )}
      </div>

      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
};

export default MisRutinas;
