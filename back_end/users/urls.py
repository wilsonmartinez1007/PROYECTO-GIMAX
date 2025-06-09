from django.urls import path
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView, WorkoutDetailView, CreateExerciseView, WorkoutProgressView, ClienteStatsView, EntrenadorStatsView
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView
from .views import buscar_usuario_por_cedula
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView
from .views import buscar_usuario_por_cedula, codigo_generado, cambiar_contraseña, registrar_diagnostico,obtener_gimnasios,obtener_rol_usuario


from django.urls import include
from rest_framework.routers import DefaultRouter
from .views import PerfilEntrenadorViewSet

# Router para ViewSets
router = DefaultRouter()
router.register(r'perfil-entrenador', PerfilEntrenadorViewSet, basename='perfil-entrenador')

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
    
    path('', include(router.urls)),

    path('obtener-gimnasios/', obtener_gimnasios, name='obtener-gimnasios'),
    path('obtener-rol/', obtener_rol_usuario, name='obtener-rol'),

]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


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