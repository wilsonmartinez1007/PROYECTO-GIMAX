
# Register your models here.
from django.contrib import admin
from .models import User, Gym, Membership, Workout, Exercise, WorkoutExercise, Diagnostico,WorkoutProgress
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass

@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información adicional', {'fields': ('role','cedula', 'apellido')}),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {
            'classes': ('wide',),
            'fields': ('email','role', 'cedula', 'apellido'),
        }),
    )
@admin.register(Diagnostico)
class DiagnosticoAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'edad',
        'peso',
        'altura',
        'sexo',
        'imc',
        'porcentaje_grasa',
        'actividad_fisica',
        'objetivo_principal',
        'tiempo_estimado',
        'sesiones_por_semana',
        'tiempo_por_sesion',
        'descansos',
        'experiencia',
        'nivel_fuerza',
        'nivel_resistencia',
        'flexibilidad',
        'lesion_trauma',
        'tipo_cuerpo',
        'created_at',
    )

    search_fields = ['user__username', 'objetivo_principal']
    list_filter = ['sexo', 'actividad_fisica', 'objetivo_principal', 'tipo_cuerpo']

#para eliminar de django un modelo admin.site.unregister(User)
#admin.site.register(User, CustomUserAdmin)
admin.site.register(Gym)
admin.site.register(Membership)
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(WorkoutExercise)
admin.site.register(WorkoutProgress)