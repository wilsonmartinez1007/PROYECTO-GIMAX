from django.urls import path
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView

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


]