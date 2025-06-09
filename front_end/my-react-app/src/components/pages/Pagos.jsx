// src/components/pages/Pagos.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51QWt0dRpgCB0Fvu12kL1SZMCCQf0paSHPx0Bh9DDybKJrSC5EwlfmWKA8qUyIHVqFQTZ5Or7bwW6dtkQeAtDWHJv00z4WHV1xE');

function CheckoutForm({ clientSecret, subscriptionId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      // Confirmar suscripción en backend
      API.post('confirmar-suscripcion/', { subscription_id: subscriptionId })
        .then(() => {
          navigate('/mis-suscripciones');
        })
        .catch((err) => {
          console.error('Error al confirmar suscripción:', err);
          setError('Ocurrió un error al confirmar la suscripción.');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ingresa los datos de tu tarjeta</h2>
      <div className="mb-4">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button type="submit" disabled={!stripe} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full">
        Pagar y activar mi plan
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default function Pagos() {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cs = params.get('client_secret');
    const subsId = params.get('subscription_id');

    if (!cs || !subsId) {
      setErrorMsg('Faltan datos para procesar el pago.');
      return;
    }
    setClientSecret(cs);
    setSubscriptionId(subsId);
  }, [location.search]);

  if (errorMsg) return <p className="text-red-500">{errorMsg}</p>;
  if (!clientSecret) return <p>Cargando formulario de pago…</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} subscriptionId={subscriptionId} />
    </Elements>
  );
}
