// RutinasModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RutinasModal.css";

const RutinasModal = ({ token, cliente, onClose }) => {
  const [rutinas, setRutinas] = useState([]);
  const [edited, setEdited] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // ← Estado para el mensaje de éxito

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/clientes/${cliente.cliente_id}/rutinas/`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setRutinas(res.data))
      .catch((err) => console.error("Error al cargar rutinas", err));
  }, [cliente, token]);

  const handleRoutineChange = (rutinaId, field, value) => {
    setEdited((prev) => ({
      ...prev,
      [rutinaId]: {
        ...prev[rutinaId],
        [field]: value,
      },
    }));
  };

  const handleExerciseChange = (rutinaId, exIndex, field, value) => {
    setEdited((prev) => {
      const current = prev[rutinaId] || {};
      const originalEx = rutinas.find((r) => r.id === rutinaId)?.exercises || [];
      const exs = current.exercises || originalEx;
      const updatedExs = exs.map((ex, idx) =>
        idx === exIndex ? { ...ex, [field]: value } : ex
      );
      return {
        ...prev,
        [rutinaId]: {
          ...current,
          exercises: updatedExs,
        },
      };
    });
  };

  const handleSave = (rutina) => {
    const updates = edited[rutina.id] || {};
    const merged = {
      name: updates.name ?? rutina.name,
      description: updates.description ?? rutina.description,
      exercises: (updates.exercises || rutina.exercises).map((ex) => ({
        id: ex.exercise.id,
        sets: ex.sets,
        reps: ex.reps,
        rest_time: ex.rest_time,
        day: ex.day,
      })),
    };

    axios
      .put(
        `http://localhost:8000/api/rutinas/${rutina.id}/`,
        merged,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(() => {
        setRutinas((prevRutinas) =>
          prevRutinas.map((r) => {
            if (r.id !== rutina.id) return r;

            // Sacamos la rutina original para recuperar nombres de ejercicios
            const originalRutina = rutinas.find((orig) => orig.id === rutina.id);
            const originalExList = originalRutina?.exercises || [];

            // Reconstruimos la lista de ejercicios con exercise.name
            const updatedExercises = merged.exercises.map((e) => {
              const matching = originalExList.find(
                (o) => o.exercise.id === e.id
              );
              const nombreEj = matching ? matching.exercise.name : "";

              return {
                exercise: {
                  id: e.id,
                  name: nombreEj,
                },
                sets: e.sets,
                reps: e.reps,
                rest_time: e.rest_time,
                day: e.day,
              };
            });

            return {
              ...r,
              name: merged.name,
              description: merged.description,
              exercises: updatedExercises,
            };
          })
        );

        // Limpiamos los edits
        setEdited((prev) => {
          const { [rutina.id]: _, ...rest } = prev;
          return rest;
        });

        // Mostramos mensaje de éxito
        setSuccessMessage("Guardado con éxito");
        setTimeout(() => setSuccessMessage(""), 3000); // desaparece en 3 segundos
      })
      .catch((err) => {
        console.error("Error al guardar rutina", err.response?.data || err);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h2>Rutinas de {cliente.cliente_nombre}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Aquí se muestra el mensaje de éxito cuando exista */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="rutinas-list">
          {rutinas.length > 0 ? (
            rutinas.map((rutina) => {
              const current = edited[rutina.id] || {};
              const exs = current.exercises || rutina.exercises;
              return (
                <div className="rutina-item card-shadow" key={rutina.id}>
                  <div className="rutina-fields">
                    <input
                      type="text"
                      className="field-input"
                      placeholder="Nombre de la rutina"
                      value={current.name ?? rutina.name}
                      onChange={(e) =>
                        handleRoutineChange(rutina.id, "name", e.target.value)
                      }
                    />
                    <textarea
                      className="field-textarea"
                      placeholder="Descripción"
                      value={current.description ?? rutina.description}
                      onChange={(e) =>
                        handleRoutineChange(
                          rutina.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="ejercicios">
                    {exs.map((ex, i) => (
                      <div className="ejercicio card-shadow-light" key={i}>
                        <h3 className="exercise-title">{ex.exercise.name}</h3>
                        <div className="exercise-grid">
                          <div className="grid-item">
                            <label>Series</label>
                            <input
                              type="number"
                              className="small-input"
                              value={ex.sets}
                              onChange={(e) =>
                                handleExerciseChange(
                                  rutina.id,
                                  i,
                                  "sets",
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                          <div className="grid-item">
                            <label>Reps</label>
                            <input
                              type="number"
                              className="small-input"
                              value={ex.reps}
                              onChange={(e) =>
                                handleExerciseChange(
                                  rutina.id,
                                  i,
                                  "reps",
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                          <div className="grid-item">
                            <label>Descanso (s)</label>
                            <input
                              type="number"
                              className="small-input"
                              value={ex.rest_time}
                              onChange={(e) =>
                                handleExerciseChange(
                                  rutina.id,
                                  i,
                                  "rest_time",
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                          <div className="grid-item">
                            <label>Día</label>
                            <input
                              type="text"
                              className="small-input"
                              value={ex.day}
                              onChange={(e) =>
                                handleExerciseChange(
                                  rutina.id,
                                  i,
                                  "day",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary save-btn"
                    onClick={() => handleSave(rutina)}
                  >
                    Guardar cambios
                  </button>
                </div>
              );
            })
          ) : (
            <p className="no-rutinas">No hay rutinas para este cliente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RutinasModal;
