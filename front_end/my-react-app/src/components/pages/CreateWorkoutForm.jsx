import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateWorkoutForm.css'; 

const CreateWorkoutForm = ({ token }) => {
  const [clientes, setClientes] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    cliente_id: '',
    gym_id: 1,
    name: '',
    description: '',
    exercises: [],
  });

  const [currentExercise, setCurrentExercise] = useState({
    exercise_id: '',
    sets: '',
    reps: '',
    rest_time: '',
    day: '',
  });

  useEffect(() => {
    axios.get('/api/usuarios/clientes/', {
      headers: { Authorization: `Token ${token}`    }
    }).then(res => setClientes(res.data));

    axios.get('/api/exercises/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => setExercises(res.data));
  }, [token]);

  const addExercise = () => {
    if (
      currentExercise.exercise_id &&
      currentExercise.sets &&
      currentExercise.reps &&
      currentExercise.day
    ) {
      setForm({ ...form, exercises: [...form.exercises, currentExercise] });
      setCurrentExercise({ exercise_id: '', sets: '', reps: '', rest_time: '', day: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/rutinas/crear/', form, {
      headers: { Authorization: `Token ${token}` }
    }).then(() => alert("Rutina creada con éxito"));
  };

  return (
    <div className="create-workout-container">
      <div className="header">
        <h1>Gestión de rutinas</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Cliente:</label>
          <select value={form.cliente_id} onChange={e => setForm({ ...form, cliente_id: e.target.value })}>
            <option value="">Selecciona cliente</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.cliente_nombre}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Nombre de rutina:</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="exercise-section">
          <h3>Agregar ejercicio</h3>

          <div className="exercise-row">
            <select value={currentExercise.day} onChange={e => setCurrentExercise({ ...currentExercise, day: e.target.value })}>
              <option value="">Día</option>
              {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select value={currentExercise.exercise_id} onChange={e => setCurrentExercise({ ...currentExercise, exercise_id: e.target.value })}>
              <option value="">Ejercicio</option>
              {exercises.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>

            <input type="number" placeholder="Series" value={currentExercise.sets} onChange={e => setCurrentExercise({ ...currentExercise, sets: e.target.value })} />
            <input type="number" placeholder="Reps" value={currentExercise.reps} onChange={e => setCurrentExercise({ ...currentExercise, reps: e.target.value })} />
            <input type="number" placeholder="Descanso (seg)" value={currentExercise.rest_time} onChange={e => setCurrentExercise({ ...currentExercise, rest_time: e.target.value })} />

            <button type="button" onClick={addExercise}>Agregar ejercicio</button>
          </div>

          <ul className="exercise-list">
            {form.exercises.map((e, i) => (
              <li key={i}>
                {e.day} - {exercises.find(ex => ex.id == e.exercise_id)?.name || e.exercise_id} - {e.sets}x{e.reps} - {e.rest_time}s descanso
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="submit-btn">Crear Rutina</button>
      </form>
    </div>
  );
};

export default CreateWorkoutForm;
