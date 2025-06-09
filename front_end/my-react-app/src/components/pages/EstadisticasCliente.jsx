import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EstadisticasCliente.css';
import TendenciasCliente from './TendenciasCliente';

const EstadisticasCliente = ({ token, clientId }) => {
  const [rutinas, setRutinas] = useState([]);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [stats, setStats] = useState(null);

  // 1) Cargar solo las rutinas del cliente cuyo ID está en clientId
  useEffect(() => {
    if (!token || !clientId) return;

    axios
      .get(`http://localhost:8000/api/rutinas/cliente/${clientId}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => {
        setRutinas(res.data);
        if (res.data.length > 0) {
          setSelectedRutina(res.data[0].id);
        }
      })
      .catch(err => console.error('Error al obtener rutinas del cliente:', err));
  }, [token, clientId]);

  // 2) Cuando cambie la rutina seleccionada, cargar sus estadísticas
  useEffect(() => {
    if (!token || !clientId || !selectedRutina) {
      setStats(null);
      return;
    }

    axios
      .get(
        `http://localhost:8000/api/estadisticas/cliente/${clientId}/rutina/${selectedRutina}/`,
        {
          headers: { Authorization: `Token ${token}` }
        }
      )
      .then(res => setStats(res.data))
      .catch(err => {
        console.error('Error al obtener estadísticas de rutina:', err);
        setStats(null);
      });
  }, [token, clientId, selectedRutina]);

  if (!rutinas.length) {
    return <p>Cargando rutinas del cliente...</p>;
  }

  if (!stats) {
    return (
      <div className="stats-card">
        <h2>Estadísticas del Cliente</h2>
        <div className="selector-rutina">
          <label htmlFor="rutina-select">Selecciona una rutina:</label>
          <select
            id="rutina-select"
            value={selectedRutina || ''}
            onChange={e => setSelectedRutina(parseInt(e.target.value, 10))}
          >
            {rutinas.map(rutina => (
              <option key={rutina.id} value={rutina.id}>
                {rutina.name}
              </option>
            ))}
          </select>
        </div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2>Estadísticas del Cliente</h2>

      <div className="selector-rutina">
        <label htmlFor="rutina-select">Selecciona una rutina:</label>
        <select
          id="rutina-select"
          value={selectedRutina}
          onChange={e => setSelectedRutina(parseInt(e.target.value, 10))}
        >
          {rutinas.map(rutina => (
            <option key={rutina.id} value={rutina.id}>
              {rutina.name}
            </option>
          ))}
        </select>
      </div>

      <div className="stats-values">
        <p>
          <strong>Rutina seleccionada:</strong>{' '}
          {rutinas.find(r => r.id === selectedRutina)?.name}
        </p>
        <p>
          <strong>Asistencia:</strong> {stats.asistencia_percent}%
        </p>
        <p>
          <strong>Satisfacción promedio:</strong>{' '}
          {stats.avg_satisfaction.toFixed(1)}
        </p>
        <p>
          <strong>Fatiga promedio:</strong> {stats.avg_fatigue.toFixed(1)}
        </p>
      </div>

      {/* Sección de tendencias para la rutina seleccionada */}
      <div style={{ marginTop: '30px' }}>
        <TendenciasCliente
          token={token}
          clientId={clientId}
          workoutId={selectedRutina}
        />
      </div>
    </div>
  );
};

export default EstadisticasCliente;
