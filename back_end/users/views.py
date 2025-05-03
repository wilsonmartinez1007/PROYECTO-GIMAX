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
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # 👈 Asegura que solo usuarios logueados puedan hacer logout
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "Cierre de cuenta exitoso"}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Algo salió mal"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
from .models import Workout, WorkoutExercise, Exercise, User, Gym
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

class CreateWorkoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        try:
            cliente = User.objects.get(id=data['cliente_id'], role='cliente')
            gym = Gym.objects.get(id=data['gym_id'])
        except User.DoesNotExist:
            return Response({'error': 'Cliente no válido'}, status=400)

        workout = Workout.objects.create(
            user=cliente,
            trainer=request.user,
            gym=gym,
            name=data['name'],
            description=data.get('description', '')
        )

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

        return Response({'success': 'Rutina creada correctamente'}, status=201)




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