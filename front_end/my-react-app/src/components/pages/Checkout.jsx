import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import API from '../../services/api';
import './Checkout.css'; // Asegúrate de tener este archivo

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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
      API.post('confirmar-suscripcion/', { subscription_id: subscriptionId })
        .then(() => navigate('/Suscripcion'))
        .catch((err) => {
          console.error('Error al confirmar suscripción:', err);
          setError('Hubo un error al confirmar la suscripción.');
        });
    }
  };

  return (
    <form className="checkout-container" onSubmit={handleSubmit}>
      <h2 className="checkout-title">Detalles de pago</h2>

      <div className="card-icons">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcAmex />
      </div>

      <label className="card-label">Tarjeta de crédito o débito</label>
      <div className="card-element-wrapper">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      <button type="submit" disabled={!stripe} className="payment-button">
        Pagar y activar plan
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planKey = params.get('plan_key');

    if (!planKey) {
      setErrorMsg('No se especificó un plan.');
      return;
    }

    API.post('create-subscription/', { plan_key: planKey })
      .then((res) => {
        setClientSecret(res.data.client_secret);
        setSubscriptionId(res.data.subscription_id);

        if (res.data.status === 'succeeded') {
          API.post('confirmar-suscripcion/', {
            subscription_id: res.data.subscription_id,
          })
            .then(() => navigate('/Suscripcion'))
            .catch(() => setErrorMsg('Error al confirmar la suscripción ya pagada.'));
        } else {
          setMostrarFormulario(true);
        }
      })
      .catch((err) => {
        console.error('Error al crear suscripción:', err.response?.data || err.message);
        setErrorMsg('No se pudo iniciar el proceso de pago.');
      });
  }, [location.search, navigate]);

  if (errorMsg) return <p className="text-red-500 text-center mt-4">{errorMsg}</p>;
  if (!clientSecret && !errorMsg) return <p className="text-center mt-4">Cargando detalles de pago…</p>;

  return (
    mostrarFormulario ? (
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} subscriptionId={subscriptionId} />
      </Elements>
    ) : null
  );
}
