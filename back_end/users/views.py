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
        token, _ = Token.objects.get_or_create(user=user)
        # Devolvemos también el rol del usuario
        return Response({
            "token": token.key,
            "role": user.role
        }, status=status.HTTP_200_OK)

    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

"""@api_view(['POST'])
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
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)"""

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
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

class ListaClientesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        clientes = User.objects.filter(role='cliente')
        resultado = []
        for c in clientes:
            resultado.append({
                'id': c.id,
                'cliente_nombre': f"{c.first_name} {c.last_name}",
                # aquí puedes seguir incluyendo otros campos que necesites
                # p.ej. 'email': c.email
            })
        return Response(resultado)


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


#editar y guardar 
# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

class WorkoutDetailView(RetrieveUpdateAPIView):
    # ... tu configuración actual
    queryset = Workout.objects.all()
    serializer_class = WorkoutDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        user = self.request.user
        if not (obj.trainer == user or obj.user == user):
            self.permission_denied(self.request, message="No tienes permisos")
        return obj

    def update(self, request, *args, **kwargs):
        # uso del serializer para validar y guardar
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        # en vez de return Response(serializer.data):
        return Response({"detail": "Rutina actualizada correctamente"}, status=status.HTTP_200_OK)


from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Workout
from .serializers import (
    WorkoutDetailReadSerializer,
    WorkoutDetailWriteSerializer,
    # … otros serializers que ya tengas
)

# Vista de MisRutinas (GET)
class MisRutinasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'cliente':
            rutinas = Workout.objects.filter(user=user)
        elif user.role == 'entrenador':
            rutinas = Workout.objects.filter(trainer=user)
        else:
            rutinas = Workout.objects.none()

        serializer = WorkoutDetailReadSerializer(rutinas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Vista de detalle/actualización (GET+PUT)
class WorkoutDetailView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Workout.objects.all()

    def get_serializer_class(self):
        # GET usa lectura, PUT usa escritura
        if self.request.method in ('PUT', 'PATCH'):
            return WorkoutDetailWriteSerializer
        return WorkoutDetailReadSerializer

    def get_object(self):
        obj = super().get_object()
        user = self.request.user
        if not (obj.trainer == user or obj.user == user):
            self.permission_denied(self.request, message="No tienes permisos")
        return obj

    def update(self, request, *args, **kwargs):
        # Llamamos a la lógica normal de validación/guardado
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"detail": "Rutina actualizada correctamente"}, status=status.HTTP_200_OK)


#crear video 
# views.py
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Exercise
from .serializers import ExerciseSerializer

class CreateExerciseView(CreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]


#para progreso usuario

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Workout, WorkoutExercise, WorkoutProgress
from .serializers import WorkoutProgressSerializer, WorkoutProgressInputSerializer

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Workout, WorkoutExercise, WorkoutProgress
from .serializers import WorkoutProgressSerializer, WorkoutProgressInputSerializer

class WorkoutProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        workout = Workout.objects.get(pk=pk)
        if not (request.user == workout.user or request.user == workout.trainer):
            return Response({"detail": "No tienes permisos"}, status=403)

        today = timezone.now().date()
        exercises = WorkoutExercise.objects.filter(workout=workout)
        progress_qs = WorkoutProgress.objects.filter(
            user=request.user,
            workout=workout,
            date=today
        )

        data = []
        for we in exercises:
            entry = progress_qs.filter(workout_exercise=we).first()
            data.append({
                'workout_exercise': we.id,
                'completed': entry.completed if entry else False,
                'satisfaction': entry.satisfaction if entry else None,
                'fatigue': entry.fatigue if entry else None
            })
        return Response(data)

    def post(self, request, pk):
        data = request.data
        serializer = WorkoutProgressInputSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        we_id = serializer.validated_data['workout_exercise']
        completed = serializer.validated_data['completed']
        satisfaction = serializer.validated_data.get('satisfaction')
        fatigue = serializer.validated_data.get('fatigue')

        we = WorkoutExercise.objects.filter(id=we_id, workout__pk=pk).first()
        if not we:
            return Response({"detail": "Ejercicio no encontrado"}, status=404)
        if request.user != we.workout.user:
            return Response({"detail": "No tienes permisos"}, status=403)

        today = timezone.now().date()

        progress, _ = WorkoutProgress.objects.update_or_create(
            user=request.user,
            workout=we.workout,
            workout_exercise=we,
            date=today,
            defaults={
                'completed': completed,
                'satisfaction': satisfaction,
                'fatigue': fatigue
            }
        )

        print(f"[DEBUG Progress] user={request.user.id} we={we_id} date={today} completed={completed} sat={satisfaction} fat={fatigue}")

        out = WorkoutProgressSerializer(progress)
        return Response(out.data, status=200)

# para ver las stats de los clientes

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Avg, Count, Q
from .models import WorkoutProgress, Workout

class ClienteStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id):
        # 1) Verificar permisos
        if request.user.role == 'entrenador':
            workouts = Workout.objects.filter(
                user__id=client_id,
                trainer=request.user
            )
        elif request.user.role == 'cliente' and request.user.id == client_id:
            workouts = Workout.objects.filter(user=request.user)
        else:
            return Response({"detail": "No tienes permisos"}, status=403)

        # 2) TOTAL_DE_EJERCICIOS = contar todas las filas de WorkoutExercise
        total_exercises = WorkoutExercise.objects.filter(
            workout__in=workouts
        ).count()

        # 3) Fecha de hoy
        today = timezone.now().date()

        # 4) COMPLETED_EXERCISES = cuántos WorkoutProgress con completed=True y date=today
        completed_exercises = WorkoutProgress.objects.filter(
            workout__in=workouts,
            completed=True,
            date=today
        ).count()

        # 5) Para cada workout, tomar el “ejercicio principal” (primer elemento en exercises)
        #    y leer su fila de WorkoutProgress (si existe y date=today). 
        sats = []
        fats = []
        for workout in workouts:
            # Obtenemos el primer WorkoutExercise de esta rutina (ejercicio principal)
            principal_we = WorkoutExercise.objects.filter(workout=workout).order_by('id').first()
            if not principal_we:
                continue

            # Buscar la fila de progreso de hoy para ese ejercicio principal
            try:
                prog = WorkoutProgress.objects.get(
                    workout_exercise=principal_we,
                    user=(workout.user),
                    date=today
                )
                # Si tiene valor de satisfaction/fatigue (no null), lo tomamos
                if prog.satisfaction is not None:
                    sats.append(prog.satisfaction)
                if prog.fatigue is not None:
                    fats.append(prog.fatigue)
            except WorkoutProgress.DoesNotExist:
                # Si no se creó la fila para hoy, lo ignoramos
                continue

        # 6) Calcular promedio de los valores “oficiales” (uno por rutina)
        if sats:
            avg_sat = sum(sats) / len(sats)
        else:
            avg_sat = 0

        if fats:
            avg_fat = sum(fats) / len(fats)
        else:
            avg_fat = 0

        # 7) Debug: imprimir en consola
        print(
            f"[DEBUG ClienteStats] client_id={client_id} total_ex={total_exercises} "
            f"completed_ex(today)={completed_exercises} avg_sat={avg_sat:.2f} avg_fat={avg_fat:.2f}"
        )

        # 8) Calcular porcentaje de asistencia (evitar división por cero)
        if total_exercises:
            asistencia = round(completed_exercises / total_exercises * 100, 2)
        else:
            asistencia = 0

        return Response({
            "asistencia_percent": asistencia,
            "avg_satisfaction": round(avg_sat, 2),
            "avg_fatigue": round(avg_fat, 2),
        })

#tendencias
from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Workout, WorkoutProgress

class ClienteHistoricView(APIView):
    """
    Retorna para las últimas N días (por defecto 7) las métricas diarias
    de un cliente: nivel de satisfacción y fatiga por rutina, porcentaje
    de ejercicios completados y nombre de la rutina realizada ese día.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id):
        # 1) Permisos de acceso
        if request.user.role == 'entrenador':
            workouts = Workout.objects.filter(user__id=client_id, trainer=request.user)
        elif request.user.role == 'cliente' and request.user.id == client_id:
            workouts = Workout.objects.filter(user=request.user)
        else:
            return Response({"detail": "No tienes permisos"}, status=403)

        # 2) Rango de fechas (local): últimos 7 días, incluyendo hoy
        end_date = timezone.localdate()
        start_date = end_date - timedelta(days=6)

        # 3) Filtrar progresos en rango (DateField, sin time)
        qs = WorkoutProgress.objects.filter(
            workout__in=workouts,
            date__range=(start_date, end_date)
        )

        data = []
        for i in range(7):
            day = start_date + timedelta(days=i)
            entries = qs.filter(date=day)

            if entries.exists():
                # Seleccionamos la rutina del día (asumimos una rutina por día)
                first_prog = entries.first()
                # 4) Nivel de satisfacción y fatiga de la rutina completa
                avg_sat = round(first_prog.satisfaction or 0, 2)
                avg_fat = round(first_prog.fatigue or 0, 2)

                # 5) Porcentaje de ejercicios completados
                total_ej = entries.count()
                comp_ej = entries.filter(completed=True).count()
                attendance = round((comp_ej / total_ej * 100), 2) if total_ej else 0

                # 6) Nombre de la rutina
                workout_name = first_prog.workout.name if first_prog.workout else None

                data.append({
                    "date": day.isoformat(),
                    "avg_satisfaction": avg_sat,
                    "avg_fatigue": avg_fat,
                    "attendance_percent": attendance,
                    "workout_name": workout_name
                })
            else:
                # 7) Sin registros en ese día
                data.append({
                    "date": day.isoformat(),
                    "avg_satisfaction": 0.0,
                    "avg_fatigue": 0.0,
                    "attendance_percent": 0.0,
                    "workout_name": None
                })

        return Response(data)

# stats globales entrenadorrr

class EntrenadorStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'entrenador':
            return Response({"detail": "No tienes permisos"}, status=403)

        workouts = Workout.objects.filter(trainer=request.user)
        today = timezone.now().date()

        total_exercises = WorkoutExercise.objects.filter(workout__in=workouts).count()

        completed_exercises = WorkoutProgress.objects.filter(
            workout__in=workouts,
            completed=True,
            date=today
        ).count()

        sats = []
        fats = []
        for workout in workouts:
            principal_we = WorkoutExercise.objects.filter(workout=workout).order_by('id').first()
            if not principal_we:
                continue
            try:
                prog = WorkoutProgress.objects.get(
                    workout_exercise=principal_we,
                    user=(workout.user),
                    date=today
                )
                if prog.satisfaction is not None:
                    sats.append(prog.satisfaction)
                if prog.fatigue is not None:
                    fats.append(prog.fatigue)
            except WorkoutProgress.DoesNotExist:
                continue

        if sats:
            avg_sat = sum(sats) / len(sats)
        else:
            avg_sat = 0

        if fats:
            avg_fat = sum(fats) / len(fats)
        else:
            avg_fat = 0

        print(
            f"[DEBUG EntrenadorStats] trainer={request.user.id} total_ex={total_exercises} "
            f"completed_ex(today)={completed_exercises} avg_sat={avg_sat:.2f} avg_fat={avg_fat:.2f}"
        )

        if total_exercises:
            asistencia = round(completed_exercises / total_exercises * 100, 2)
        else:
            asistencia = 0

        return Response({
            "clientes_activos": workouts.values('user').distinct().count(),
            "asistencia_percent": asistencia,
            "avg_satisfaction": round(avg_sat, 2),
            "avg_fatigue": round(avg_fat, 2),
        })

#holaaaaaaaaa

#para ver las estadisticas por rutina 

class RutinaStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id, workout_id):
        # 1) Verificar que la rutina existe
        try:
            workout = Workout.objects.get(pk=workout_id)
        except Workout.DoesNotExist:
            return Response({"detail": "Rutina no encontrada"}, status=404)

        # 2) Verificar permisos según rol
        if request.user.role == 'cliente':
            # El cliente solo puede ver sus propias rutinas
            if workout.user.id != request.user.id:
                return Response({"detail": "No tienes permisos"}, status=403)
        elif request.user.role == 'entrenador':
            # El entrenador solo puede ver las rutinas que él asignó
            if workout.trainer != request.user:
                return Response({"detail": "No tienes permisos"}, status=403)
        else:
            return Response({"detail": "No tienes permisos"}, status=403)

        # 3) Fecha de hoy
        today = timezone.now().date()

        # 4) TOTAL_DE_EJERCICIOS = contar todos los WorkoutExercise de esta rutina
        total_exercises = WorkoutExercise.objects.filter(workout=workout).count()

        # 5) COMPLETED_EXERCISES = cuántos WorkoutProgress de hoy, completed=True, para esta rutina
        completed_exercises = WorkoutProgress.objects.filter(
            workout=workout,
            completed=True,
            date=today
        ).count()

        # 6) Tomar el “ejercicio principal” (el primero) para leer sus sat/fat
        principal_we = WorkoutExercise.objects.filter(workout=workout).order_by('id').first()

        sats = []
        fats = []
        if principal_we:
            try:
                prog = WorkoutProgress.objects.get(
                    workout_exercise=principal_we,
                    user=workout.user,
                    date=today
                )
                if prog.satisfaction is not None:
                    sats.append(prog.satisfaction)
                if prog.fatigue is not None:
                    fats.append(prog.fatigue)
            except WorkoutProgress.DoesNotExist:
                pass

        avg_sat = sum(sats) / len(sats) if sats else 0
        avg_fat = sum(fats) / len(fats) if fats else 0

        # 7) DEBUG en consola
        print(
            f"[DEBUG RutinaStats] workout_id={workout_id} "
            f"total_ex={total_exercises} "
            f"completed_ex(today)={completed_exercises} "
            f"avg_sat={avg_sat:.2f} avg_fat={avg_fat:.2f}"
        )

        # 8) Calcular porcentaje de asistencia
        asistencia = round((completed_exercises / total_exercises * 100), 2) if total_exercises else 0

        return Response({
            "workout_id": workout_id,
            "asistencia_percent": asistencia,
            "avg_satisfaction": round(avg_sat, 2),
            "avg_fatigue": round(avg_fat, 2),
        })

#para listar solo rutinas de x cliente para las estadisticas

class ClienteRutinasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, client_id):
        # Si el usuario es “cliente”, solo puede ver sus propias rutinas
        if request.user.role == 'cliente':
            if request.user.id != client_id:
                return Response({"detail": "No tienes permisos"}, status=403)
            rutinas = Workout.objects.filter(user=request.user)

        # Si el usuario es “entrenador”, solo puede ver las rutinas que él asignó a ese cliente
        elif request.user.role == 'entrenador':
            rutinas = Workout.objects.filter(user__id=client_id, trainer=request.user)

        else:
            return Response({"detail": "No tienes permisos"}, status=403)

        serializer = WorkoutSerializer(rutinas, many=True)
        return Response(serializer.data)
    
#pagos

# users/views.py (o payments/views.py)
import stripe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    amount = request.data.get('amount')
    if not amount:
        return Response({'error': 'Se requiere amount'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount),
            currency='cop',
            metadata={'user_id': request.user.id}
        )
        return Response({'clientSecret': intent.client_secret})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#webhook para confirmar pagos

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import stripe
from django.conf import settings
from .models import Payment, User

stripe.api_key = settings.STRIPE_SECRET_KEY



# mas pagos 

# payments/views.py
import stripe
from datetime import datetime
from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import SubscriptionPlan, CustomerProfile, Subscription, PaymentLog
from .serializers import SubscriptionPlanSerializer, SubscriptionSerializer

# Configurar la clave secreta de Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY



@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def listar_planes(request):
    """
    GET /api/subscriptions/planes/
    Devuelve la lista de SubscriptionPlan activos con el precio final calculado.
    """
    planes = SubscriptionPlan.objects.filter(activo=True)
    serializer = SubscriptionPlanSerializer(planes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def crear_cliente_stripe(request):
    """
    POST /api/subscriptions/crear-customer-stripe/
    Crea un Customer en Stripe si no existe, y guarda stripe_customer_id en CustomerProfile.
    """
    user = request.user
    perfil, _ = CustomerProfile.objects.get_or_create(user=user)

    if perfil.stripe_customer_id:
        return Response({"stripe_customer_id": perfil.stripe_customer_id}, status=status.HTTP_200_OK)

    try:
        customer = stripe.Customer.create(
            email=user.email,
            name=f"{user.first_name} {user.last_name}"
        )
        perfil.stripe_customer_id = customer.id
        perfil.save()
        return Response({"stripe_customer_id": customer.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": f"No se pudo crear cliente en Stripe: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

from stripe.error import InvalidRequestError

# back_end/users/views.py

import stripe
from datetime import date
from dateutil.relativedelta import relativedelta
from django.conf import settings
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import SubscriptionPlan, CustomerProfile, Subscription

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def crear_suscripcion(request):
    """
    POST /api/create-subscription/
    Body: { "plan_key": "MEN" }

    1) Crear subs. en Stripe incomplete.
    2) Recuperar o crear PaymentIntent.
    3) Calcular fechas localmente.
    4) Guardar subs. local.
    5) Devolver subscription_id + client_secret.
    """
    user = request.user
    plan_key = request.data.get('plan_key')
    if not plan_key:
        return Response({"error": "Falta el plan_key."},
                        status=status.HTTP_400_BAD_REQUEST)

    # 1) Verificar plan
    try:
        plan = SubscriptionPlan.objects.get(key=plan_key, activo=True)
    except SubscriptionPlan.DoesNotExist:
        return Response({"error": "Plan no encontrado."},
                        status=status.HTTP_404_NOT_FOUND)

    # 2) Asegurar Stripe Customer
    perfil, _ = CustomerProfile.objects.get_or_create(user=user)
    if not perfil.stripe_customer_id:
        cust = stripe.Customer.create(email=user.email, name=f"{user.first_name} {user.last_name}")
        perfil.stripe_customer_id = cust.id
        perfil.save()

    # 3) Crear subs. incomplete
    sub = stripe.Subscription.create(
        customer=perfil.stripe_customer_id,
        items=[{"price": plan.stripe_price_id}],
        trial_period_days=0,
        payment_behavior="default_incomplete",
    )

    # 4) Recuperar la factura y su PaymentIntent (si existe)
    invoice = stripe.Invoice.retrieve(
        sub.latest_invoice,
        expand=["payment_intent"]
    )
    # Intentamos leer invoice.payment_intent
    pi = getattr(invoice, 'payment_intent', None) or invoice.get('payment_intent')
    # Si no trae uno, lo creamos manualmente:
    if not pi:
        pi = stripe.PaymentIntent.create(
            amount=invoice.amount_due,
            currency=invoice.currency,
            customer=perfil.stripe_customer_id,
            metadata={"subscription_id": sub.id},
        )

    client_secret = pi.client_secret

    # 5) Calcular fechas localmente
    hoy = date.today()
    fecha_inicio = hoy
    fecha_fin    = hoy + relativedelta(months=plan.duracion_meses)

    # 6) Guardar subs. local en estado “pendiente”
    Subscription.objects.create(
        user=user,
        plan=plan,
        stripe_subscription_id=sub.id,
        estado='pendiente',
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
    )

    # 7) Responder al frontend
    return Response({
        "subscription_id": sub.id,
        "client_secret": client_secret
    }, status=status.HTTP_201_CREATED)


from datetime import datetime
from datetime import date
from .models import Subscription, PaymentLog

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirmar_suscripcion(request):
    user = request.user
    subscription_id = request.data.get('subscription_id')
    if not subscription_id:
        return Response(
            {"error": "Falta subscription_id."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Solo actualizo local, sin verificar Stripe
    try:
        sub_local = Subscription.objects.get(
            stripe_subscription_id=subscription_id,
            user=user
        )
    except Subscription.DoesNotExist:
        return Response(
            {"error": "Suscripción local no encontrada."},
            status=status.HTTP_404_NOT_FOUND
        )

    # Marco la suscripción como activa hoy mismo
    sub_local.estado = 'activo'
    sub_local.fecha_inicio = date.today()
    # Si quieres usar fin = hoy + meses del plan:
    # from dateutil.relativedelta import relativedelta
    # sub_local.fecha_fin = date.today() + relativedelta(months=sub_local.plan.duracion_meses)
    sub_local.save()

    # (Opcional) Log local inmediato
    try:
        PaymentLog.objects.create(
            subscription=sub_local,
            monto_cop=sub_local.plan.precio_final_cop(),
            stripe_payment_intent_id=None,
            fue_exitoso=True,
            respuesta={"msg": "confirmado manualmente"}
        )
    except:
        pass

    return Response(
        {"message": "Suscripción marcada como activa."},
        status=status.HTTP_200_OK
    )
"""
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirmar_suscripcion(request):
    user = request.user
    subscription_id = request.data.get('subscription_id')
    if not subscription_id:
        return Response({"error": "Falta subscription_id."},
                        status=status.HTTP_400_BAD_REQUEST)

    # 1) Recuperar la suscripción (sin expand)
    try:
        stripe_sub = stripe.Subscription.retrieve(subscription_id)
    except Exception as e:
        return Response({"error": f"No se encontró en Stripe: {str(e)}"},
                        status=status.HTTP_404_NOT_FOUND)

    # 2) Obtener la factura asociada y expandir su payment_intent
    invoice_id = stripe_sub.latest_invoice
    try:
        invoice = stripe.Invoice.retrieve(invoice_id, expand=["payment_intent"])
    except Exception as e:
        return Response({"error": f"No se pudo recuperar la factura: {str(e)}"},
                        status=status.HTTP_400_BAD_REQUEST)

    pi = getattr(invoice, "payment_intent", None)
    if not pi or getattr(pi, "status", None) != "succeeded":
        return Response({
            "error": (
                f"El pago no ha finalizado correctamente "
                f"(payment_intent.status={getattr(pi,'status',None)})."
            )
        }, status=status.HTTP_400_BAD_REQUEST)

    # 3) Actualizar o crear el registro local de la suscripción
    from .models import Subscription, PaymentLog  # ajustar import según tu estructura

    try:
        sub_local = Subscription.objects.get(
            stripe_subscription_id=subscription_id,
            user=user
        )
    except Subscription.DoesNotExist:
        return Response({"error": "Suscripción local no encontrada."},
                        status=status.HTTP_404_NOT_FOUND)

    # 4) Guardar fechas y estado
    sub_local.fecha_inicio = datetime.fromtimestamp(stripe_sub.current_period_start).date()
    sub_local.fecha_fin    = datetime.fromtimestamp(stripe_sub.current_period_end).date()
    sub_local.estado       = 'activo'
    sub_local.save()

    # 5) Registrar en PaymentLog
    try:
        PaymentLog.objects.create(
            subscription=sub_local,
            monto_cop=sub_local.plan.precio_final_cop(),
            stripe_payment_intent_id=pi.id,
            fue_exitoso=True,
            respuesta=pi.to_dict() if hasattr(pi, "to_dict") else pi
        )
    except Exception:
        # Si no se puede registrar el log, no importa tanto
        pass

    return Response({"message": "Suscripción activa y confirmada."},
                    status=status.HTTP_200_OK)
"""

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def obtener_mi_suscripcion(request):
    """
    GET /api/subscriptions/mis-suscripciones/
    Retorna la última suscripción (activa o pendiente) del usuario.
    """
    user = request.user
    suscripciones = Subscription.objects.filter(user=user).order_by('-id')
    if not suscripciones.exists():
        return Response({"detail": "No tienes suscripciones."}, status=status.HTTP_404_NOT_FOUND)

    última = suscripciones.first()
    serializer = SubscriptionSerializer(última)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def cancelar_suscripcion(request):
    """
    POST /api/subscriptions/cancelar-suscripcion/
    Body: { "subscription_id": "sub_XXX" }
    Marca la suscripción para cancelar al final del período.
    """
    user = request.user
    subscription_id = request.data.get('subscription_id')
    if not subscription_id:
        return Response({"error": "Falta subscription_id."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        sub_local = Subscription.objects.get(stripe_subscription_id=subscription_id, user=user)
    except Subscription.DoesNotExist:
        return Response({"error": "Suscripción local no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    try:
        stripe.Subscription.modify(subscription_id, cancel_at_period_end=True)
    except Exception as e:
        return Response({"error": f"No se pudo cancelar en Stripe: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    sub_local.estado = 'cancelado'
    sub_local.save()
    return Response({"message": "Se cancelará al final del período."}, status=status.HTTP_200_OK)


@csrf_exempt
def stripe_webhook(request):
    """
    POST /api/subscriptions/webhook/stripe/
    Endpoint al que Stripe envía eventos (invoice.payment_succeeded, invoice.payment_failed, customer.subscription.deleted, etc.).
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    tipo = event['type']
    data = event['data']['object']

    # 1) invoice.payment_succeeded → renovar suscripción
    if tipo == 'invoice.payment_succeeded':
        subscription_id = data.get('subscription')
        try:
            sub_local = Subscription.objects.get(stripe_subscription_id=subscription_id)
            stripe_sub = stripe.Subscription.retrieve(subscription_id)
            nueva_fecha_fin = datetime.fromtimestamp(stripe_sub.current_period_end).date()
            sub_local.fecha_fin = nueva_fecha_fin
            sub_local.estado = 'activo'
            sub_local.save()

            payment_intent_id = data['payment_intent']
            PaymentLog.objects.create(
                subscription=sub_local,
                monto_cop=sub_local.plan.precio_final_cop(),
                stripe_payment_intent_id=payment_intent_id,
                fue_exitoso=True,
                respuesta=data
            )
        except Subscription.DoesNotExist:
            pass

    # 2) invoice.payment_failed → marcar vencido
    if tipo == 'invoice.payment_failed':
        subscription_id = data.get('subscription')
        try:
            sub_local = Subscription.objects.get(stripe_subscription_id=subscription_id)
            sub_local.estado = 'vencido'
            sub_local.save()
        except Subscription.DoesNotExist:
            pass

    # 3) customer.subscription.deleted → suscripción cancelada
    if tipo == 'customer.subscription.deleted':
        subscription_id = data.get('id')
        try:
            sub_local = Subscription.objects.get(stripe_subscription_id=subscription_id)
            sub_local.estado = 'cancelado'
            sub_local.save()
        except Subscription.DoesNotExist:
            pass

    return HttpResponse(status=200)
