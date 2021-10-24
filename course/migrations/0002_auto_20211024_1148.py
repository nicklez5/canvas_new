# Generated by Django 3.1.6 on 2021-10-24 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        ('thread', '0001_initial'),
        ('profiles', '0001_initial'),
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='profiles',
            field=models.ManyToManyField(blank=True, related_name='profiles', to='profiles.Profile'),
        ),
        migrations.AddField(
            model_name='course',
            name='tests',
            field=models.ManyToManyField(blank=True, related_name='tests', to='tests.Test'),
        ),
        migrations.AddField(
            model_name='course',
            name='threads',
            field=models.ManyToManyField(blank=True, related_name='threads', to='thread.Thread'),
        ),
    ]