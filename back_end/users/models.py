from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('cliente', 'Cliente'),
        ('entrenador', 'Entrenador'),
        ('admin', 'Administrador')
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    cedula = models.CharField(max_length=20, blank=True)
    apellido = models.CharField(max_length=150, blank=True)
#CUANDO HAGO CAMBIOS AQUI HAY QUE HACER MIGRACIONES
class Gym(models.Model):
    name = models.CharField(max_length=100)
    location = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Membership(models.Model):
    STATUS_CHOICES = [
        ('activa', 'Activa'),
        ('inactiva', 'Inactiva')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gym = models.ForeignKey(Gym, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='activa')

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    trainer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_workouts')
    gym = models.ForeignKey(Gym, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    muscle_group = models.CharField(max_length=50, blank=True, null=True)
    video_url = models.TextField(blank=True, null=True)

class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    rest_time = models.PositiveIntegerField(help_text='Tiempo de descanso en segundos')
    
    DAY_CHOICES = [
        ('lunes', 'Lunes'),
        ('martes', 'Martes'),
        ('miercoles', 'Miércoles'),
        ('jueves', 'Jueves'),
        ('viernes', 'Viernes'),
        ('sabado', 'Sábado'),
        ('domingo', 'Domingo'),
    ]
    day = models.CharField(
    max_length=10,
    choices=DAY_CHOICES,
    default='lunes'  
)


