# Generated by Django 5.1.3 on 2025-05-20 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_workoutprogress'),
    ]

    operations = [
        migrations.AddField(
            model_name='workoutprogress',
            name='satisfaction',
            field=models.PositiveSmallIntegerField(blank=True, help_text='Calificación de 1 a 10 de cómo se sintió la rutina', null=True),
        ),
    ]
