from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password_confirm', 'cedula', 'apellido', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # Ya fue validada, no se guarda
        user = User.objects.create_user(**validated_data)
        return user

# aqui empieza para crear rutina

from rest_framework import serializers
from .models import Workout, WorkoutExercise, Exercise

class ExerciseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'muscle_group', 'video_url']

class WorkoutExerciseSerializer(serializers.ModelSerializer):
    exercise = ExerciseDetailSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['day', 'sets', 'reps', 'rest_time', 'exercise']

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(source='workoutexercise_set', many=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'created_at', 'exercises']

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

#aqui termina

# ver rutinas cliente
class WorkoutExerciseDetailSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['id', 'exercise', 'sets', 'reps', 'rest_time', 'day']

class WorkoutDetailSerializer(serializers.ModelSerializer):
    exercises = serializers.SerializerMethodField()
    trainer = UserSerializer()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'created_at', 'trainer', 'exercises']

    def get_exercises(self, obj):
        we = WorkoutExercise.objects.filter(workout=obj)
        return WorkoutExerciseDetailSerializer(we, many=True).data


# aqui termina


#editar y act rutinas
from rest_framework import serializers
from .models import Workout, WorkoutExercise
from django.contrib.auth import get_user_model
User = get_user_model()

# --- Serializer viejo, solo para lectura ---
class WorkoutExerciseDetailSerializer(serializers.ModelSerializer):
    exercise = serializers.SerializerMethodField()

    class Meta:
        model = WorkoutExercise
        fields = ['id','exercise', 'sets', 'reps', 'rest_time', 'day']

    def get_exercise(self, obj):
        # Devuelve nombre, descripción, muscle_group, video_url…
        return {
            'id': obj.exercise.id,
            'name': obj.exercise.name,
            'description': obj.exercise.description,
            'muscle_group': obj.exercise.muscle_group,
            'video_url': obj.exercise.video_url,
        }

class WorkoutDetailReadSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseDetailSerializer(many=True, source='workoutexercise_set')
    trainer = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'created_at', 'trainer', 'exercises']

    def get_trainer(self, obj):
        return {
            'id': obj.trainer.id,
            'first_name': obj.trainer.first_name,
            'last_name': obj.trainer.last_name,
        }


# --- Nuevo serializer solo para actualización (PUT) ---
class WorkoutExerciseInputSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    sets = serializers.IntegerField()
    reps = serializers.IntegerField()
    rest_time = serializers.IntegerField()
    day = serializers.CharField()

class WorkoutDetailWriteSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseInputSerializer(many=True)

    class Meta:
        model = Workout
        fields = ['name', 'description', 'exercises']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        # reemplazamos ejercicios
        WorkoutExercise.objects.filter(workout=instance).delete()
        for ex in validated_data['exercises']:
            WorkoutExercise.objects.create(
                workout=instance,
                exercise_id=ex['id'],
                sets=ex['sets'],
                reps=ex['reps'],
                rest_time=ex['rest_time'],
                day=ex['day']
            )
        return instance

#para progreso de usuario

from rest_framework import serializers
from .models import WorkoutProgress, WorkoutExercise

class WorkoutProgressSerializer(serializers.ModelSerializer):
    workout_exercise = serializers.PrimaryKeyRelatedField(
        queryset=WorkoutExercise.objects.all()
    )
    class Meta:
        model = WorkoutProgress
        fields = ['id', 'workout_exercise', 'date', 'completed', 'satisfaction', 'fatigue']
        read_only_fields = ['id', 'date']

class WorkoutProgressInputSerializer(serializers.Serializer):
    workout_exercise = serializers.IntegerField()
    completed = serializers.BooleanField()
    satisfaction = serializers.IntegerField(
        min_value=1, max_value=10,
        required=False, allow_null=True
    )

    fatigue = serializers.IntegerField(
        min_value=1, max_value=5,
        required=False, allow_null=True
    )




#diagnostico:
from .models import Diagnostico

class DiagnosticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnostico
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
# aqui termina

