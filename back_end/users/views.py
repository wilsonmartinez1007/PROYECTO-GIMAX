from django.shortcuts import render

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


from .models import Workout, WorkoutExercise, Exercise, User, Gym, Diagnostico

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    
    if user:
        try:
            diagnostico = Diagnostico.objects.get(user=user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        except Diagnostico.DoesNotExist:
            return Response({
                "mensaje": "nop"
            }, status=404)
        #mal -->return Response({"diagnostico": diagnostico.edad}, status=status.HTTP_200_OK)
        #token, _ = Token.objects.get_or_create(user=user)
        #return Response({"token": token.key}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  #  Asegura que solo usuarios logueados puedan hacer logout
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "Cierre de cuenta exitoso"}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Algo salió mal"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.core.mail import send_mail









#funcion correos
from django.core.mail import send_mail

def enviar_correo_rutina_creada(usuario_email, nombre_usuario):
    send_mail(
        subject='¡Tu nueva rutina ha sido creada!',
        message=f'Hola {nombre_usuario}, ya puedes revisar tu nueva rutina de entrenamiento en la app.',
        from_email='tunuevocorreo@gmail.com',
        recipient_list=[usuario_email],
        fail_silently=False,
    )


# Todo de aqui para abajao es de crear rutina y verlas
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Workout
from .serializers import WorkoutSerializer

class ClientWorkoutsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id):
        if request.user.role != 'entrenador':
            return Response({'error': 'No autorizado'}, status=403)
        
        workouts = Workout.objects.filter(user__id=client_id, trainer=request.user)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import WorkoutSerializer
from rest_framework.permissions import AllowAny  

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Gym, Workout, Exercise, WorkoutExercise
from rest_framework import status

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Workout, WorkoutExercise, Exercise, User, Gym
from .serializers import WorkoutSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail  # 👈 Importamos el envío de correo

class CreateWorkoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        try:
            cliente = User.objects.get(id=data['cliente_id'], role='cliente')
            gym = Gym.objects.get(id=data['gym_id'])
        except User.DoesNotExist:
            return Response({'error': 'Cliente no válido'}, status=400)

        # ✅ Crear la rutina
        workout = Workout.objects.create(
            user=cliente,
            trainer=request.user,
            gym=gym,
            name=data['name'],
            description=data.get('description', '')
        )

        # ✅ Agregar ejercicios
        for ex in data['exercises']:
            exercise = Exercise.objects.get(id=ex['exercise_id'])  # Ya debe existir
            WorkoutExercise.objects.create(
                workout=workout,
                exercise=exercise,
                sets=ex['sets'],
                reps=ex['reps'],
                rest_time=ex['rest_time'],
                day=ex['day']
            )

        # ✅ Enviar correo al cliente
        self.enviar_correo_rutina_creada(cliente.email, cliente.username)

        return Response({'success': 'Rutina creada correctamente'}, status=201)

    # 📧 Función para enviar correo
    def enviar_correo_rutina_creada(self, usuario_email, nombre_usuario):
        send_mail(
            subject='¡Tu nueva rutina ha sido creada!',
            message = f'''
Hola {nombre_usuario},

¡Tu nueva rutina de entrenamiento ha sido creada con éxito!

Ya puedes ingresar a la app y consultar todos los detalles de tu nueva rutina.
¿Qué esperas para comenzar? Cada entrenamiento te acerca más a la mejor versión de ti. 


— El equipo de Gymax
''',
            from_email='tunuevocorreo@gmail.com',  # Cambia por tu Gmail
            recipient_list=[usuario_email],
            fail_silently=False,
        )




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer

class ListaClientesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        clientes = User.objects.filter(role='cliente')
        serializer = UserSerializer(clientes, many=True)
        return Response(serializer.data)


from .models import Exercise
from .serializers import ExerciseSerializer
from rest_framework.generics import ListAPIView

class ListaEjerciciosView(ListAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [AllowAny]

#vista rutina cliente 

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Workout
from .serializers import WorkoutDetailSerializer

class MisRutinasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("Usuario autenticado:", request.user)
        print("Rol:", getattr(request.user, 'role', 'sin rol'))

        user = request.user
        
        if user.role == 'cliente':
            rutinas = Workout.objects.filter(user=user)
        elif user.role == 'entrenador':
            rutinas = Workout.objects.filter(trainer=user)
        else:
            rutinas = Workout.objects.all()

        serializer = WorkoutDetailSerializer(rutinas, many=True)
        return Response(serializer.data)
        
#hasta aqui es el codigo de crear rutina y ver rutina


#aqui viene la opcion para que los entrenadores vean a sus clientes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Workout

class VerClientesDeEntrenadorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'entrenador':
            return Response({"message": "No tienes permisos para acceder a esta información."}, status=status.HTTP_403_FORBIDDEN)
        
        # Obtener las rutinas asignadas a los clientes del entrenador
        rutinas = Workout.objects.filter(trainer=request.user)

        # Preparar la información para los clientes
        clientes = []
        for rutina in rutinas:
            clientes.append({
                'cliente_id': rutina.user.id,
                'cliente_nombre': f"{rutina.user.first_name} {rutina.user.last_name}",
                'rutina_id': rutina.id,
                'nombre_rutina': rutina.name,
                'descripcion_rutina': rutina.description,
            })
        
        return Response(clientes, status=status.HTTP_200_OK)
    


#para reenviar el correo de la persona en Olvide Contraseña:
from .models import User  # Asegúrate de importar tu modelo personalizado

@api_view(['POST'])
def buscar_usuario_por_cedula(request):
    cedula = request.data.get("cedula")
    if not cedula:
        return Response({"error": "La cédula es requerida."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = User.objects.get(cedula=cedula)
        enviar_correo_codigo(usuario.email)
        return Response({"email": usuario.email}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
#
import random
import string

def generar_codigo(longitud):
    caracteres = string.ascii_letters + string.digits
    codigo = ''.join(random.choice(caracteres) for _ in range(longitud))
    return codigo

# Ejemplo de uso:
longitud_codigo = 5
nueva_codigo = generar_codigo(longitud_codigo)
@api_view(['POST'])
def codigo_generado(request):
    return Response({"codigo": nueva_codigo}, status=status.HTTP_200_OK)

def enviar_correo_codigo(usuario_email):
        send_mail(
            subject='¡Recuperacion de contraseña!',
            message = f'''
        Hola,

        ¡Tu codigo para tu nueva contrseña ha sido generado!

        Codigo: {nueva_codigo}
        — El equipo de Gymax
        ''',
                    from_email='tunuevocorreo@gmail.com',  # Cambia por tu Gmail
                    recipient_list=[usuario_email],
                    fail_silently=False,
                )

#cambiar contra

@api_view(['POST'])
def cambiar_contraseña(request):
    cedula = request.data.get('cedula')
    nueva_contraseña = request.data.get('nueva_contraseña')

    if not cedula or not nueva_contraseña:
        return Response({"error": "Faltan datos"}, status=400)

    try:
        usuario = User.objects.get(cedula=cedula)  # o User si estás usando el modelo estándar
        usuario.set_password(nueva_contraseña)
        usuario.save()
        return Response({"mensaje": "Contraseña actualizada correctamente"})
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)



from .serializers import DiagnosticoSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def registrar_diagnostico(request):
    serializer = DiagnosticoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # <--- Aquí estás asignando el usuario
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

