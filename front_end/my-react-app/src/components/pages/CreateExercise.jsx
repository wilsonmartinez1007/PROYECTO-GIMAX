import React, { useState } from "react";
import axios from "axios";
import "./CreateExercise.css";

const CreateExercise = ({ token }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    muscle_group: "",
    video_url: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/exercises/create/",
        form,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setMessage("Ejercicio creado con éxito");
      setForm({ name: "", description: "", muscle_group: "", video_url: "" });
    } catch (err) {
      console.error(err);
      setMessage("Error al crear el ejercicio");
    }
  };

  return (
    <div className="create-exercise-container">
      <header className="create-exercise-header">
        <h1>Crear Nuevo Ejercicio</h1>
      </header>
      <form className="create-exercise-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Grupo muscular:
          <input
            type="text"
            name="muscle_group"
            value={form.muscle_group}
            onChange={handleChange}
          />
        </label>

        <label>
          URL de YouTube (guárdala como https://www.youtube.com/watch?v=&lt;ID&gt;):
          <input
            type="url"
            name="video_url"
            value={form.video_url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=NTk0Igxqcsk"
          />
        </label>

        <button type="submit">Crear Ejercicio</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateExercise;