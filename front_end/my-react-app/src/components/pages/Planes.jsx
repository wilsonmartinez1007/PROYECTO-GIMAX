import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Planes.css';

const Planes = () => {
  const [planes, setPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('planes/')
      .then((res) => setPlanes(res.data))
      .catch((err) => console.error('Error al obtener planes:', err));
  }, []);

  const seleccionarPlan = (plan_key) => {
    navigate(`/checkout?plan_key=${plan_key}`);
  };

  return (
    <div className="planes-container">
      <div className="planes-header">
        <h1>Planes</h1>
      </div>

      <div className="planes-content">
        {planes.map((plan) => (
          <div key={plan.key} className="plan-card">
            <h3 className="plan-name">{plan.nombre}</h3>
            <p className="plan-duration">
              {plan.duracion_meses} {plan.duracion_meses > 1 ? 'meses' : 'mes'}
            </p>
            <p className="plan-price">
              <strong>{plan.precio_final.toLocaleString('es-CO')} COP</strong>
            </p>
            <div className="button-container">
            <button
              className="subscribe-button"
              onClick={() => seleccionarPlan(plan.key)}
            >
              Suscribirme
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;
