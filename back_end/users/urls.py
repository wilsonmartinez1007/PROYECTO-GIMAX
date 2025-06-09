from django.urls import path
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView, WorkoutDetailView, CreateExerciseView, WorkoutProgressView, ClienteStatsView, EntrenadorStatsView
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView
from .views import buscar_usuario_por_cedula
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView
from .views import buscar_usuario_por_cedula, codigo_generado, cambiar_contraseña, registrar_diagnostico
from .views import ClienteHistoricView
from .views import RutinaStatsView, ClienteStatsView, EntrenadorStatsView,ClienteRutinasView, stripe_webhook
from .views import (
    listar_planes,
    crear_cliente_stripe,
    crear_suscripcion,
    confirmar_suscripcion,
    obtener_mi_suscripcion,
    cancelar_suscripcion,
    stripe_webhook,
    create_payment_intent
)
urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('clientes/<int:client_id>/rutinas/', ClientWorkoutsView.as_view(), name='client-workouts'),
    path('rutinas/crear/', CreateWorkoutView.as_view(), name='crear-rutina'),
    path('usuarios/clientes/', ListaClientesView.as_view(), name='lista-clientes'),
    path('exercises/', ListaEjerciciosView.as_view(), name='lista-ejercicios'),
    path('rutinas/mias/', MisRutinasView.as_view(), name='mis-rutinas'),
    path('entrenador/clientes/', VerClientesDeEntrenadorView.as_view(), name='ver-clientes-entrenador'),
    path('buscar-usuario/', buscar_usuario_por_cedula, name='buscar-usuario'),#esto
    path('codigo/', codigo_generado, name = 'codigo'),
    path('cambiar-contraseña/', cambiar_contraseña, name='cambiar-contraseña'),
    path('registrar-diagnostico/', registrar_diagnostico, name='registrar_diagnostico'),
    path('rutinas/<int:pk>/', WorkoutDetailView.as_view(), name='detalle-rutina'),
    path('exercises/create/', CreateExerciseView.as_view(), name='create-exercise'),
    #path('buscar-usuario/', buscar_usuario_por_cedula, name='buscar-usuario'),
    path('rutinas/<int:pk>/progress/',
     WorkoutProgressView.as_view(),
     name='workout-progress'),
    path('estadisticas/cliente/<int:client_id>/', ClienteStatsView.as_view(), name='cliente-stats'),
    path('estadisticas/entrenador/', EntrenadorStatsView.as_view(), name='entrenador-stats'),
        path(
      'estadisticas/cliente/<int:client_id>/historial/',
      ClienteHistoricView.as_view(),
      name='cliente-historic'
    ),
        path(
        'estadisticas/cliente/<int:client_id>/rutina/<int:workout_id>/',
        RutinaStatsView.as_view(),
        name='rutina-stats'
    ),
        path(
        'rutinas/cliente/<int:client_id>/',
        ClienteRutinasView.as_view(),
        name='cliente-rutinas'
    ),
    path('webhook/stripe/', stripe_webhook, name='stripe-webhook'),
    path('planes/', listar_planes, name='listar_planes'),
    path('crear-customer-stripe/', crear_cliente_stripe, name='crear_cliente_stripe'),
    path('create-subscription/', crear_suscripcion, name='crear_suscripcion'),
    path('confirmar-suscripcion/', confirmar_suscripcion, name='confirmar_suscripcion'),
    path('mis-suscripciones/', obtener_mi_suscripcion, name='obtener_mi_suscripcion'),
    path('cancelar-suscripcion/', cancelar_suscripcion, name='cancelar_suscripcion'),
    path('create-payment-intent/',create_payment_intent, name='create_payment_intent'),
    

    
]




"""
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientesDeEntrenador.css";

const ClientesDeEntrenador = ({ token }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/entrenador/clientes/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes", error);
      });
  }, [token]);

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Mis Clientes</h1>
      </div>
      <div className="clientes-content">
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <div className="cliente-card" key={cliente.cliente_id}>
              <h2>{cliente.cliente_nombre}</h2>
              <p><strong>Rutina:</strong> {cliente.nombre_rutina}</p>
              <p><strong>Descripción:</strong> {cliente.descripcion_rutina}</p>
            </div>
          ))
        ) : (
          <p className="no-clientes">No tienes clientes asignados.</p>
        )}
      </div>
    </div>
  );
};

export default ClientesDeEntrenador;"""


"""
.clientes-container {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  .clientes-header {
    background-color: #FF2222;
    color: white;
    padding: 1.5rem 2rem;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .clientes-header h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
  }
  
  .clientes-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }
  
  .cliente-card {
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.2s;
  }
  
  .cliente-card:hover {
    transform: translateY(-5px);
  }
  
  .cliente-card h2 {
    margin-top: 0;
    color: #333;
  }
  
  .cliente-card p {
    margin: 0.5rem 0;
    color: #555;
  }
  
  .no-clientes {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
  }
"""