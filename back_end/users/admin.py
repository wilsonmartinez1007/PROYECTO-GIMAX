
# Register your models here.
from django.contrib import admin
from .models import User, Gym, Membership, Workout, Exercise, WorkoutExercise, WorkoutProgress
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

#para eliminar de django un modelo admin.site.unregister(User)
#admin.site.register(User, CustomUserAdmin)
admin.site.register(Gym)
admin.site.register(Membership)
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(WorkoutExercise)
admin.site.register(WorkoutProgress)