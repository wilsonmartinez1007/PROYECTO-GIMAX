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


#para el progreso usuario

from django.utils import timezone
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class WorkoutProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress_entries')
    workout = models.ForeignKey('Workout', on_delete=models.CASCADE, related_name='progress_entries')
    workout_exercise = models.ForeignKey(
        'WorkoutExercise',
        on_delete=models.CASCADE,
        related_name='progress_entries'
    )
    date = models.DateField(
        default=timezone.now,
        help_text='Fecha en que se registró el progreso'
    )
    completed = models.BooleanField(
        default=False,
        help_text='Si el ejercicio fue completado o no'
    )
    satisfaction = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        help_text='Calificación de 1 a 10 de cómo se sintió la rutina'
    )

    class Meta:
        unique_together = ('user', 'workout_exercise', 'date')
        ordering = ['-date']

    def __str__(self):
        status = '✔️' if self.completed else '❌'
        sat = f', sat={self.satisfaction}' if self.satisfaction is not None else ''
        return f'{self.user.username} – {self.workout_exercise.id} – {status}{sat} on {self.date}'

