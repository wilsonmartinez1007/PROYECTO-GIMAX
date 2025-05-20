import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EstadisticasCliente = ({ token, clientId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/estadisticas/cliente/${clientId}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, [clientId, token]);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div className="stats-card">
      <h2>Estadísticas del Cliente</h2>
      <p><strong>Asistencia:</strong> {stats.asistencia_percent}%</p>
      <p><strong>Satisfacción promedio:</strong> {stats.avg_satisfaction.toFixed(1)}</p>
      <p><strong>Fatiga promedio:</strong> {stats.avg_fatigue.toFixed(1)}</p>
    </div>
  );
};

export default EstadisticasCliente;
