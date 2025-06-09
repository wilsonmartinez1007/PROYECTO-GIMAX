import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./TendenciasCliente.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const {
      avg_satisfaction,
      avg_fatigue,
      attendance_percent,
      workout_name
    } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p><strong>{label}</strong></p>
        <p>Rutina: {workout_name || "—"}</p>
        <p>Asistencia: {attendance_percent}%</p>
        <p>Satisfacción: {avg_satisfaction}</p>
        <p>Fatiga: {avg_fatigue}</p>
      </div>
    );
  }
  return null;
};

const TendenciasCliente = ({ token, clientId }) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (!clientId || !token) return;

    axios
      .get(
        `http://localhost:8000/api/estadisticas/cliente/${clientId}/historial/`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(res => {
        const normalized = res.data.map(d => ({
          ...d,
          avg_satisfaction:   Number(d.avg_satisfaction),
          avg_fatigue:        Number(d.avg_fatigue),
          attendance_percent: Number(d.attendance_percent),
        }));
        setHistoricalData(normalized);
      })
      .catch(err => console.error("Error al cargar historial:", err));
  }, [clientId, token]);

  if (!historicalData.length) 
    return <p>Cargando tendencias...</p>;

  return (
    <div className="tendencias-wrapper">
      <h2>Tendencias Últimos 7 Días</h2>

      {/* Gráfica de Asistencia */}
      <div className="chart-container">
        <h3>Asistencia (%)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
            dataKey="date" 
            tickFormatter={(dateStr) => dateStr} 
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="attendance_percent"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de Satisfacción */}
      <div className="chart-container">
        <h3>Satisfacción Promedio</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} allowDecimals={true} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="avg_satisfaction"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de Fatiga */}
      <div className="chart-container">
        <h3>Fatiga Promedio</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} allowDecimals={true} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="avg_fatigue"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TendenciasCliente;
