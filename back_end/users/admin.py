
# Register your models here.
from django.contrib import admin
from .models import User, Gym, Membership, Workout, Exercise, WorkoutExercise

admin.site.register(User)
admin.site.register(Gym)
admin.site.register(Membership)
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(WorkoutExercise)