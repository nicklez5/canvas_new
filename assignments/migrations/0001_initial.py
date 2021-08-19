# Generated by Django 3.1.6 on 2021-08-19 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('max_points', models.IntegerField(blank=True, null=True)),
                ('student_points', models.IntegerField(blank=True, null=True)),
                ('description', models.TextField(max_length=100)),
            ],
            options={
                'db_table': 'assignment',
                'ordering': ['date_created'],
            },
        ),
    ]
