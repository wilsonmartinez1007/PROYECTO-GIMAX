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



class Diagnostico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='diagnostico')
    
    # Datos personales
    edad = models.PositiveIntegerField()
    peso = models.FloatField()
    altura = models.FloatField()
    sexo = models.CharField(max_length=10)
    imc = models.FloatField()
    porcentaje_grasa = models.FloatField()
    actividad_fisica = models.CharField(max_length=100)

    # Objetivo
    objetivo_principal = models.CharField(max_length=100)
    tiempo_estimado = models.CharField(max_length=100)
    sesiones_por_semana = models.PositiveIntegerField()
    tiempo_por_sesion = models.CharField(max_length=50)
    descansos = models.CharField(max_length=50)

    # Historial / Condición
    experiencia = models.CharField(max_length=100)
    nivel_fuerza = models.CharField(max_length=100)
    nivel_resistencia = models.CharField(max_length=100)
    flexibilidad = models.CharField(max_length=100)
    lesion_trauma = models.CharField(max_length=100)
    tipo_cuerpo = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'Diagnóstico de {self.user.username}'

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

    fatigue = models.PositiveSmallIntegerField(
        null=True, blank=True,
        help_text='Nivel de fatiga/dolor percibido de 1 (muy bajo) a 5 (muy alto)'
    )


    class Meta:
        unique_together = ('user', 'workout_exercise', 'date')
        ordering = ['-date']

    def __str__(self):
        status = '✔️' if self.completed else '❌'
        sat = f', sat={self.satisfaction}' if self.satisfaction is not None else ''
        return f'{self.user.username} – {self.workout_exercise.id} – {status}{sat} on {self.date}'


# modelo para pagos 


from django.db import models
from django.conf import settings

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripe_payment_intent_id = models.CharField(max_length=255, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # monto en moneda local (ej. USD)
    currency = models.CharField(max_length=10, default='usd')
    status = models.CharField(max_length=50)  # ejemplo: succeeded, failed, pending
    created_at = models.DateTimeField(auto_now_add=True)

class SubscriptionPlan(models.Model):
    """
    Define los tres planes (mensual, semestral, anual) con su price_id de Stripe
    """
    PLAN_CHOICES = [
        ('MEN', 'Mensual'),
        ('SEM', 'Semestral'),
        ('ANU', 'Anual'),
    ]
    key = models.CharField(max_length=3, choices=PLAN_CHOICES, unique=True)
    nombre = models.CharField(max_length=20)           # “Mensual”, “Semestral”, “Anual”
    precio_cop = models.PositiveIntegerField()         # Precio base por mes en COP (ej. 50000)
    duracion_meses = models.PositiveIntegerField()     # 1, 6, 12
    descuento = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    stripe_price_id = models.CharField(max_length=255) # Price ID en Stripe (ej. price_1MensualXYZ)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} ({self.duracion_meses} mes/es)"

    def precio_final_cop(self):
        """
        Calcula el precio total (sinónimos de meses * precio_cop) menos el descuento.
        """
        total = self.precio_cop * self.duracion_meses
        return int(total * (1 - float(self.descuento)))


class CustomerProfile(models.Model):
    """
    Vincula un User de Django con un Customer en Stripe.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"CustomerProfile: {self.user.username}"


class Subscription(models.Model):
    """
    Guarda el estado de la suscripción de un usuario a un plan.
    """
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente de Pago'),
        ('activo', 'Activo'),
        ('vencido', 'Vencido'),
        ('cancelado', 'Cancelado'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')

    def __str__(self):
        return f"{self.user.username} - {self.plan.nombre} ({self.estado})"


class PaymentLog(models.Model):
    """
    Registra cada cobro recurrente (y el inicial) de una suscripción.
    """
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    monto_cop = models.PositiveIntegerField()
    fecha_pago = models.DateTimeField(auto_now_add=True)
    stripe_payment_intent_id = models.CharField(max_length=255)
    fue_exitoso = models.BooleanField(default=False)
    respuesta = models.JSONField()

    def __str__(self):
        estado = "Éxito" if self.fue_exitoso else "Fallido"
        return f"{self.subscription.user.username} - {self.monto_cop} COP - {estado} on {self.fecha_pago}"