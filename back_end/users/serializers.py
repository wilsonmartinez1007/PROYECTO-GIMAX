from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password_confirm']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # Ya fue validada, no se guarda
        user = User.objects.create_user(**validated_data)
        return user

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

# ver rutinas cliente
class WorkoutExerciseDetailSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['exercise', 'sets', 'reps', 'rest_time', 'day']

class WorkoutDetailSerializer(serializers.ModelSerializer):
    exercises = serializers.SerializerMethodField()
    trainer = UserSerializer()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'created_at', 'trainer', 'exercises']

    def get_exercises(self, obj):
        we = WorkoutExercise.objects.filter(workout=obj)
        return WorkoutExerciseDetailSerializer(we, many=True).data
