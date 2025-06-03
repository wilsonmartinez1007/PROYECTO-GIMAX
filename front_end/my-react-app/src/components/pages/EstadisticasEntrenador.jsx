import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EstadisticasEntrenador = ({ token }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/estadisticas/entrenador/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, [token]);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div className="stats-card">
      <h2>Estadísticas Generales</h2>
      <p><strong>Clientes activos:</strong> {stats.clientes_activos}</p>
      <p><strong>Asistencia promedio:</strong> {stats.asistencia_percent}%</p>
      <p><strong>Satisfacción promedio:</strong> {stats.avg_satisfaction.toFixed(1)}</p>
      <p><strong>Fatiga promedio:</strong> {stats.avg_fatigue.toFixed(1)}</p>
    </div>
  );
};

export default EstadisticasEntrenador;
