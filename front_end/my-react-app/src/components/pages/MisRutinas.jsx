import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseModal from "./ExerciseModal";
import "./MisRutinas.css";

const MisRutinas = ({ token }) => {
  const [rutinas, setRutinas] = useState([]);
  const [progressByRutina, setProgressByRutina] = useState({});
  const [satisfactionByRutina, setSatisfactionByRutina] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/rutinas/mias/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => setRutinas(res.data))
      .catch(err => console.error("Error al obtener rutinas", err));
  }, [token]);

  useEffect(() => {
    if (!token) return;
    rutinas.forEach(rutina => {
      axios
        .get(`http://localhost:8000/api/rutinas/${rutina.id}/progress/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(res => {
          const map = {};
          let satValue = 5;
          res.data.forEach(entry => {
            map[entry.workout_exercise] = entry.completed;
            if (entry.satisfaction !== null) satValue = entry.satisfaction;
          });
          setProgressByRutina(prev => ({ ...prev, [rutina.id]: map }));
          setSatisfactionByRutina(prev => ({ ...prev, [rutina.id]: satValue }));
        })
        .catch(err => console.error("Error al obtener progreso", err));
    });
  }, [rutinas, token]);

  const handleExerciseClick = exercise => setSelectedExercise(exercise);

  const handleCheckboxChange = (rutinaId, workoutExerciseId) => {
    const current = progressByRutina[rutinaId]?.[workoutExerciseId] || false;
    const sat = satisfactionByRutina[rutinaId] || 5;
    axios
      .post(
        `http://localhost:8000/api/rutinas/${rutinaId}/progress/`,
        { workout_exercise: workoutExerciseId, completed: !current, satisfaction: sat },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(res => {
        setProgressByRutina(prev => ({
          ...prev,
          [rutinaId]: { ...prev[rutinaId], [workoutExerciseId]: res.data.completed }
        }));
      })
      .catch(err => console.error("Error al actualizar progreso", err.response?.data));
  };

  const renderProgressBar = rutina => {
    const map = progressByRutina[rutina.id] || {};
    const total = Array.isArray(rutina.exercises) ? rutina.exercises.length : 0;
    const done = Object.values(map).filter(Boolean).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return (
      <div className="progress-container">
        <progress value={percent} max={100} />
        <span>{percent}% completado</span>
      </div>
    );
  };

  const renderEmoji = value => {
    if (value <= 3) return "😢";
    if (value <= 7) return "😐";
    return "😄";
  };

  const handleRepeat = rutina => alert(`Repetir rutina: ${rutina.name}`);
  const handlePostpone = rutina => alert(`Posponer rutina: ${rutina.name}`);

  return (
    <div className="rutinas-wrapper">
      {/* Encabezado con línea roja */}
      <header className="rutinas-header">
        <h1>Gestión de Rutinas</h1>
      </header>

      <div className="rutinas-grid">
        {rutinas.length > 0 ? (
          rutinas.map(rutina => (
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
                      <p><strong>Series:</strong> {sets}</p>
                      <p><strong>Repeticiones:</strong> {reps}</p>
                      <p><strong>Descanso:</strong> {rest_time}s</p>
                      <p><strong>Día:</strong> {day}</p>
                    </div>
                  )
                )}
              </div>

              <div className="rutina-actions">
                <button onClick={() => handleRepeat(rutina)}>Repetir rutina</button>
                <button onClick={() => handlePostpone(rutina)}>Posponer</button>
              </div>

              {/* Sección de satisfacción */}
              <div className="satisfaction-container">
                <label htmlFor={`sat-${rutina.id}`}>¿Cómo te sentiste?</label>
                <input
                  id={`sat-${rutina.id}`}
                  type="range"
                  min="1"
                  max="10"
                  value={satisfactionByRutina[rutina.id] || 5}
                  onChange={e =>
                    setSatisfactionByRutina(prev => ({
                      ...prev,
                      [rutina.id]: parseInt(e.target.value, 10)
                    }))
                  }
                />
                <span className="emoji">
                  {renderEmoji(satisfactionByRutina[rutina.id] || 5)}
                </span>
              </div>
            </div>
          ))
        ) : (
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