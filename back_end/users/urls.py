from django.urls import path
from .views import register, login, logout, ClientWorkoutsView, CreateWorkoutView, ListaClientesView, ListaEjerciciosView, MisRutinasView, VerClientesDeEntrenadorView
from .views import buscar_usuario_por_cedula, codigo_generado, cambiar_contraseña, registrar_diagnostico
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

]