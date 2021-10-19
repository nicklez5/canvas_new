# Generated by Django 3.1.6 on 2021-10-15 02:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        ('canvas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvas',
            name='current_course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='current_course', to='course.course'),
        ),
        migrations.AddField(
            model_name='canvas',
            name='list_courses',
            field=models.ManyToManyField(to='course.Course'),
        ),
    ]
