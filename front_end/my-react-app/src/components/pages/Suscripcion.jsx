import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './Suscripcion.css';

const Suscripciones = () => {
  const [suscripcion, setSuscripcion] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('mis-suscripciones/')
      .then((res) => setSuscripcion(res.data))
      .catch((err) => {
        console.error('Error al obtener suscripción:', err);
        setError('No tienes suscripción activa o ocurrió un error.');
      });
  }, []);

  const handleCancelar = () => {
    if (!suscripcion) return;
    API.post('cancelar-suscripcion/', { subscription_id: suscripcion.stripe_subscription_id })
      .then(() => {
        alert('Tu suscripción se cancelará al final del período.');
        setSuscripcion((prev) => ({ ...prev, estado: 'cancelado' }));
      })
      .catch((err) => {
        console.error('Error al cancelar suscripción:', err);
        alert('No se pudo cancelar la suscripción.');
      });
  };

  const goToDashboard = () => navigate('/dashboard');

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!suscripcion) return <p className="text-center mt-8">Cargando información de tu suscripción…</p>;

  const { plan, fecha_inicio, fecha_fin, estado } = suscripcion;

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        {/* Ícono de flecha hacia atrás */}
        <button className="back-icon" onClick={goToDashboard} aria-label="Volver al Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-flecha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1>Suscripción</h1>
      </div>

      <div className="suscripcion-card">
        <h2>Detalles del plan</h2>
        <p><strong>Plan:</strong> {plan.nombre} ({plan.duracion_meses} mes/es)</p>
        <p><strong>Fecha inicio:</strong> {new Date(fecha_inicio).toLocaleDateString('es-CO')}</p>
        <p><strong>Fecha fin:</strong> {new Date(fecha_fin).toLocaleDateString('es-CO')}</p>
        <p><strong>Estado:</strong> {estado.charAt(0).toUpperCase() + estado.slice(1)}</p>

        {estado === 'activo' && (
          <button onClick={handleCancelar} className="suscripcion-button">
            Cancelar suscripción
          </button>
        )}

        {estado === 'vencido' && (
          <p className="estado-aviso text-yellow-600">
            Tu suscripción está vencida. Puedes{' '}
            <a href="/planes">elegir otro plan</a>.
          </p>
        )}

        {estado === 'pendiente' && (
          <p className="estado-aviso text-gray-600">
            Tu suscripción está pendiente de pago. Completa el proceso desde Checkout.
          </p>
        )}

        {estado === 'cancelado' && (
          <p className="estado-aviso text-gray-600">
            Esta suscripción se canceló y no se renovará. Puedes{' '}
            <a href="/planes">elegir otro plan</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Suscripciones;
